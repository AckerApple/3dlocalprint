import { spawn } from "node:child_process";
import { copyFileSync, existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const rootDir = resolve(".");
const firebaseDir = resolve(rootDir, "firebase-hosting");
const functionsDir = resolve(firebaseDir, "functions");
const localSecretsPath = resolve(firebaseDir, ".secret.local");
const functionsLocalSecretsPath = resolve(functionsDir, ".secret.local");
const localStripeWebhookForwardUrl =
  process.env.STRIPE_FORWARD_TO ||
  "http://127.0.0.1:5001/threedlocalprint/us-central1/stripeWebhook";
const children = new Set();
let shuttingDown = false;

const parseDotEnv = (filePath) => {
  if (!existsSync(filePath)) {
    return {};
  }

  return readFileSync(filePath, "utf8")
    .split(/\r?\n/)
    .reduce((values, line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) {
        return values;
      }

      const separatorIndex = trimmed.indexOf("=");
      if (separatorIndex === -1) {
        return values;
      }

      const key = trimmed.slice(0, separatorIndex).trim();
      const rawValue = trimmed.slice(separatorIndex + 1).trim();
      if (!key) {
        return values;
      }

      values[key] = rawValue.replace(/^(['"])(.*)\1$/, "$2");
      return values;
    }, {});
};

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

      rejectRun(
        new Error(`${command} ${args.join(" ")} failed with ${signal ?? code}`),
      );
    });

    child.on("error", rejectRun);
  });

const shutdown = (code = 0) => {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;
  process.exitCode = code;

  for (const child of children) {
    if (!child.killed) {
      child.kill("SIGTERM");
    }
  }

  if (children.size === 0) {
    process.exit(code);
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
      console.error(`[dev] ${name} exited with ${signal ?? code}`);
      shutdown(1);
    }
  });

  child.on("error", (error) => {
    children.delete(child);
    console.error(`[dev] Failed to start ${name}: ${error.message}`);
    shutdown(1);
  });

  return child;
};

const startOptional = (name, command, args, options = {}) => {
  const child = spawn(command, args, {
    stdio: "inherit",
    shell: false,
    ...options,
  });

  children.add(child);

  child.on("exit", (code, signal) => {
    children.delete(child);

    if (!shuttingDown && code !== 0) {
      console.warn(`🟠 [dev] Optional ${name} exited with ${signal ?? code}. Continuing without it.`);
    }
  });

  child.on("error", (error) => {
    children.delete(child);
    console.warn(`🟠 [dev] Optional ${name} did not start: ${error.message}. Continuing without it.`);
  });

  return child;
};

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

try {
  console.debug("[dev] Building generated HTML...");
  await run("npm", ["run", "build:html"], { cwd: rootDir });

  console.debug("[dev] Building Firebase functions...");
  await run("npm", ["run", "build"], { cwd: functionsDir });

  const localSecrets = parseDotEnv(localSecretsPath);
  const localStripeSecret = localSecrets.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY || "";
  const localWebhookSecret = localSecrets.STRIPE_WEBHOOK_SECRET || process.env.STRIPE_WEBHOOK_SECRET || "";

  if (!existsSync(localSecretsPath)) {
    console.warn(
      "🟠 [dev] Missing firebase-hosting/.secret.local. Copy .secret.local.example and paste local Stripe secrets before testing checkout.",
    );
  } else if (!localStripeSecret.startsWith("sk_test_")) {
    console.warn(
      "🟠 [dev] firebase-hosting/.secret.local does not contain a STRIPE_SECRET_KEY that starts with sk_test_. Local checkout will be blocked.",
    );
  } else {
    console.debug("[dev] Loaded local Stripe sandbox secrets from firebase-hosting/.secret.local");
    copyFileSync(localSecretsPath, functionsLocalSecretsPath);
    console.debug("[dev] Synced local Firebase secret overrides to firebase-hosting/functions/.secret.local");
  }

  if (!localWebhookSecret || /paste_local_webhook_secret_here/i.test(localWebhookSecret)) {
    console.warn(
      "🟠 [dev] STRIPE_WEBHOOK_SECRET is not set to a Stripe CLI whsec value. Stripe forwarding can start, but webhook signature verification will fail until you paste the whsec shown by `stripe listen` into firebase-hosting/.secret.local and restart npm run dev.",
    );
  }

  console.debug("[dev] Starting Firebase emulators: functions, hosting...");
  console.debug("[dev] Firebase Hosting emulator default: http://127.0.0.1:5000");
  console.debug("[dev] Firebase Functions emulator default: http://127.0.0.1:5001");
  start("Firebase emulators", "firebase", [
    "emulators:start",
    "--only",
    "functions,hosting",
  ], { cwd: firebaseDir, env: { ...process.env, ...localSecrets } });

  console.debug("[dev] Starting Vite app...");
  start("Vite", "npm", ["exec", "vite", "--"], { cwd: rootDir });

  if (process.env.STRIPE_FORWARD_DISABLED === "1") {
    console.debug("[dev] Stripe webhook forwarding disabled by STRIPE_FORWARD_DISABLED=1");
  } else {
    console.debug(`[dev] Starting Stripe webhook forwarding to ${localStripeWebhookForwardUrl}`);
    startOptional("Stripe webhook forwarding", "stripe", [
      "listen",
      "--forward-to",
      localStripeWebhookForwardUrl,
    ], {
      cwd: rootDir,
      env: {
        ...process.env,
        ...localSecrets,
        STRIPE_API_KEY: localStripeSecret || process.env.STRIPE_API_KEY || "",
      },
    });
  }
} catch (error) {
  console.error(`[dev] ${error.message}`);
  shutdown(1);
}
