export const getCurrentDate = (): string => {
  const now = new Date();
  return now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};

export const formatTime = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${minutes.toString()}:${seconds.toString().padStart(2, "0")}`;
};

export const showMatinee = (showtime: string = "10:00pm") => {
  if (!showtime) throw new Error("Showtime is required for showMatinee check");
  const meridiem = showtime.slice(-2).toLowerCase();
  const timePart = showtime.slice(0, -2);
  const [hourStr] = timePart.split(":");
  const hr = Number(hourStr);

  if (meridiem === "pm" && hr > 4 && hr < 12) {
    return false;
  }
  return true;
};
