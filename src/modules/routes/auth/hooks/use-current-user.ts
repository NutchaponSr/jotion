import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
  const session = useSession();

  return session.data?.user;
}

export type ClientSession = Exclude<ReturnType<typeof useCurrentUser>, undefined>;