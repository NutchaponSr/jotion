import { 
  boolean,
  pgEnum,
  pgTable, 
  text,
  uuid
} from "drizzle-orm/pg-core";

export const roles = pgEnum("role", ["USER", "ADMIN"]);

export const users = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  image: text("image"),
  role: roles("role").default("USER").notNull(),
  password: text("password").notNull(),
});
