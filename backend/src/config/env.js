import dotenv from "dotenv";

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 5000),
  mongoUri: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/best-version",
  useInMemoryDb: process.env.USE_IN_MEMORY_DB === "true",
  autoSeedDemo: process.env.AUTO_SEED_DEMO === "true",
  jwtSecret: process.env.JWT_SECRET || "best-version-dev-secret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  clientUrl: process.env.CLIENT_URL || "http://127.0.0.1:4173",
  clientUrls: (process.env.CLIENT_URL || "http://127.0.0.1:4173")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean),
  googleClientId: process.env.GOOGLE_CLIENT_ID || "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  googleRedirectUri: process.env.GOOGLE_REDIRECT_URI || "",
};
