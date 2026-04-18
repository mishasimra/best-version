import nodemailer from "nodemailer";
import { env } from "../config/env.js";

let transporter;

function getTransporter() {
  if (!env.passwordResetEmailEnabled) return null;

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.smtpHost,
      port: env.smtpPort,
      secure: env.smtpPort === 465,
      auth: {
        user: env.smtpUser,
        pass: env.smtpPass,
      },
    });
  }

  return transporter;
}

export async function sendPasswordResetEmail({ to, resetUrl }) {
  const transport = getTransporter();

  if (!transport) {
    return false;
  }

  await transport.sendMail({
    from: env.mailFrom,
    to,
    subject: "Reset your Best Version password",
    text: `Reset your Best Version password by opening this link: ${resetUrl}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #173627; line-height: 1.6;">
        <h2 style="margin-bottom: 12px;">Reset your Best Version password</h2>
        <p>We received a request to reset your password.</p>
        <p>
          <a href="${resetUrl}" style="display:inline-block;padding:12px 18px;border-radius:999px;background:#1f8f5f;color:#ffffff;text-decoration:none;font-weight:700;">
            Reset password
          </a>
        </p>
        <p>If the button does not work, copy and paste this URL into your browser:</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>
      </div>
    `,
  });

  return true;
}
