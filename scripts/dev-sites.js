import { spawn } from "node:child_process";
import { resolve } from "node:path";

const rootDir = resolve(".");
const children = new Set();
let shuttingDown = false;

const run = (command, args, options = {}) =>
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
      rejectRun(new Error(`${command} ${args.join(" ")} failed with ${signal ?? code}`));
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

const start = (name, args) => {
  const child = spawn("npm", ["exec", "vite", "--", ...args], {
    cwd: rootDir,
    stdio: "inherit",
    shell: false,
  });

  children.add(child);

  child.on("exit", (code, signal) => {
    children.delete(child);
    if (!shuttingDown && code !== 0) {
      console.error(`[dev] ${name} exited with ${signal ?? code}`);
      shutdown(1);
    }
  });

  child.on("error", (error) => {
    children.delete(child);
    console.error(`[dev] Failed to start ${name}: ${error.message}`);
    shutdown(1);
  });
};

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

try {
  console.debug("[dev] Building generated HTML...");
  await run("npm", ["run", "build:html"], { cwd: rootDir });

  console.debug("[dev] Starting 3D Local Print on http://localhost:5173");
  start("3D Local Print", ["--host", "0.0.0.0", "--port", "5173", "--mode", "localprint"]);

  console.debug("[dev] Starting 3D Pet Print on http://localhost:5174");
  start("3D Pet Print", ["--host", "0.0.0.0", "--port", "5174", "--mode", "pet"]);
} catch (error) {
  console.error(`[dev] ${error.message}`);
  shutdown(1);
}
