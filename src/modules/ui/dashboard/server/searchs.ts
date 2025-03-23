import { z } from "zod";
import { Hono } from "hono";
import { parse } from "date-fns";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";

import { db } from "@/db/drizzle";
import { groups, users } from "@/db/schema";
import { and, eq, ilike, inArray } from "drizzle-orm";

import { Workspace } from "@/modules/ui/dashboard/types/sidebar";
import { formatDateCondition } from "@/modules/ui/dashboard/utils";
import { sortCatalog, SortLevel } from "@/modules/ui/dashboard/types/sort";

const app = new Hono()
  .get(
    "/",
    verifyAuth(),
    zValidator(
      "query",
      z.object({
        sort: z.string().optional(),
        search: z.string().optional(),
        from: z.string().optional(),
        to: z.string().optional(),
        rangeBy: z.enum(["EDIT", "CREATE"]).default("CREATE"),
      }),
    ),
    async (c) => {
      const auth = c.get("authUser");

      const { search, sort, from, to, rangeBy } = c.req.valid("query");

      if (!auth.token?.sub) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const toDate = to ? parse(to, "yyyy-MM-dd", new Date()) : null;
      const fromDate = from ? parse(from, "yyyy-MM-dd", new Date()) : null;
      const searchTerm = search && search.trim() !== "" ? `${search.toLowerCase()}` : null;
      const rangeField = {
        group: rangeBy !== "EDIT" ? groups.createdAt : groups.updatedAt,
      }

      const sortFn = sortCatalog[sort as SortLevel] ?? sortCatalog.DEFAULT;
      const sortField = sort === "EDITED_ASC" || sort === "EDITED_DESC" ? groups.updatedAt : groups.createdAt;

      const [group] = await Promise.all([
        db.select({
            id: groups.id,
            name: groups.name,
            icon: groups.icon, 
            description: groups.year,
            createdBy: groups.createdBy,
            createdAt: groups.createdAt,
          })
          .from(groups)
          .where(
            and(
              eq(groups.inTrash, false),
              searchTerm  ? ilike(groups.name, `${searchTerm}%`) : undefined,
              ...formatDateCondition(fromDate, toDate, rangeField.group),
            )
          )
          .orderBy(sortFn(sortField))
      ]);

      const createdPeoples = await db
        .select({
          id: users.id,
          label: users.name,
          header: users.image,
        })
        .from(users)
        .where(
          inArray(users.id, Array.from(new Set([...group].map((item) => item.createdBy))))
        );

      return c.json({
        data: [
          { label: "Group", data: group.map((item) => ({ ...item, category: Workspace.GROUP })) },
        ],
        createdPeoples,
      });
    }
  )

export default app;