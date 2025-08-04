import { env } from "node:process";

export const envKeys = [
  "NODE_ENV",
  "DATABASE_URL",
  "SERVER_PORT",
  "SERVER_ORIGIN",
  "ACCESS_TOKEN_SECRET",
  "ACCESS_TOKEN_EXPIRES_IN",
  "REFRESH_TOKEN_SECRET",
  "REFRESH_TOKEN_EXPIRES_IN",
  "MAIL_HOST",
  "MAIL_PORT",
  "MAIL_AUTH_USER",
  "MAIL_AUTH_PASS",
  "MAIL_FROM",
  "MAIL_CONFIRMATION_URL",
];

export const validateEnv = (): void => {
  try {
    const missingKeys = [];

    for (const key of envKeys) {
      if (!Object.hasOwn(env, key)) {
        missingKeys.push(key);
      }
    }

    if (missingKeys.length) {
      throw new Error(`ENV MISSING KEYS: ${missingKeys.join(" ")}`);
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};
