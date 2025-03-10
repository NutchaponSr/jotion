import bcrypt from "bcryptjs";

import Credentials from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { roles, users } from "@/db/schema";

import { SignInSchema } from "@/modules/auth/schema/sign-in";
import { encode } from "next-auth/jwt";

declare module "@auth/core/jwt" {
  interface JWT {
    role: typeof roles.enumValues[number];
    id: string | undefined;

  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: typeof roles.enumValues[number];
    id: string | undefined;
  }
}

export default {
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const validatedFields = SignInSchema.safeParse(credentials);
        
        if (!validatedFields.success) return null;
        
        const { email, password } = validatedFields.data;
        
        const query = await db
        .select()
        .from(users)
        .where(eq(users.email, email));
        
        const user = query[0];
        
        if (!user || !user.password) return null;
        
        const passwordMatched = await bcrypt.compare(password, user.password);
        
        if (!passwordMatched) return null;
        
        return user;
      }
    })
  ],
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.id, token.sub));
        
        if (user) {
          session.user.id = user.id;
          session.user.name = user.name;
          session.user.email = user.email;
          session.user.image = user.image;
          session.user.role = user.role;
        }
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      
      const [existingUser] = await db
        .select()
        .from(users)
        .where(eq(users.id, token.sub));

      if (!existingUser) return token;

      token.role = existingUser.role;
      token.id = existingUser.id;

      return token;
    },
  },
  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = crypto.randomUUID();

        if (!params.token.sub) {
          throw new Error("No user ID found in token");
        }

        const createSession = await DrizzleAdapter(db).createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });

        if (!createSession) {
          throw new Error("Failed to create session");
        }

        return sessionToken;
      }
      return encode(params)
    }
  },
  session: {
    strategy: "jwt",
  },
  adapter: DrizzleAdapter(db),
} satisfies NextAuthConfig;