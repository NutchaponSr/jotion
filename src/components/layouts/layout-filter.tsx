import Content from "@/components/layouts/filter-content";

import { createElement } from "react";
import { ChevronDownIcon } from "lucide-react";

import { ColumnProps } from "@/types/table";

import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface LayoutFilterProps<T extends object> {
  column: ColumnProps<T>;
}

export const LayoutFilter = <T extends object>({ column }: LayoutFilterProps<T>) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="filter" size="filter">
          {createElement(column.icon, { className: "size-3.5 text-secondary-foreground" })}
          <span className="max-w-[150px] text-xs font-normal whitespace-nowrap overflow-hidden text-ellipsis">
            {column.label}
          </span>
          <ChevronDownIcon className="size-3 text-secondary" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[220px] p-1">
        <Content column={column} />
      </PopoverContent>
    </Popover>
  );
}

