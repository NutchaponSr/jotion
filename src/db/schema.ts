import { 
  boolean,
  pgEnum,
  pgTable, 
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

import { cuid } from "@/lib/utils";

export const roles = pgEnum("role", ["USER", "ADMIN"]);

export const users = pgTable("user", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  image: text("image"),
  role: roles("role").default("USER").notNull(),
  password: text("password").notNull(),
});

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const groups = pgTable("group", {
  id: text("id").primaryKey().$defaultFn(() => cuid()),
  name: text("name").notNull(),
  year: text("year").notNull(),
  icon: text("icon"),
  banner: text("banner"),
  inTrash: boolean("inTrash").$default(() => false).notNull(),
  createdAt: timestamp("createdAt", { mode: "string" }).notNull().defaultNow(),
  createdBy: text("createdBy").notNull(),
  updatedAt: timestamp("updatedAt", { mode: "string" }).notNull().$onUpdateFn(() => new Date().toISOString()),
  updatedBy: text("updatedBy").notNull(),
});

export const groupsInsertSchema = createInsertSchema(groups);