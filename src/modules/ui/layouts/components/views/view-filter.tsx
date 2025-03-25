import View from "@/modules/ui/layouts/components/ui/view";
import Layout from "@/modules/ui/layouts/components/ui/layout";

import { useToggle } from "react-use";
import { PlusIcon } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";

import { useViewOption } from "@/modules/ui/layouts/stores/use-view-option";
import { useLayoutFilter } from "@/modules/ui/layouts/stores/use-layout-filter";

export const ViewFilter = () => {
  const { 
    columns,
    addFilter
  } = useLayoutFilter();
  const { ...props } = useViewOption();

  const [addMoreFilter, toggleFilter] = useToggle(false);

  if (columns.filter((columns) => columns.filter.isFilter).length === 0 || addMoreFilter) {
    return (
      <>
        <View.Header label="Add filter" {...props} />
        <Command className="h-auto">
          <View.Content>
            <CommandInput autoFocus placeholder="Filter by..." />
          </View.Content>
          <CommandList className="p-1">
            <CommandEmpty>No Result</CommandEmpty>
            {columns
              .filter((column) => !column.filter.isFilter)
              .map((column, index) => (
                <CommandItem 
                  key={index}
                  onSelect={() => {
                    addFilter(column.id);
                    toggleFilter(false);
                  }}
                  className="h-[30px] gap-2.5 px-3 rounded-sm text-primary data-[selected=true]:bg-popover-foreground"
                >
                  <column.icon className="size-4 shrink-0 text-primary" />
                  {column.label}
                </CommandItem>
              ))
            }
          </CommandList>
        </Command>
        <View.Content line>
          <View.Item sub icon={PlusIcon} label="Add advanced filter" />
        </View.Content>
      </>
    );
  }

  return (
    <>
      <View.Header label="Filters" {...props} />
      <View.Content>
        {columns
          .filter((column) => column.filter.isFilter)
          .map((column, index) => (
            <div key={index} className="flex flex-row items-center py-1 px-2.5 h-8 gap-3">
              <div className="size-6 flex items-center justify-center relative">
                <div className="h-8 w-px border-r border-border" />
                <div className="h-px w-4 border-b border-border absolute -right-1" />
              </div>
              <Layout.Filter column={column} /> 
            </div>
        ))}
      </View.Content>
      <View.Content>
        <View.Item icon={PlusIcon} label="Add filter" onClick={toggleFilter} sub />
      </View.Content>
    </>
  ); 
}