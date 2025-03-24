import { ColumnProps, FilterCondition } from "./types/layouts";

function applyCondition(
  condition: FilterCondition,
  value: string,
  searchQuery: string
): boolean {
  if (value === "") return false;

  const stringValue = value.toLowerCase();
  const query = searchQuery != null ? String(searchQuery).toLowerCase() : "";

  switch (condition) {
    case FilterCondition.IS:
      return stringValue === query;
    case FilterCondition.IS_NOT: 
      return stringValue !== query;
    case FilterCondition.CONTAINS:
      return stringValue.includes(query);
    case FilterCondition.DOES_NOT_CONTAIN:
      return !stringValue.includes(query);
    case FilterCondition.STARTS_WITH:
      return stringValue.startsWith(query);
    case FilterCondition.ENDS_WITH:
      return stringValue.endsWith(query);
    case FilterCondition.IS_EMPTY:
      return stringValue === "";
    case FilterCondition.IS_NOT_EMPTY:
      return stringValue !== "";
    default:
      return false;
  }
}

export function filterByConditions<T extends object>(
  data: T[],
  columns: ColumnProps<T>[],
): T[] {
  if (!data || !columns || columns.length === 0) return data;

  return data.filter((item) => {
    return columns.every((column) => {
      const value = item[column.id] as string;
      return applyCondition(column.filter.condition, value, column.filter.searchQuery);
    });
  });
}

export function sortByColumns<T extends object>(
  data: T[],
  columns: ColumnProps<T>[],
): T[] {
  if (!data || columns.length === 0) return data;

  return data.sort((a, b) => {
    for (const column of columns) {
      if (!column.sort.isSort) continue;

      const valueA = a[column.id] as string;
      const valueB = b[column.id] as string;

      const comparison = String(valueA).localeCompare(String(valueB), undefined, { numeric: true });

      if (comparison !== 0) {
        return column.sort.sortBy === "asc" ? comparison : -comparison;
      }
    }

    return 0;
  });
}

export function highlightText(text: string, highlight: string) {
  if (!highlight.trim()) {
    return (<span className="leading-2.5">{text}</span>);
  }

  const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escapedHighlight})`, "gi");
  const parts = text.split(regex);

  return (
    <span className="leading-1.5 whitespace-pre-wrap break-words inline font-medium bg-[linear(to_right,rgba(55,53,47,0.16),rgba(55,53,47,0.16)_100%)] bg-repeat-x bg-[length:100%_1px] bg-bottom mr-1.5">
      {parts.map((part, index) => 
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={index} className="bg-[#ffcd3866] text-primary outline-[#ffcd3866] outline-2 outline-offset-[-0.5px] rounded border-b-0">
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </span>
  );
}