import { 
  ColumnProps,
  RendenCellFn, 
  TableBaseProps 
} from "@/types/table";

export type LayoutType = "table";

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
}

export type LayoutFilterStore<T extends object> = BaseStore<T> & FilterStore<T>;

export interface LayoutFilterProps<T extends object> {
  column: ColumnProps<T>;
} 