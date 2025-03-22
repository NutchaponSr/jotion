"use client";

import { useMemo } from "react";
import { useMount } from "react-use";

import { filterByConditions, sortByColumns } from "@/lib/utils";

import { groupColumns } from "@/constants/groups";

import { useLayoutFilter } from "@/stores/use-layout-filter";

import { Toolbar } from "@/components/toolbar";

import { LayoutsHub } from "@/components/layouts/layouts-hub";

import { GroupCells } from "@/modules/routes/groups/components/group-cells";

import { useGetGroupsByYear } from "@/modules/routes/groups/api/use-get-groups-by-year";

export const GroupContent = () => {
  const { setColumns, columns } = useLayoutFilter();
  const { data: groups, isLoading } = useGetGroupsByYear("2025");

  useMount(() => setColumns(groupColumns));

  const filteredData = useMemo(() => {
    if (!groups) return [];
    return filterByConditions(groups, columns);
  }, [columns, groups]);

  const sortedData = useMemo(() => {
    return sortByColumns(filteredData, columns);
  }, [columns, filteredData]);
  
  // TODO: Global search
  // TODO: Selection row

  // TODO: Skleton loading
  if (isLoading) {
    return (
      <div className="text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="contents">
      <Toolbar columns={columns} />
      <LayoutsHub 
        data={sortedData} 
        columns={columns} 
        searchQuery="" 
        renderCell={({ ...props }) => <GroupCells {...props} />}
      />
    </div>
  );
}

