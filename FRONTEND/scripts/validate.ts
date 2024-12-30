import { execSync } from "child_process";
import { logger } from "@/app/lib/logger/logger";

function runCommand(command: string): boolean {
  try {
    execSync(command, { stdio: "inherit" });
    return true;
  } catch (error) {
    logger.error(`Error executing command "${command}":`, error);
    return false;
  }
}

async function validate() {
  logger.info("Running validation checks...");

  const checks = [
    { name: "TypeScript", command: "npm run typecheck" },
    { name: "ESLint", command: "npm run lint" },
    { name: "Prettier", command: "npm run format:check" },
  ];

  let failed = false;

  for (const check of checks) {
    logger.info(`Running ${check.name} check...`);
    if (!runCommand(check.command)) {
      logger.error(`${check.name} check failed`);
      failed = true;
    }
  }

  if (failed) {
    process.exit(1);
  }

  logger.info("All validation checks passed!");
}

validate().catch((error) => {
  logger.error("Validation failed:", error);
  process.exit(1);
});
