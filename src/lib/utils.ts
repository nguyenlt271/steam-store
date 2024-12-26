/* eslint-disable @typescript-eslint/no-explicit-any */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTimeLargest(seconds: number) {
  if (seconds >= 86400) {
    const days = Math.round(seconds / 86400);
    return `${days} days`;
  } else if (seconds >= 3600) {
    const hours = Math.round(seconds / 3600);
    return `${hours} hours`;
  } else if (seconds >= 60) {
    const minutes = Math.round(seconds / 60);
    return `${minutes} minutes`;
  } else {
    return `${seconds} seconds`;
  }
}
export function getDateActivity(epochSeconds: number) {
  const date = new Date(epochSeconds * 1000);
  const today = new Date();

  let isSafeDate = true;
  const diffInTime = date.getDate() - today.getDate();
  const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));

  if (diffInDays >= 0 && diffInDays <= 7) {
    isSafeDate = false;
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return {
      isSafeDate,
      formattedDay: daysOfWeek[date.getDay()]
    }
  }

  const options: any = { month: 'short', day: 'numeric', year: 'numeric' };

  return {
    isSafeDate,
    formattedDay: date.toLocaleDateString('en-US', options)
  }
}

export function getTimesAgo(epochSeconds: number) {
  const now = Math.floor(Date.now() / 1000);
  const diffInSeconds = now - epochSeconds;

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} munites ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hours ago`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} days ago`;
  } else if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000);
    return `${months} months ago`;
  } else {
    const years = Math.floor(diffInSeconds / 31536000);
    return `${years} years ago`;
  }
}