import { createApp } from "./app.js";
import { connectDatabase } from "./config/db.js";
import { env } from "./config/env.js";
import { runSeed } from "./seed/seed.js";

const app = createApp();

connectDatabase()
  .then(async () => {
    if (env.useInMemoryDb && env.autoSeedDemo) {
      await runSeed({ connect: false });
    }
    app.listen(env.port, () => {
      console.log(`Best Version API running on port ${env.port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  });
