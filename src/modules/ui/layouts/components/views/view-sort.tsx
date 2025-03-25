import View from "@/modules/ui/layouts/components/ui/view";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";

import { SortContent } from "@/modules/ui/layouts/components/sort-content";

import { useViewOption } from "@/modules/ui/layouts/stores/use-view-option";
import { useLayoutFilter } from "@/modules/ui/layouts/stores/use-layout-filter";

export const ViewSort = () => {
  const { 
    columns, 
    addSort
  } = useLayoutFilter();
  const { ...props } = useViewOption();

  if (columns.filter((column) => column.sort.isSort).length === 0) {
    return (
      <>
        <View.Header label="New sort" {...props} />
        <Command className="h-auto">
          <View.Content>
            <CommandInput placeholder="Sort by..." />
          </View.Content>
          <CommandList className="p-1">
            <CommandEmpty>No results</CommandEmpty>
            {columns
              .filter((column) => !column.sort.isSort)
              .map((column, index) => (
                <CommandItem 
                  key={index} 
                  onSelect={() => addSort(column.id)}
                  className="h-[30px] gap-2.5 px-3 rounded-sm text-primary data-[selected=true]:bg-popover-foreground"
                >
                  <column.icon className="size-4 shrink-0 text-primary" />
                  {column.label}
                </CommandItem>
              ))
            }
          </CommandList>
        </Command>
      </>
    );
  }

  return (
    <>
      <View.Header label="Sort" {...props} />
      <View.Content>
        <SortContent columns={columns} />
      </View.Content>
    </>
  );
}