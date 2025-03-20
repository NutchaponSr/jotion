import Layout from "@/components/layouts/layout";

import { 
  ArrowUpDownIcon,
  ListFilterIcon, 
  MoreHorizontalIcon, 
  SearchIcon, 
  ZapIcon
} from "lucide-react";
import { useToggle } from "react-use";

import { ColumnProps } from "@/types/table";

import { useLayoutFilter } from "@/stores/use-layout-filter";

import { Button } from "@/components/ui/button";

import { ToolbarFilter } from "@/components/toolbar-filter";

interface ToolbarProps<T extends object> {
  columns: ColumnProps<T>[];
}

export const Toolbar = <T extends object>({
  columns
}: ToolbarProps<T>) => {
  const { 
    isOpenFilter,
    addFilter,
    onOpenFilter,
    onCloseFilter 
  } = useLayoutFilter();

  const [isOpenToolbarFilter, toggleToolbarFilter] = useToggle(false);

  return (
    <section className="min-h-10 px-24 sticky left-0 shrink-0 z-[86]">
      <div className="flex items-center h-10 w-full shadow-[0_1px_0_rgba(233,233,231)] dark:shadow-[0_1px_0_rgba(47,47,47)]">
        {/* TODO: Change year */}
        <div role="tablist" className="flex items-center h-full grow overflow-hidden" />
        <div className="flex items-center gap-0.5">
          <Layout.Popover
            showAdvanced
            align="end"
            placeholder="Filter by..."
            isOpen={isOpenFilter}
            onClose={onCloseFilter}
            data={columns.filter((column) => !column.isFilter)} 
            onSelect={(id) => {
              onCloseFilter();
              addFilter(id);
              toggleToolbarFilter(true);
            }}
          >
            <Button.Icon 
              onClick={() => {
                if (columns.some((column) => column.isFilter)) toggleToolbarFilter();
                else setTimeout(() => onOpenFilter(), 10);
              }} 
              className="size-7 hover:bg-popover-foreground"
            >
              <ListFilterIcon className="size-4 text-[#9a9a97]" />
            </Button.Icon>
          </Layout.Popover>
          {/* TODO: Sort columns */}
          {/* <Layout.Popover align="end" data={columns} onSelect={() => {}}> */}
            <Button.Icon className="size-7 hover:bg-popover-foreground">
              <ArrowUpDownIcon className="size-4 text-[#9a9a97]" />
            </Button.Icon>
          {/* </Layout.Popover> */}
          <Button.Icon className="size-7 hover:bg-popover-foreground">
            <ZapIcon className="size-4 text-[#9a9a97]" />
          </Button.Icon>
          <Button.Icon className="size-7 hover:bg-popover-foreground">
            <SearchIcon className="size-4 text-[#9a9a97]" />
          </Button.Icon>
          <Button.Icon className="size-7 hover:bg-popover-foreground">
            <MoreHorizontalIcon className="size-4 text-[#9a9a97]" />
          </Button.Icon>
        </div>
      </div>
      {(isOpenToolbarFilter && columns.some((column) => column.isFilter || column.isSort)) && (
        <ToolbarFilter columns={columns} />
      )}
    </section>
  );
}