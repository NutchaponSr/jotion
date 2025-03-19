import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import { formatDistanceToNowStrict } from "date-fns";

import { EmojiData, EmojiItem } from "@/types/emoji";

import emojisData from "@/constants/emojis.json";
import { timesOfDay } from "@/types/date";

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