import { JSX } from "react";

import { ColumnProps } from "@/types/layouts";

export interface TableBaseProps<T extends { id: string }> {
  columns: ColumnProps<T>[];
  data: T[];
  searchQuery: string;
}

export type RendenCellFn<T extends object> = (args: {
  cell: T,
  column: ColumnProps<T>,
  searchQuery: string,
}) => JSX.Element | undefined;

export interface TableCellProps {
  children: React.ReactNode;
  width: number;
}

export interface TableSelectAllProps {
  ids: string[];
  allSelected: boolean;
}

export interface TableSelectRowProps<T extends { id: string }> {
  cell: T;
}

export interface TableRowProps<T extends { id: string }> extends Omit<TableBaseProps<T>, "data"> {
  cell: T;
  index: number;
  renderCell: RendenCellFn<T>;
}

export interface TableHeadProps<T extends { id: string }> {
  column: ColumnProps<T>;
}

export interface TableHeaderProps<T extends { id: string }> extends TableBaseProps<T> {
  ids: string[];
  allSelected: boolean;
}

export interface TableBodyProps<T extends { id: string }> extends TableBaseProps<T> {
  renderCell: RendenCellFn<T>;
}