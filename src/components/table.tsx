import { TableBodyProps, TableHeaderProps, TableHeadProps } from "@/types/table";

import { Checkbox } from "@/components/ui/checkbox";
import React from "react";

const TableHeader = <T extends { id: string }>({
  columns,
}: TableHeaderProps<T>) => {
  return (
    <div className="h-[34px] relative">
      <div className="flex h-[34px] text-secondary-foreground left-0 right-0 relative box-border shadow-[inset_0_-1px_0_rgb(233,233,231),inset_0_1px_0_rgb(233,233,231)] min-w-[calc(100%-192px)] group">
        <Table.SelectAll />
        {columns.map((column, index) => (
          <Table.Head key={index} column={column} />
        ))}
      </div>
    </div>
  );
}

const TableBody = <T extends { id: string }>({ data }: TableBodyProps<T>) => {
  return (
    <div className="relative w-full isolation-auto">
      <div style={{ height: `${data.length * 34}px` }} className="w-full relative shrink-0">
        {data.map((item, rowIndex) => (
          
        ))}
      </div>
    </div>
  );
}

const TableSelectAll = () => {
  return (
    <div className="sticky -left-8 flex z-[83]">
      <div className="absolute -left-8">
        <div className="group-hover:opacity-100 opacity-0 transition-opacity">
          <div className="h-full items-start justify-center flex cursor-pointer">
            <div className="size-8 flex items-center justify-center">
              <Checkbox />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const TableHead = <T extends { id: string }>({ column }: TableHeadProps<T>) => {
  return (
    <div
      style={{ width: `${column.width}px` }}
      className="flex shrink-0 overflow-hidden text-sm border-r border-border"
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

export const Table = {
  Body: TableBody,
  Head: TableHead,
  Header: TableHeader,
  SelectAll: TableSelectAll,
}