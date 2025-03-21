import Content from "./filter-content";

import { 
  ArrowUpIcon, 
  ChevronDownIcon, 
  PlusIcon 
} from "lucide-react";
import { createElement } from "react";

import { 
  ColumnProps,
  LayoutBaseProps, 
  LayoutPopoverProps 
} from "@/types/layouts";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { Table } from "@/components/table";

import { SortContent } from "@/components/layouts/sort-content";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <section className="grow shrink-0 flex flex-col relative">
      <div className="h-full relative float-left min-w-full select-none lining-nums pb-[180px] px-24">
        {children}
      </div>
    </section>
  );
}

const LayoutPopover = <T extends object>({ 
  align,
  children,
  data,
  placeholder,
  showAdvanced,
  isOpen,
  onClose,
  onSelect
}: LayoutPopoverProps<T>) => {
  return (
    <Popover open={isOpen} onOpenChange={onClose}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent align={align} className="p-0 w-60">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>No Result</CommandEmpty>
            <CommandGroup>
              {data.map((item, index) => (
                <CommandItem 
                  key={index}
                  value={item.label}
                  onSelect={() => onSelect(item.id)}
                  className="gap-2 leading-[120%] w-full min-h-[30px] text-sm px-2 py-1"
                >
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
        {showAdvanced && (
          <div className="p-1 shadow-[0_-1px_0_rgba(55,53,47,0.09)] dark:shadow-[0_-1px_0_rgba(255,255,255,0.094)] mt-px">
            <Button variant="item" size="item">
              <PlusIcon style={{ strokeWidth: 2 }} />
              Add advanced filter
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

interface LayoutFilterProps<T extends object> {
  column: ColumnProps<T>;
}

const LayoutFilter = <T extends object>({ column }: LayoutFilterProps<T>) => {
  const isFilter = column.searchQuery != "";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={isFilter ? "filterActive" : "filter"} size="filter">
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

interface LayoutSortProps<T extends object> {
  columns: ColumnProps<T>[];
}

const LayoutSort = <T extends object>({ columns }: LayoutSortProps<T>) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="filter" size="filter">
          <ArrowUpIcon />
          <span className="max-w-[150px] text-xs font-normal whitespace-nowrap overflow-hidden text-ellipsis">
            {columns.filter((column) => column.isSort)[0].label}
          </span>
          <ChevronDownIcon className="size-3 text-secondary" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-1">
        <SortContent columns={columns} />
      </PopoverContent>
    </Popover>
  );
}

export const TableLayout = <T extends { id: string }>({ ...props }: LayoutBaseProps<T>) => {
  return (
    <Layout>
      <Table.Header {...props} ids={[]} allSelected={false} />
      <Table.Body {...props} />
      <Table.Footer />
    </Layout>
  );
}

Layout.Filter = LayoutFilter;
Layout.Sort = LayoutSort;
Layout.Table = TableLayout;
Layout.Popover = LayoutPopover;

export default Layout;