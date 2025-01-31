const fs = require("fs");
const path = require("path");

const mode = process.argv[2];
if (!mode) {
  console.error("Please specify a mode: dev or debug");
  process.exit(1);
}

const envPath = path.resolve(".env");

let envContent = "";
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, "utf-8");
}

const updatedEnv = envContent
  .split("\n")
  .filter(
    (line) =>
      !line.startsWith("BACKEND_COMMAND=") &&
      !line.startsWith("FRONTEND_COMMAND=")
  )
  .concat([
    `BACKEND_COMMAND=npm run ${mode}`,
    `FRONTEND_COMMAND=npm run ${mode}`,
  ])
  .join("\n");

fs.writeFileSync(envPath, updatedEnv);
console.log(`.env file updated for ${mode} mode.`);
