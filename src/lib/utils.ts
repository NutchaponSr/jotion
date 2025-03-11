import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

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