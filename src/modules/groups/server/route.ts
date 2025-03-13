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
            .from(users)
            .where(eq(users.id, group.updatedBy))

          return {
            ...group,
            updatedBy: updatedByUser.name,
          };
        }),
      );

      return c.json({ data: populatedData });
    }
  )
  .get(
    "/:id",
    verifyAuth(),
    zValidator(
      "param",
      z.object({
        id: z.string(),
      })
    ),
    async (c) => {
      const auth = c.get("authUser");

      const { id } = c.req.valid("param");

      if (!auth.token?.sub) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      const [data] = await db
        .select()
        .from(groups)
        .where(eq(groups.id, id));

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data });
    }
  )
  .post(
    "/",
    verifyAuth(),
    zValidator(
      "json",
      groupsInsertSchema.pick({
        icon: true,
        name: true,
        year: true,
      }),
    ),
    async (c) => {
      const auth = c.get("authUser");

      const { icon, name, year } = c.req.valid("json");

      if (!auth.token?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      await db
        .insert(groups)
        .values({
          icon,
          year,
          name: name || "Untitled",
          createdBy: auth.token.id,
          updatedBy: auth.token.id,
        });

      return c.json(null, 200);
    }
  )

export default app;