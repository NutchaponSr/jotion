// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from "next-auth/jwt";
import { roles } from "@/db/schema";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { User, type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: typeof roles.enumValues[number];
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    id: string | undefined;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string | undefined;
  }
}

export type SessionUser = {
  userId: string;
  name: string;
  imageUrl: string;
  email: string;
}