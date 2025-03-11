import authConfig from "@/auth.config";

import { Hono } from "hono";
import { handle } from "hono/vercel";
import { AuthConfig, initAuthConfig } from "@hono/auth-js";

import groups from "@/modules/groups/server/route";

export const runtime = "nodejs";

function getAuthConfig(): AuthConfig {
  const secret = process.env.AUTH_SECRET;
  
  if (!secret) {
    throw new Error("AUTH_SECRET environment variable is not set");
  }

  return {
    secret: secret,
    ...authConfig
  } as unknown as AuthConfig;
}

const app = new Hono().basePath("/api");

app.use("*", initAuthConfig(getAuthConfig));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("/groups", groups)

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;