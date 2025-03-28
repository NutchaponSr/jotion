/* eslint-disable @typescript-eslint/no-unused-vars */
import { 
  RendenCellFn, 
  TableBaseProps 
} from "@/types/table";
import { LucideIcon } from "lucide-react";

const columnType = ["TEXT", "NUMBER"] as const;
const sortOrder = ["asc", "desc"] as const;

export type ColumnType = (typeof columnType)[number];
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

interface SortProps {
  isSort: boolean;
  sortBy: SortOrder;
  order: number;
}

interface FilterProps {
  isFilter: boolean;
  searchQuery: string;
  condition: FilterCondition;
}

export interface ColumnProps<T extends object> {
  id: keyof T;
  icon: React.ElementType;
  label: string;
  isLock: boolean;
  isHide: boolean;
  sort: SortProps;
  filter: FilterProps;
  type: ColumnType;
  calculation: CalculationType | null;
  order: number;
  width: number;
}

interface LayoutSelectBase<T extends object> {
  align: "start" | "center" | "end";
  data: ColumnProps<T>[];
  children: React.ReactNode;
  placeholder?: string;
}

export interface LayoutPopoverProps<T extends object> extends LayoutSelectBase<T> {
  label?: string;
  tooltipOpen?: boolean;
  showTooltip?: boolean;
  showAdvanced?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  onSelect: (id: keyof T) => void;
}

export interface LayoutDropdownProps<T extends object> extends LayoutSelectBase<T> {
  onClick: (id: keyof T) => void;
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
  onSearchQuery: (query: string, id: keyof T) => void;
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
  onChangeSort: (oldId: keyof T, newId: keyof T) => void;
}

type PropertiesStore<T extends object> = {
  selectedRows: Set<string>;
  hideAllColumns: () => void;
  showAllColumns: () => void;
  toggleColumnVisible: (id: keyof T) => void;
  toggleRowSelection: (id: string) => void;
  toggleAllSelection: (id: string[]) => void;
  reorderColumn: (columns: ColumnProps<T>[]) => void;
}

type GroupingStore<T extends object> = {
  groupingColumn: ColumnProps<T> | null;
  groupingHeaders: Record<string, GroupingProps>;
  groupingOptions: Record<string, string>;
  addGrouping: (column: ColumnProps<T>) => void;
  removeGrouping: () => void;
  reorderGrouping: (headers: string[]) => void;
  setGrouping: (headers: string[]) => void;
  toggleGroupVisible: (header: string) => void;
  hideAllHeaders: () => void;
  showAllHeaders: () => void;
  onOption: (key: string, value: string) => void;
}

export type LayoutFilterStore<T extends object> = 
  BaseStore<T> & 
  FilterStore<T> &
  SortStore<T> &
  PropertiesStore<T> &
  GroupingStore<T>;

export interface GroupingProps {
  isOpen: boolean;
  isShow: boolean;
  order: number;
}

// export type GroupingOptionKey = "by" | "sort";

const textBy = ["exact", "alphabetical"] as const;
const textSort = ["manual", "alphabetical", "reverseAlphabetical"] as const;
const numberSort = sortOrder;

export type TextBy = (typeof textBy)[number];
type TextSort = (typeof textSort)[number];
type NumberSort = (typeof numberSort)[number];

interface OptionCategory<T extends string> {
  label: string;
  options: Record<T, string>;
}

interface TextOptions {
  by: OptionCategory<TextBy>;
  sort: OptionCategory<TextSort>;
}

export const textOptions: TextOptions = {
  by: {
    label: "Text by",
    options: {
      exact: "Exact",
      alphabetical: "Alphabetical",
    }
  },
  sort: {
    label: "Sort",
    options: {
      manual: "Manual",
      alphabetical: "Alphabetical",
      reverseAlphabetical: "Reverse alphabetical",
    },
  },
}

interface NumberOptions {
  by?: never,
  sort: OptionCategory<NumberSort>;
}

export const numberOptions: NumberOptions = {
  sort: {
    label: "Sort",
    options: {
      asc: "Ascending",
      desc: "Descending",
    },
  },
}

interface GroupingOption {
  TEXT: TextOptions,
  NUMBER: NumberOptions,
}

export const groupOptionCatalog: GroupingOption = {
  TEXT: textOptions,
  NUMBER: numberOptions,
}

export interface LayoutFilterProps<T extends object> {
  column: ColumnProps<T>;
} 

const layouts = [
  "table",
  "board",
  "calendar",
  "list",
  "gallery",
] as const;

const viewOption = [
  "layout",
  "filter",
  "sort",
  "grouping",
  "properties",
  "automations",
] as const; 

export type LayoutType = (typeof layouts)[number];
export type ViewOptionType = (typeof viewOption)[number];

type ToolbarFilterProps = {
  isOpenToolbarFilter: boolean;
  onOpenToolbarFilter: () => void;
  onCloseToolbarFilter: () => void;
  onToggleToolbarFilter: () => void;
}

export type LayoutStore = ToolbarFilterProps;

export type viewOptionStore = {
  type: ViewOptionType | null;
  isOpen: boolean;
  onBack: () => void;
  onOpen: (type: ViewOptionType) => void;
  onClose: () => void;
  onToggle: () => void;
}

export type PageView = "side" | "center" | "full";

export type PageViewProps = {
  icon: LucideIcon;
  label: string;
  description: string;
  default?: boolean;
} 