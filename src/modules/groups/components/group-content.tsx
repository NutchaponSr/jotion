"use client";

import { useMount } from "react-use";

import { groupColumns } from "@/constants/groups";

import { useLayoutFilter } from "@/stores/use-layout-filter";

import { Toolbar } from "@/components/toolbar";

import { LayoutsHub } from "@/components/layouts/layouts-hub";

import { GroupCells } from "@/modules/groups/components/group-cells";

import { useGroupsTable } from "@/modules/groups/hooks/use-groups-table";

export const GroupContent = () => {
  const { setColumns, columns } = useLayoutFilter();

  const { groups, isLoading } = useGroupsTable("2025");

  useMount(() => setColumns(groupColumns));

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
        data={groups} 
        columns={groupColumns} 
        searchQuery="" 
        renderCell={({ ...props }) => <GroupCells {...props} />}
      />
    </div>
  );
}

