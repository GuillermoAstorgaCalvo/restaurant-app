import { execSync } from "child_process";
import { logger } from "../src/app/lib/logger/logger";

async function typecheck() {
  logger.info("Running TypeScript type check...");

  try {
    execSync("tsc --noEmit", { stdio: "inherit" });
    logger.info("TypeScript check passed!");
  } catch (error) {
    logger.error("TypeScript check failed:", error);
    process.exit(1);
  }
}

typecheck().catch((error) => {
  logger.error("Type checking failed:", error);
  process.exit(1);
});
