import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timestampToTime(timestamp: number) {
  const hours = Math.floor(timestamp / 60)
    .toString()
    .padStart(2, "0");
  const minutes = (timestamp % 60).toString().padStart(2, "0");
  return `${hours}:${minutes} น.`;
}
