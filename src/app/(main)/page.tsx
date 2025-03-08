"use client";

import { useCurrentUser } from "@/modules/auth/hooks/use-current-user";

const Home = () => {
  const user = useCurrentUser();

  return (
    <pre>
      {JSON.stringify(user, null, 2)}
    </pre>
  );
}

export default Home;