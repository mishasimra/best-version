export function buildAuthPlaceholders() {
  return {
    google: {
      enabled: false,
      message: "Google OAuth credentials can be added later without changing route contracts.",
    },
    otp: {
      enabled: false,
      message: "OTP delivery service is not connected yet, but the user schema and auth flow are ready for it.",
    },
  };
}
