import Content from "../filter-content";

import { 
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon, 
  ChevronDownIcon, 
  PlusIcon 
} from "lucide-react";
import { createElement } from "react";

import { 
  ColumnProps,
  LayoutBaseProps, 
  LayoutDropdownProps, 
  LayoutPopoverProps 
} from "@/modules/ui/layouts/types/layouts";

import { useSearch } from "@/hooks/use-searchs";

import { useLayoutFilter } from "@/modules/ui/layouts/stores/use-layout-filter";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Table } from "@/modules/ui/layouts/components/ui/table";

import { SortContent } from "@/modules/ui/layouts/components/sort-content";

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
  label,
  children,
  data,
  placeholder,
  showTooltip,
  showAdvanced,
  tooltipOpen,
  isOpen,
  onClose,
  onSelect
}: LayoutPopoverProps<T>) => {
  return (
    <TooltipProvider>
      <Popover open={isOpen} onOpenChange={onClose}>
        {showTooltip ? (
          <Tooltip open={tooltipOpen} delayDuration={100}>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                {children}
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent side="top" className="py-1 px-2">
              <p className="text-xs font-medium">{label}</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <PopoverTrigger asChild>
            {children}
          </PopoverTrigger>
        )}
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
    </TooltipProvider>
  );
}

const LayoutDropDown = <T extends object>({ 
  children, 
  data,
  onClick 
}: LayoutDropdownProps<T>) => {
  const {
    searchQuery,
    filteredItems,
    setSearchQuery
  } = useSearch(data, ["label"]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-60 flex flex-col gap-1">
        <DropdownMenuLabel className="p-0">
          <Input
            area="sm"
            variant="search"
            value={searchQuery}
            placeholder="Search for a property..."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </DropdownMenuLabel>
        <div className="flex flex-col">
          {filteredItems.length ?
            filteredItems.map(({ id, label }) => (
            <DropdownMenuItem key={label} onClick={() => onClick(id)} className="min-h-[30px]">
              {label}
            </DropdownMenuItem>
          )) : (
            <div className="mb-1.5 mt-0.5 flex items-center w-full py-1">
              <div className="mx-3 min-w-0 flex-auto">
                <div className="text-xs whitespace-nowrap text-ellipsis overflow-hidden text-[#787774] min-h-full">
                  No results
                </div>
              </div>
            </div>
          )}  
        </div>
      </DropdownMenuContent> 
    </DropdownMenu>
  );
}

interface LayoutFilterProps<T extends object> {
  column: ColumnProps<T>;
}

const LayoutFilter = <T extends object>({ column }: LayoutFilterProps<T>) => {
  const isFilter = column.filter.searchQuery != "";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={isFilter ? "filterActive" : "filter"} size="filter">
          {createElement(column.icon, { className: "size-4 text-secondary-foreground" })}
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
  const isSort = columns.some((column) => column.sort.isSort);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={isSort ? "filterActive" : "filter"} size="filter">
          {columns.filter((columns) => columns.sort.isSort).length > 1 
            ? (
              <>
                <ArrowUpDownIcon className="size-4" />
                <span className="max-w-[150px] text-xs font-normal whitespace-nowrap overflow-hidden text-ellipsis">
                  {columns.filter((columns) => columns.sort.isSort).length} Sorts
                </span>
              </>
            ) : (
              <>
                {columns.filter((column) => column.sort.isSort)[0].sort.sortBy === "asc" 
                  ? <ArrowUpIcon className="size-4" />
                  : <ArrowDownIcon className="size-4" />
                }
                <span className="max-w-[150px] text-xs font-normal whitespace-nowrap overflow-hidden text-ellipsis">
                  {columns.filter((column) => column.sort.isSort)[0].label}
                </span>
              </>
            )
          }
          <ChevronDownIcon className="size-3 text-secondary" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-1 flex flex-col">
        <SortContent columns={columns} />
      </PopoverContent>
    </Popover>
  );
}

export const TableLayout = <T extends { id: string }>({ ...props }: LayoutBaseProps<T>) => {
  const { selectedRows } = useLayoutFilter();

  const ids = props.data.map((row) => row.id);
  const allSelected = ids.every((id) => selectedRows.has(id));

  return (
    <Layout>
      <Table.Header {...props} ids={ids} allSelected={allSelected} />
      <Table.Body {...props} />
      <Table.Footer />
    </Layout>
  );
}

Layout.Filter = LayoutFilter;
Layout.Sort = LayoutSort;
Layout.Table = TableLayout;
Layout.Popover = LayoutPopover;
Layout.DropDown = LayoutDropDown;

export default Layout;