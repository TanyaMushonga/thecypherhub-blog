import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: Date | string) => {
  const currentDate = new Date();
  const dateObj = new Date(date);

  const timeDifferenceInSeconds = Math.floor(
    (currentDate.getTime() - dateObj.getTime()) / 1000,
  );
  const timeDifferenceInMinutes = Math.floor(timeDifferenceInSeconds / 60);
  const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);
  const timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24);

  if (timeDifferenceInDays > 1) {
    return dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  } else if (timeDifferenceInDays === 1) {
    return "1 day ago";
  } else if (timeDifferenceInHours >= 1) {
    return `${timeDifferenceInHours} hr ago`;
  } else if (timeDifferenceInMinutes >= 1) {
    return `${timeDifferenceInMinutes} mins ago`;
  } else {
    return "Just now";
  }
};

export const getRandomArticles = (
  articles: Article[],
  count: number,
): Article[] => {
  const shuffled = articles.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
