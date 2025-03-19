import { ColumnProps } from "@/types/table";

export type LayoutType = "table";

export interface LayoutBaseProps<T extends { id: string }> {
  data: T[];
  searchQuery: string;
  columns: ColumnProps<T>[];
}