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

export function checkPhoneNumber(number: string) {
  const regex =
    /^(\+?1|\+?44)?\s?(\d{3})[- ]?(\d{3})[- ]?(\d{4})$|^(\+?1|\+?44)?(\d{10})$/;
  // - Optional country code (+1 or +44), with or without +
  // - Optional space after country code
  // - 3 digits, optional dash or space, 3 digits, optional dash or space, 4 digits
  // OR
  // - Optional country code (+1 or +44), followed immediately by 10 digits

  // Normalize input by removing leading/trailing spaces
  number = number.trim();
  return regex.test(number);
}
