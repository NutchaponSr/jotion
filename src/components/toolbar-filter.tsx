import Layout from "@/components/layouts/layout";

import { PlusIcon } from "lucide-react";

import { ColumnProps } from "@/types/table";

import { useLayoutFilter } from "@/stores/use-layout-filter";

import { Button } from "@/components/ui/button";

import { LayoutFilter } from "@/components/layouts/layout-filter";

interface ToolbarFilterProps<T extends object> {
  columns: ColumnProps<T>[];
}

export const ToolbarFilter = <T extends object>({ columns }: ToolbarFilterProps<T>) => {
  const { addFilter } = useLayoutFilter();

  return (
    <div className="left-24 w-full">
      <div className="flex pt-1">
        <div className="relative grow-0 overflow-hidden">
          <div className="flex items-center py-2 gap-1.5 overflow-x-auto overflow-y-hidden">
            {columns
              .filter((column) => column.isFilter)
              .map((column, index) => (
                <LayoutFilter key={index} column={column} /> 
            ))}
            <Layout.Popover
              showAdvanced
              align="center"
              placeholder="Filter by..."
              data={columns.filter((column) => !column.isFilter)} 
              onSelect={(id) => addFilter(id)}
            >
              <Button variant="ghost" size="filter" className="rounded-full text-secondary hover:text-secondary text-xs">
                <PlusIcon className="size-4" />
                Filter
              </Button>
            </Layout.Popover>
          </div>  
        </div>
      </div>
    </div>
  );
}