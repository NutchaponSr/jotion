import { z } from "zod";
import { Hono } from "hono";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";

import { db } from "@/db/drizzle";
import { eq, and } from "drizzle-orm";
import { groups, groupsInsertSchema, users } from "@/db/schema";

const app = new Hono()
  .get(
    "/",
    verifyAuth(),
    async (c) => {
      const auth = c.get("authUser");

      console.log(auth);

      if (!auth.token?.sub) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const data = await db
        .select()
        .from(groups)
        .where(eq(groups.inTrash, false));

      const populatedData = await Promise.all(
        data.map(async (group) => {
          const [updatedByUser] = await db
            .select({ name: users.name })
            .from()
        })
      )
    }
  )