import { auth } from "@/auth";

interface SignedProps {
  children: React.ReactNode
}

export const Signed = {
  In: async ({ children }: SignedProps) => {
    const session = await auth();

    if (!session) return null;

    return <>{children}</>
  },
  Out: async ({ children }: SignedProps) => {
    const session = await auth();

    if (session) return null;

    return <>{children}</>
  },
}

