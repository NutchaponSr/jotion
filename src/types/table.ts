import { JSX } from "react";

export const columnType = ["TEXT", "NUMBER"] as const;
export const sortOrder = ["asc", "desc"] as const;

type ColumnType = (typeof columnType)[number];
type SortOrder = (typeof sortOrder)[number];

export enum FilterCondition {
  IS = "is",
  IS_NOT = "isNot",
  CONTAINS = "contains",
  DOES_NOT_CONTAIN = "doesNotContain",
  STARTS_WITH = "startsWith",
  ENDS_WITH = "endsWith",
  IS_EMPTY = "isEmpty",
  IS_NOT_EMPTY = "isNotEmpty"
}

export type CalculationType = 
  "COUNT_ALL" |
  "COUNT_VALUES" |
  "COUNT_UNIQUE" |
  "COUNT_EMPTY" |
  "COUNT_NOT_EMPTY" |
  "PERCENT_EMPTY" |
  "PERCENT_NOT_EMPTY";

export const sorts: Record<SortOrder, string> = {
  asc: "Ascending",
  desc: "Descending",
}

export interface ColumnProps<T extends object> {
  id: keyof T;
  icon: React.ElementType;
  label: string;
  isLock: boolean;
  isHide: boolean;
  isSort: boolean;
  isSorted: boolean;
  isFilter: boolean;
  searchQuery: string;
  type: ColumnType;
  filterCondition: FilterCondition;
  sortBy: (typeof sorts)[keyof typeof sorts];
  sortOrder: number;
  calculation: CalculationType | null;
  order: number;
  width: number;
}

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