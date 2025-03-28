import Layout from "@/modules/ui/layouts/components/ui/layout";

import { PlusIcon } from "lucide-react";

import { ColumnProps } from "@/modules/ui/layouts/types/layouts";

import { useLayoutFilter } from "@/modules/ui/layouts/stores/use-layout-filter";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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
            {columns.some((column) => column.sort.isSort) && <Layout.Sort columns={columns} />}
            {columns.some((column) => column.filter.isFilter && column.sort.isSort) && (
              <Separator orientation="vertical" className="h-6 rounded-md" />
            )}
            {columns
              .filter((column) => column.filter.isFilter)
              .map((column, index) => (
                <Layout.Filter key={index} column={column} /> 
            ))}
            <Layout.Popover
              showAdvanced
              align="center"
              placeholder="Filter by..."
              data={columns.filter((column) => !column.filter.isFilter)} 
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