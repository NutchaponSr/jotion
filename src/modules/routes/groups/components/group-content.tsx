"use client";

import { useEffect, useMemo } from "react";
import { useMount } from "react-use";

import { 
  filterByConditions, 
  sortByColumns 
} from "@/lib/utils";
import { groupByColumn } from "@/modules/ui/layouts/utils";

import { groupColumns } from "@/constants/groups";

import { useSearch } from "@/hooks/use-searchs";

import { useLayoutFilter } from "@/modules/ui/layouts/stores/use-layout-filter";

import { Toolbar } from "@/modules/ui/layouts/components/toolbar";
import { SelectMenu } from "@/modules/ui/layouts/components/select-menu";
import { LayoutsHub } from "@/modules/ui/layouts/components/layouts-hub";

import { GroupCells } from "@/modules/routes/groups/components/group-cells";

import { useGetGroupsByYear } from "@/modules/routes/groups/api/use-get-groups-by-year";
import { Group } from "../api/use-get-group";

export const GroupContent = () => {
  const { 
    columns, 
    groupingHeaders,
    groupingOptions,
    groupingColumn,
    selectedRows,
    setColumns,
    setGrouping
  } = useLayoutFilter();
  const { data: groups, isLoading } = useGetGroupsByYear("2025");

  useMount(() => setColumns(groupColumns));

  const {
    filteredItems,
    searchQuery,
    setSearchQuery
  } = useSearch(groups || [], groupColumns.map((column) => column.id));

  const filteredData = useMemo(() => {
    return filterByConditions(filteredItems, columns);
  }, [columns, filteredItems]);

  const sortedData = useMemo(() => {
    return sortByColumns(filteredData, columns);
  }, [columns, filteredData]);

  const groupMapped = sortedData.filter((item) => selectedRows.has(item.id));

  const groupingData = useMemo(() => {
    if (!groupingColumn) return {} as Record<string, Group[]>;

    return groupByColumn(
      sortedData, 
      groupingColumn.id as keyof Group,
      groupingOptions["by"]
    );
  }, [sortedData, groupingColumn, groupingOptions]);

  useEffect(() => {
    const headers = Object.keys(groupingData);

    if (headers.join(",") !== Object.keys(groupingHeaders).join(",") && groupingColumn) {
      setGrouping(headers);
    }
  }, [
    groupingData,
    groupingHeaders,
    groupingColumn,
    setGrouping
  ]); 

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
        groupingData={Object.fromEntries(
          Object.entries(groupingData).sort(
            ([keyA], [keyB]) => (groupingHeaders[keyA]?.order ?? 0) - (groupingHeaders[keyB]?.order ?? 0)
          )
        )}
        columns={columns.filter((column) => !column.isHide).sort((a, b) => a.order - b.order)} 
        searchQuery={searchQuery} 
        renderCell={({ ...props }) => <GroupCells {...props} />}
      />
    </div>
  );
}

