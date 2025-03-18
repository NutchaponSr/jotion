import {
  AnyColumn,
  asc,
  desc,
  SQL,
  SQLWrapper
} from "drizzle-orm";

export const sortLevel = [
  "EDITED_ASC",
  "EDITED_DESC",
  "CREATED_ASC",
  "CREATED_DESC",
  "DEFAULT",
] as const;

export type SortLevel = (typeof sortLevel)[number];
type SortFn = (column: AnyColumn | SQLWrapper) => SQL;

export type SortCatalogType = Record<SortLevel, SortFn>;

const createSortFn = (order: "asc" | "desc") => {
  return (column: AnyColumn | SQLWrapper) => (order === "asc" ? asc(column) : desc(column));
};

export const sortCatalog: SortCatalogType = {
  EDITED_ASC: createSortFn("asc"),
  EDITED_DESC: createSortFn("desc"),
  CREATED_ASC: createSortFn("asc"),
  CREATED_DESC: createSortFn("desc"),
  DEFAULT: createSortFn("desc"),
};