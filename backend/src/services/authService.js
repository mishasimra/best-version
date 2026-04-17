export function buildAuthPlaceholders() {
  return {
    google: {
      enabled: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_REDIRECT_URI),
      message: process.env.GOOGLE_CLIENT_ID
        ? "Google sign-in is configured and ready."
        : "Google sign-in is unavailable because the server configuration is incomplete.",
    },
    otp: {
      enabled: false,
      message: "OTP delivery service is not connected yet, but the user schema and auth flow are ready for it.",
    },
  };
}
