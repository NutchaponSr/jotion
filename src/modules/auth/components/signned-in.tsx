import { auth } from "@/auth";

export const SignnedIn = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (!session) return null;

  return (
    <div className="contents">
      {children}
    </div>
  );
}