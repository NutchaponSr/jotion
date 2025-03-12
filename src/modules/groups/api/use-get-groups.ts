import { InferResponseType } from "hono";
import { useSuspenseQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export type ResponseType = InferResponseType<typeof client.api.groups.$get, 200>["data"][0];

export const useGetGroups = () => {
  const query = useSuspenseQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      const response = await client.api.groups.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch groups");
      }

      const { data } = await response.json();
      return data;
    }
  });

  return query;
}