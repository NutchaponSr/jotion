import { 
  pgEnum,
  pgTable, 
  text,
  timestamp,
} from "drizzle-orm/pg-core";

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