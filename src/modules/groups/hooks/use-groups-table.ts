"use client";

import { useGetGroupsByYear } from "@/modules/groups/api/use-get-groups-by-year";

export const useGroupsTable = (year: string) => {
  const { data, isLoading } = useGetGroupsByYear(year);

  const groups = data || [];

  return {
    groups,
    isLoading
  };
}