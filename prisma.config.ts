import { defineConfig } from "@prisma/config";
import * as dotenv from "dotenv";

dotenv.config(); // 👈 This loads .env variables

export default defineConfig({
  seed: {
    run: "node prisma/seed.js"
  }
});
