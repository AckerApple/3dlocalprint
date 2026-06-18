import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const rootDir = resolve(".");
const firebaseDir = resolve(rootDir, "firebase-hosting");
const functionsDir = resolve(firebaseDir, "functions");
const localSecretsPath = resolve(firebaseDir, ".secret.local");
const children = new Set();
let shuttingDown = false;

const parseDotEnv = (filePath) => {
  if (!existsSync(filePath)) return {};

  return readFileSync(filePath, "utf8")
    .split(/\r?\n/)
    .reduce((values, line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return values;
      const separatorIndex = trimmed.indexOf("=");
      if (separatorIndex === -1) return values;
      const key = trimmed.slice(0, separatorIndex).trim();
      const rawValue = trimmed.slice(separatorIndex + 1).trim();
      if (!key) return values;
      values[key] = rawValue.replace(/^(['"])(.*)\1$/, "$2");
      return values;
    }, {});
};

const run = (name, command, args, options = {}) =>
  new Promise((resolveRun, rejectRun) => {
    const child = spawn(command, args, {
      stdio: "inherit",
      shell: false,
      ...options,
    });

    child.on("exit", (code, signal) => {
      if (code === 0) {
        resolveRun();
        return;
      }
      rejectRun(new Error(`${name} failed with ${signal ?? code}`));
    });

    child.on("error", rejectRun);
  });

const shutdown = (code = 0) => {
  if (shuttingDown) return;
  shuttingDown = true;
  process.exitCode = code;

  for (const child of children) {
    if (!child.killed) {
      child.kill("SIGTERM");
    }
  }

  setTimeout(() => process.exit(code), 500);
};

const start = (name, command, args, options = {}) => {
  const child = spawn(command, args, {
    stdio: "inherit",
    shell: false,
    ...options,
  });

  children.add(child);

  child.on("exit", (code, signal) => {
    children.delete(child);
    if (!shuttingDown && code !== 0) {
      console.error(`[start] ${name} exited with ${signal ?? code}`);
      shutdown(1);
    }
  });

  child.on("error", (error) => {
    children.delete(child);
    console.error(`[start] Failed to start ${name}: ${error.message}`);
    shutdown(1);
  });
};

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

try {
  const localSecrets = parseDotEnv(localSecretsPath);
  if (!existsSync(localSecretsPath)) {
    console.warn("[start] firebase-hosting/.secret.local not found. Local functions will run without local secret values.");
  }

  console.debug("[start] Building Firebase functions...");
  await run("Firebase functions build", "npm", ["run", "build"], { cwd: functionsDir });

  console.debug("[start] Starting Firebase Functions emulator on http://127.0.0.1:5001");
  start("Firebase Functions emulator", "firebase", [
    "emulators:start",
    "--only",
    "functions",
  ], {
    cwd: firebaseDir,
    env: { ...process.env, ...localSecrets },
  });

  console.debug("[start] Starting website dev servers with npm run dev");
  start("website dev servers", "npm", ["run", "dev"], { cwd: rootDir });
} catch (error) {
  console.error(`[start] ${error.message}`);
  shutdown(1);
}
