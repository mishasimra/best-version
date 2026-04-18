import crypto from "crypto";
import { env } from "../config/env.js";

export function createPasswordResetToken() {
  return crypto.randomBytes(24).toString("hex");
}

export function getPasswordResetExpiry() {
  return new Date(Date.now() + 1000 * 60 * 30);
}

export function shouldExposeResetLink() {
  return env.enableDevResetLink || env.nodeEnv !== "production";
}

export function buildPasswordResetUrl(token) {
  const baseUrl = env.appBaseUrl || env.clientUrls[0] || env.clientUrl;
  const url = new URL("/reset-password", baseUrl);
  url.searchParams.set("token", token);
  return url.toString();
}

export function buildForgotPasswordResponse(user) {
  const resetUrl = user && shouldExposeResetLink() ? buildPasswordResetUrl(user.resetPasswordToken) : null;

  return {
    message: resetUrl
        ? "If an account exists for this email, use the temporary reset link below to continue."
        : "If an account exists for this email, a reset link has been prepared.",
    data: {
      resetUrl,
      resetLinkEnabled: Boolean(resetUrl),
      emailDeliveryConfigured: false,
      expiresInMinutes: 30,
    },
  };
}
