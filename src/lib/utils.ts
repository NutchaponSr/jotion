import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import { formatDistanceToNowStrict } from "date-fns";

import { timesOfDay } from "@/types/date";
import { EmojiData, EmojiItem } from "@/types/emoji";
import { ColumnProps, FilterCondition } from "@/modules/ui/layouts/types/layouts";

import emojisData from "@/constants/emojis.json";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function randomString(length: number) {
  return Array.from({ length }, () => Math.random().toString(36).substring(2, 3)).join("");
}

export function cuid() {
  const timestamp = Date.now().toString(36);

  let counter = 0;
  const count = (counter++).toString(36);

  const random = randomString(8);

  return "c" + timestamp + count + random;
}

export function getEmojis() {
  const emojiObject = emojisData as EmojiData;

  const emojis = Object.entries(emojiObject.emojis).reduce((acc, [category, subCategory]) => {
    acc[category] = Object.values(subCategory).flatMap((emojiList) =>
      emojiList.map((emoji: EmojiItem) => ({
        name: emoji.name,
        emoji: emoji.emoji,
      }))
    );

    return acc;
  }, {} as Record<string, { emoji: string; name: string }[]>);

  return Object.entries(emojis).map(([category, emojis]) => ({
    category,
    emojis
  }));
}

export function formatTimeElapsed(date: string) {
  let timeElapsed = formatDistanceToNowStrict(new Date(date));

  timeElapsed = timeElapsed
    .replace(" second", "s")
    .replace(" seconds", "s")
    .replace(" minute", "m")
    .replace(" minutes", "m")
    .replace(" hour", "hr")
    .replace(" hours", "hr")
    .replace(" days", "d")
    .replace(" day", "d")

  return `${timeElapsed} ago`;
}

export function formatGreeting(date: Date): string {
  const hour = date.getHours(); 

  const timeOfDay = timesOfDay.find(({ from, to }) => from < to ? hour >= from && hour < to : hour >= from || hour < to);

  return `Good ${timeOfDay?.time || "Day"}`;
}

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