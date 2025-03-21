import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export const useGetGroupsByYear = (year: string) => {
  const query = useQuery({
    enabled: !!year,
    queryKey: ["groups", { year }],
    queryFn: async () => {
      const response = await client.api.groups["year"][":year"]["$get"]({ param: { year } });

      if (!response.ok) {
        throw new Error("Failed to fetch groups");
      }

      const { data } = await response.json();
      return data;
    }
  });

  return query;
}