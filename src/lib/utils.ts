import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

import { EmojiData, EmojiItem } from "@/types/emoji";

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