import { User } from "../models/User.js";
import { Wallet } from "../models/Wallet.js";
import { Portfolio } from "../models/Portfolio.js";
import { Resume } from "../models/Resume.js";
import { Notification } from "../models/Notification.js";
import { env } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendResponse } from "../utils/response.js";
import { signToken } from "../utils/tokens.js";
import { buildAuthPlaceholders } from "../services/authService.js";
import { buildGoogleAuthUrl, createGoogleState, exchangeGoogleCodeForProfile } from "../services/googleAuthService.js";
import { sendPasswordResetEmail } from "../services/mailerService.js";
import {
  buildForgotPasswordResponse,
  buildPasswordResetUrl,
  createPasswordResetToken,
  getPasswordResetExpiry,
} from "../services/passwordResetService.js";

const GOOGLE_STATE_COOKIE = "best_version_google_state";

function setGoogleStateCookie(res, state) {
  const parts = [
    `${GOOGLE_STATE_COOKIE}=${encodeURIComponent(state)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    "Max-Age=600",
  ];

  if (process.env.NODE_ENV === "production") {
    parts.push("Secure");
  }

  res.setHeader("Set-Cookie", parts.join("; "));
}

function clearGoogleStateCookie(res) {
  const parts = [`${GOOGLE_STATE_COOKIE}=`, "Path=/", "HttpOnly", "SameSite=Lax", "Max-Age=0"];
  if (process.env.NODE_ENV === "production") {
    parts.push("Secure");
  }
  res.setHeader("Set-Cookie", parts.join("; "));
}

function readCookie(req, name) {
  const cookieHeader = req.headers.cookie || "";
  const cookies = cookieHeader.split(";").map((item) => item.trim());
  const match = cookies.find((item) => item.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=").slice(1).join("=")) : "";
}

function buildGoogleRedirectUrl({ token, error }) {
  const redirectBaseUrl = env.clientUrls[0] || env.clientUrl;
  const redirectUrl = new URL("/auth/google/callback", redirectBaseUrl);
  const hash = new URLSearchParams();

  if (token) {
    hash.set("token", token);
  }

  if (error) {
    hash.set("error", error);
  }

  redirectUrl.hash = hash.toString();
  return redirectUrl.toString();
}

async function ensureSupportDocuments(user) {
  await Promise.all([
    Wallet.findOneAndUpdate(
      { user: user._id },
      { $setOnInsert: { balance: 0, pending: 0, transactions: [] } },
      { upsert: true, new: true }
    ),
    Portfolio.findOneAndUpdate(
      { user: user._id },
      {
        $setOnInsert: {
          summary: "A growing body of work that shows momentum, grit, and hands-on learning.",
          featuredProjects: [],
          links: [],
        },
      },
      { upsert: true, new: true }
    ),
    Resume.findOneAndUpdate(
      { user: user._id },
      {
        $setOnInsert: {
          headline: "Aspiring builder creating proof of work through projects and competitions.",
          experience: [],
          education: [],
          achievements: [],
          resumeUrl: "",
        },
      },
      { upsert: true, new: true }
    ),
  ]);
}

function buildAuthPayload(user) {
  return {
    token: signToken({ userId: user._id }),
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      headline: user.headline,
      stats: user.stats,
      preferences: user.preferences,
    },
    integrations: buildAuthPlaceholders(),
  };
}

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "An account with this email already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role || "student",
    headline: "Building my best version, one milestone at a time.",
    location: "Remote",
    strengths: ["Curiosity", "Consistency"],
    skills: ["Communication", "Problem Solving"],
    interests: ["Career Growth", "Real Projects"],
    badges: ["Fresh Start"],
    stats: {
      xp: 120,
      streak: 1,
      completedCourses: 0,
      projectsBuilt: 0,
      competitionWins: 0,
      earnings: 0,
    },
  });

  await Promise.all([
    Wallet.create({ user: user._id, balance: 0, pending: 0, transactions: [] }),
    Portfolio.create({
      user: user._id,
      summary: "A growing body of work that shows momentum, grit, and hands-on learning.",
      featuredProjects: [],
      links: [],
    }),
    Resume.create({
      user: user._id,
      headline: "Aspiring builder creating proof of work through projects and competitions.",
      experience: [],
      education: [],
      achievements: [],
      resumeUrl: "",
    }),
    Notification.create({
      user: user._id,
      title: "Welcome to Best Version",
      body: "Start with the skill assessment to unlock personalized recommendations.",
      type: "success",
      ctaLabel: "Take assessment",
      ctaPath: "/assessment",
    }),
  ]);

  return sendResponse(res, {
    statusCode: 201,
    message: "Account created successfully",
    data: buildAuthPayload(user),
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid email or password");
  }

  return sendResponse(res, {
    message: "Login successful",
    data: buildAuthPayload(user),
  });
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  return sendResponse(res, {
    message: "Current user fetched",
    data: {
      user: req.user,
      integrations: buildAuthPlaceholders(),
    },
  });
});

export const startGoogleLogin = asyncHandler(async (_req, res) => {
  try {
    const state = createGoogleState();
    setGoogleStateCookie(res, state);
    return res.redirect(buildGoogleAuthUrl(state));
  } catch (error) {
    clearGoogleStateCookie(res);
    return res.redirect(buildGoogleRedirectUrl({ error: error.message || "Google sign-in is not available right now." }));
  }
});

export const googleCallback = asyncHandler(async (req, res) => {
  try {
    const { code, state, error } = req.query;

    if (error) {
      clearGoogleStateCookie(res);
      return res.redirect(buildGoogleRedirectUrl({ error: "Google sign-in was canceled or denied." }));
    }

    const savedState = readCookie(req, GOOGLE_STATE_COOKIE);
    clearGoogleStateCookie(res);

    if (!code || !state || !savedState || state !== savedState) {
      return res.redirect(buildGoogleRedirectUrl({ error: "Google sign-in could not be verified safely." }));
    }

    const profile = await exchangeGoogleCodeForProfile(code);

    if (!profile.email || !profile.email_verified) {
      return res.redirect(buildGoogleRedirectUrl({ error: "Google did not return a verified email address." }));
    }

    let user = null;

    if (profile.sub) {
      user = await User.findOne({ googleId: profile.sub });
    }

    if (!user) {
      user = await User.findOne({ email: profile.email.toLowerCase() });
    }

    if (!user) {
      user = await User.create({
        name: profile.name || profile.email.split("@")[0],
        email: profile.email.toLowerCase(),
        password: crypto.randomBytes(24).toString("hex"),
        role: "student",
        avatar: profile.picture || "",
        headline: "Building my best version, one milestone at a time.",
        location: "Remote",
        strengths: ["Curiosity", "Consistency"],
        skills: ["Communication", "Problem Solving"],
        interests: ["Career Growth", "Real Projects"],
        badges: ["Fresh Start"],
        stats: {
          xp: 120,
          streak: 1,
          completedCourses: 0,
          projectsBuilt: 0,
          competitionWins: 0,
          earnings: 0,
        },
        authProvider: "google",
        googleId: profile.sub,
      });

      await Notification.create({
        user: user._id,
        title: "Welcome to Best Version",
        body: "Start with the skill assessment to unlock personalized recommendations.",
        type: "success",
        ctaLabel: "Take assessment",
        ctaPath: "/assessment",
      });
    } else {
      user.googleId = user.googleId || profile.sub;
      user.authProvider = user.authProvider === "local" ? "local" : "google";
      user.avatar = user.avatar || profile.picture || user.avatar;
      user.name = user.name || profile.name || user.email.split("@")[0];
      await user.save();
    }

    await ensureSupportDocuments(user);

    return res.redirect(buildGoogleRedirectUrl({ token: signToken({ userId: user._id }) }));
  } catch (error) {
    clearGoogleStateCookie(res);
    return res.redirect(buildGoogleRedirectUrl({ error: error.message || "Google sign-in failed. Please try again." }));
  }
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  let emailSent = false;

  if (user) {
    user.resetPasswordToken = createPasswordResetToken();
    user.resetPasswordExpiresAt = getPasswordResetExpiry();
    await user.save();

    if (env.passwordResetEmailEnabled) {
      try {
        emailSent = await sendPasswordResetEmail({
          to: user.email,
          resetUrl: buildPasswordResetUrl(user.resetPasswordToken),
        });
      } catch (_error) {
        emailSent = false;
      }
    }
  }

  const response = buildForgotPasswordResponse(user);
  if (emailSent) {
    response.message = "If an account exists for this email, a reset link has been sent.";
    response.data.emailDeliveryConfigured = true;
  }

  return sendResponse(res, response);
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpiresAt: { $gt: new Date() },
  });

  if (!user) {
    throw new ApiError(400, "Reset token is invalid or expired");
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiresAt = undefined;
  await user.save();

  return sendResponse(res, {
    message: "Password reset successful",
    data: buildAuthPayload(user),
  });
});

export const getAuthOptions = asyncHandler(async (_req, res) => {
  return sendResponse(res, {
    message: "Auth options fetched",
    data: buildAuthPlaceholders(),
  });
});
