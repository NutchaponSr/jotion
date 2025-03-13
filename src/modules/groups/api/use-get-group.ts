import { InferResponseType } from "hono";
import { useSuspenseQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export type Group = InferResponseType<typeof client.api.groups[":id"]["$get"], 200>["data"];

export const useGetGroup = (id: string) => {
  const query = useSuspenseQuery({
    queryKey: ["group", { id }],
    queryFn: async () => {
      const response = await client.api.groups.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch group");
      }

      const { data } = await response.json();
      return data;
    }
  });

  return query;
}