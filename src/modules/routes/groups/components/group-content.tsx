"use client";

import { useMemo } from "react";
import { useMount } from "react-use";

import { 
  filterByConditions, 
  sortByColumns 
} from "@/lib/utils";

import { groupColumns } from "@/constants/groups";

import { useSearch } from "@/hooks/use-searchs";

import { useLayoutFilter } from "@/stores/use-layout-filter";

import { Toolbar } from "@/components/toolbar";
import { SelectMenu } from "@/components/select-menu";
import { LayoutsHub } from "@/modules/bloc/layouts/components/layouts-hub";

import { GroupCells } from "@/modules/routes/groups/components/group-cells";

import { useGetGroupsByYear } from "@/modules/routes/groups/api/use-get-groups-by-year";

export const GroupContent = () => {
  const { setColumns, columns, selectedRows } = useLayoutFilter();
  const { data: groups, isLoading } = useGetGroupsByYear("2025");

  useMount(() => setColumns(groupColumns));

  const {
    searchQuery,
    setSearchQuery,
    filteredItems
  } = useSearch(groups || [], groupColumns.map((column) => column.id));

  const filteredData = useMemo(() => {
    return filterByConditions(filteredItems, columns);
  }, [columns, filteredItems]);

  const sortedData = useMemo(() => {
    return sortByColumns(filteredData, columns);
  }, [columns, filteredData]);

  const groupMapped = sortedData.filter((item) => selectedRows.has(item.id));
  
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
      <SelectMenu selectedData={groupMapped} />
      <Toolbar 
        columns={columns} 
        globalSearch={searchQuery} 
        onChangeSearch={(e) => setSearchQuery(e.target.value)} 
        onClear={() => setSearchQuery("")}
      />
      <LayoutsHub 
        data={sortedData} 
        columns={columns} 
        searchQuery={searchQuery} 
        renderCell={({ ...props }) => <GroupCells {...props} />}
      />
    </div>
  );
}

