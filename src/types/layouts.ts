import { 
  RendenCellFn, 
  TableBaseProps 
} from "@/types/table";

export type LayoutType = "table";

export const columnType = ["TEXT", "NUMBER"] as const;
export const sortOrder = ["asc", "desc"] as const;

type ColumnType = (typeof columnType)[number];
export type SortOrder = (typeof sortOrder)[number];

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

export const filterCondition: Record<FilterCondition, string> = {
  [FilterCondition.IS]: "is",
  [FilterCondition.IS_NOT]: "is not",
  [FilterCondition.CONTAINS]: "contains",
  [FilterCondition.DOES_NOT_CONTAIN]: "does not contain",
  [FilterCondition.STARTS_WITH]: "starts with",
  [FilterCondition.ENDS_WITH]: "ends with",
  [FilterCondition.IS_EMPTY]: "is empty",
  [FilterCondition.IS_NOT_EMPTY]: "is not empty"
};

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
  isFilter: boolean;
  searchQuery: string;
  type: ColumnType;
  filterCondition: FilterCondition;
  sortBy: SortOrder;
  sortOrder: number;
  calculation: CalculationType | null;
  order: number;
  width: number;
}

export interface LayoutPopoverProps<T extends object> {
  align: "start" | "center" | "end";
  children: React.ReactNode;
  data: ColumnProps<T>[];
  placeholder?: string;
  showAdvanced?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  onSelect: (id: keyof T) => void;
}

export interface LayoutBaseProps<T extends { id: string }> extends TableBaseProps<T> {
  renderCell: RendenCellFn<T>;
}

type BaseStore<T extends object> = {
  columns: ColumnProps<T>[];
  setColumns: (columns: ColumnProps<T>[]) => void;
}

type FilterStore<T extends object> = {
  isOpenFilter: boolean;
  onOpenFilter: () => void;
  onCloseFilter: () => void;
  addFilter: (id: keyof T) => void;
  removeFilter: (id: keyof T) => void;
  onCondition: (id: keyof T, condition: FilterCondition) => void;
  onSearchQuery: (query: string) => void;
}

type SortStore<T extends object> = {
  isOpenSort: boolean;
  onOpenSort: () => void;
  onCloseSort: () => void;
  addSort: (id: keyof T) => void;
  removeSort: (id: keyof T) => void;
  removeSortAll: () => void;
  sortReorder: (columns: ColumnProps<T>[]) => void;
  onSortBy: (id: keyof T, sortBy: SortOrder) => void;
}

export type LayoutFilterStore<T extends object> = 
  BaseStore<T> & 
  FilterStore<T> &
  SortStore<T>;

export interface LayoutFilterProps<T extends object> {
  column: ColumnProps<T>;
} 