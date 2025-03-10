"use server";

import { auth } from "@/auth";

import { SessionUser } from "@/types/auth";

export async function getSession(): Promise<SessionUser | null> {
  const session = await auth();

  if (!session) return null

  return {
    userId: session.user.id ?? "",
    name: session.user.name ?? "?",
    imageUrl: session.user.image ?? "",
    email: session.user.email ?? "",
  }
}