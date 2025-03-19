"use server";

import { db } from "@/db/drizzle";
import { and, eq } from "drizzle-orm";
import { groups, users } from "@/db/schema";

export const getGroupsByYear = async (year: string) => {
  const data = await db 
    .select()
    .from(groups)
    .where(
      and(
        eq(groups.year, year),
        eq(groups.inTrash, false),
      )
    );

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

  return { data: populatedData }
}