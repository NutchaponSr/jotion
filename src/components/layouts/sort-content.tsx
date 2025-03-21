import { ChevronDownIcon, GripVerticalIcon, XIcon } from "lucide-react";

import { ColumnProps, SortOrder, sorts } from "@/types/layouts";

import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon } from "../icons";
import { useLayoutFilter } from "@/stores/use-layout-filter";

interface SortContentProps<T extends object> {
  columns: ColumnProps<T>[];  
}

export const SortContent = <T extends object>({ columns }: SortContentProps<T>) => {
  const { 
    removeSort,
    removeSortAll,
    onSortBy 
  } = useLayoutFilter();

  return (
    <>
      <div className="flex flex-col py-2">
        {columns
          .filter((column) => column.sort.isSort)
          .map((column, index) => (
            <div key={index} className="flex items-center min-h-8 text-sm gap-2 mx-2">
              <div className="flex items-center justify-center size-7 shrink-0 cursor-grab">
                <GripVerticalIcon className="size-4 text-icon" />
              </div>
              <div className="flex-auto">
                <div className="flex items-center gap-2 whitespace-nowrap overflow-hidden text-ellipsis">
                  <Button size="md" variant="outline">
                    <column.icon className="size-4 text-icon" />
                    {column.label}
                    <ChevronDownIcon className="size-4 text-icon" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="md" variant="outline">
                        {sorts[column.sort.sortBy]}
                        <ChevronDownIcon className="size-4 text-icon" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-40">
                      {Object.entries(sorts).map(([key, sort], index) => (
                        <DropdownMenuItem key={index} onClick={() => onSortBy(column.id, key as SortOrder)}>
                          {sort}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="ml-auto shrink-0">
                <Button.Icon onClick={() => removeSort(column.id)} className="size-6 hover:bg-popover-foreground">
                  <XIcon className="size-4 text-icon" />
                </Button.Icon>
              </div>
            </div>
          ))
        }
      </div>
      <div className="flex flex-col items-center">
        <Button variant="item" size="item">
          <PlusIcon className="size-4 text-secondary-foreground" />
          Add sort
        </Button>
        <Button onClick={removeSortAll} variant="item" size="item" className="hover:text-destructive group">
          <TrashIcon className="size-4 group-hover:text-destructive text-secondary-foreground transition-colors" />
          Delete sort
        </Button>
      </div>
      <pre className="text-xs">
        {JSON.stringify(columns, null, 2)}
      </pre>
    </>
  );
}