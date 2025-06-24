import { TMDB_CONFIG } from "./TMDBapi";

type Genres = { id: number; name: string };

export const formatRuntime = (runtime: number | string): string => {
  const numericRuntime =
    typeof runtime === "string" ? Number(runtime) : runtime;

  const hr = Math.floor(numericRuntime / 60).toString();
  const min = (numericRuntime % 60).toString();

  return `${hr} HR ${min} MIN`;
};

export const formatGenre = (genres: Genres[]): string => {
  if (!Array.isArray(genres) || genres.length === 0 || !genres[0].name) {
    return "UNKNOWN";
  }

  return genres[0].name.toUpperCase();
};

export const formatBackdrop = (path: string): string => {
  return `${TMDB_CONFIG.BACKDROP_URL}${path}`;
};

export const formatMPAA = (genre: string): string => {
  if (genre === "HORROR") {
    return "R";
  }

  return "PG-13";
};

export const formatCalendarDate = (date: string): string => {
  const inputDate = new Date(date);
  const today = new Date();

  const isToday =
    inputDate.getFullYear() === today.getFullYear() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getDate() === today.getDate();

  if (isToday) {
    const monthDay = inputDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
    return `Today, ${monthDay}`;
  } else {
    const dayLabel = inputDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric"
    });
    return dayLabel;
  }
};

export const formatReleaseDate = (releaseDate?: string) => {
  if (!releaseDate) return null;
  const date = new Date(releaseDate);
  const label = new Date() > date ? "Released" : "Coming";
  const formatted = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  return `${label} ${formatted}`;
};

export const formatTheatreAddress = (
  vicinity: string,
  compound_code: string,
  location: { lat: number; lng: number }
): string[] => {
  const address = vicinity.split(",");
  const state = compound_code.split(" ");
  const lat = 40.714224;
  const lng = -73.961452;
  const reverseGeocode = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat}${lng}&key=${process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY}`;
  console.log("rG: ", reverseGeocode);
  return [reverseGeocode];
};
