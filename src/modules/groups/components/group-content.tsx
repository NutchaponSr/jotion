"use client";

import { groupColumns } from "@/constants/groups";

import { Toolbar } from "@/components/toolbar";

import { LayoutsHub } from "@/components/layouts/layouts-hub";

import { useGroupsTable } from "@/modules/groups/hooks/use-groups-table";

export const GroupContent = () => {
  const { groups, isLoading } = useGroupsTable("2025");

  if (isLoading) {
    return (
      <div className="text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="contents">
      <Toolbar />
      <LayoutsHub 
        data={groups} 
        columns={groupColumns} 
        searchQuery="" 
      />
    </div>
  );
}

