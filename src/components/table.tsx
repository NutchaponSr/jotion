import React from "react";

import { GripVerticalIcon, PlusIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { 
  TableBodyProps, 
  TableCellProps, 
  TableHeaderProps, 
  TableHeadProps, 
  TableRowProps,
  TableSelectAllProps,
  TableSelectRowProps
} from "@/types/table";

import { useLayout } from "@/stores/use-layout";

import { Checkbox } from "@/components/ui/checkbox";
import { useLayoutFilter } from "@/stores/use-layout-filter";

const TableHeader = <T extends { id: string }>({
  columns,
  ...props
}: TableHeaderProps<T>) => {
  const { isOpenToolbarFilter } = useLayout();

  return (
    <div className="h-[34px] relative">
      <div className={cn(
        "flex h-[34px] text-secondary-foreground left-0 right-0 relative box-border shadow-[inset_0_-1px_0_rgb(233,233,231),inset_0_1px_0_rgb(233,233,231)] dark:shadow-[-3px_0_0_rgb(25,25,25),inset_0_-1px_0_rgb(47,47,47),inset_0_1px_0_rgb(47,47,47)] min-w-[calc(100%-192px)] group",
        isOpenToolbarFilter && "shadow-[inset_0_-1px_0_rgb(233,233,231)] dark:shadow-[inset_0_-1px_0_rgb(47,47,47)]",
      )}>
        <Table.SelectAll {...props} />
        {columns.map((column, index) => (
          <Table.Head key={index} column={column} />
        ))}
      </div>
    </div>
  );
}

const TableBody = <T extends { id: string }>({ 
  data, 
  ...props
}: TableBodyProps<T>) => {
  return (
    <div className="relative w-full isolation-auto">
      <div style={{ height: `${data.length * 32}px` }} className="w-full relative shrink-0">
        {data.map((cell, index) => (
          <Table.Row key={index} index={index} cell={cell} {...props} />
        ))}
      </div>
      <div role="button" className="transition flex items-center gap-2 h-8 pl-2 leading-5 hover:bg-popover-foreground cursor-pointer">
        <PlusIcon className="size-4 text-secondary" style={{ strokeWidth: 2 }} />
        <span className="text-sm text-secondary inline-flex items-center sticky left-10">
          New Page
        </span>
      </div>
    </div>
  );
}

const TableSelectAll = ({ allSelected, ids }: TableSelectAllProps) => {
  const { toggleAllSelection } = useLayoutFilter();

  return (
    <div className="sticky -left-8 flex z-[83] group/select">
      <div className="absolute -left-8">
        <div className={cn(
          "group-hover:opacity-60 opacity-0 transition-opacity group-hover/select:opacity-100",
          allSelected && "opacity-100 group-hover:opacity-100",
        )}>
          <div className="h-full items-start justify-center flex cursor-pointer">
            <div className="size-8 flex items-center justify-center">
              <Checkbox 
                className="size-3.5" 
                checked={allSelected}
                onCheckedChange={() => toggleAllSelection(ids)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const TableSelect = <T extends { id: string }>({ cell }: TableSelectRowProps<T>) => {
  const { selectedRows, toggleRowSelection } = useLayoutFilter();

  return (
    <div className="sticky -left-8 flex group/select">
      <div className="absolute -left-8">
        <div className={cn(
          "group-hover:opacity-60 opacity-0 transition-opacity group-hover/select:opacity-100", 
          selectedRows.has(cell.id) && "opacity-100 group-hover:opacity-100",
        )}>
          <div className="h-full items-start justify-center flex cursor-pointer">
            <div className="size-8 flex items-center justify-center">
              <Checkbox 
                className="size-3.5" 
                checked={selectedRows.has(cell.id)}
                onCheckedChange={() => toggleRowSelection(cell.id)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const TableAction = () => {
  return (
    <div className="sticky -left-[50px] flex">
      <div className="absolute -left-[50px]">
        <div className="group-hover:opacity-100 opacity-0 h-full transition">
          <div className="h-full items-center justify-center flex cursor-pointer">
            <div className="w-[18px] h-8 flex items-center justify-center">
              <button className="transition flex items-center justify-center w-[18px] h-6 rounded hover:bg-popover-foreground">
                <GripVerticalIcon className="size-4 shrink-0 text-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const TableHead = <T extends { id: string }>({ column }: TableHeadProps<T>) => {
  const { isOpenToolbarFilter } = useLayout();

  return (
    <div
      style={{ width: `${column.width}px` }}
      className={cn("flex shrink-0 overflow-hidden text-sm border-r border-border", isOpenToolbarFilter && "border-none")}
    >
      <div role="button" className="transition flex items-center w-full h-full px-2 hover:bg-popover-foreground cursor-pointer">
        <div className="flex items-center leading-[120%] text-sm flex-auto">
          <div className="mr-1 grid justify-center items-center">
            <div className="flex items-center justify-center size-6">
              {React.createElement(column.icon, { className: "size-4 shrink-0 text-[#9a9a97]" })}
            </div>
          </div>
          <h3 className="whitespace-nowrap overflow-hidden text-ellipsis capitalize">
            {String(column.label)}
          </h3>
        </div>
      </div>
    </div>
  );
}

const TableCell = ({ children, width }: TableCellProps) => {
  return (
    <div
      style={{ width: `${width}px` }}
      className="flex h-full relative border-r border-border"
    >
      <div role="button" className="transition relative flex overflow-clip w-full whitespace-normal min-h-8 py-1.5 px-2 items-center">
        {children}
      </div>
    </div>
  );
}

const TableRow = <T extends { id: string }>({ 
  cell,
  index,
  columns,
  searchQuery,
  renderCell
}: TableRowProps<T>) => {
  const { selectedRows } = useLayoutFilter();

  return (
    <div 
      className="absolute left-0 top-0 w-full group" 
      style={{ transform: `translateY(${index * 32}px)` }}
    >
      <div className="flex h-8 border-b border-border">
        <Table.Select cell={cell} />
        <Table.Action />
        {columns.map((column, colIndex) => (
          <Table.Cell key={colIndex} width={column.width}
          >
            {renderCell({ cell, column, searchQuery })}
          </Table.Cell>
        ))}
        {selectedRows.has(cell.id) && (
          <div className="absolute inset-0 top-[0.75px] bottom-0 bg-marine/14 rounded pointer-events-none" />
        )}
      </div>
    </div>
  );
}

const TableFooter = () => {
  return (
    <div className="h-12 w-full relative group">
      <div className="border-t border-border flex min-w-full">
        <div className="flex pr-8">
          {/* TODO: Calculation */}
        </div>
      </div>
    </div>
  );
}

export const Table = {
  Action: TableAction,
  Body: TableBody,
  Cell: TableCell,
  Footer: TableFooter,
  Head: TableHead,
  Header: TableHeader,
  Row: TableRow,
  Select: TableSelect,
  SelectAll: TableSelectAll,
}