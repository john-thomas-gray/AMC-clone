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

// export const formatTheatreAddress = async (
//   vicinity: string,
//   compound_code: string,
//   location: { lat: number; lng: number },

// ): Promise<string[]> => {
//   const { lat, lng } = location;
//   const street = vicinity.split(",")[0];
//   const cityState = compound_code.split(", ")[1]
//   const zipCode

//   const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

//   try {
//     const res = await fetch(url);
//     const data = await res.json();

//     if (!data.results || data.results.length === 0) {
//       throw new Error("No results from geocoding API");
//     }

//     const fullAddress = data.results[0].formatted_address; // e.g., "1998 Bozo St, San Francisco, CA 94115, USA"
//     const parts = fullAddress.split(",");

//     const street = parts[0].trim(); // "1998 Bozo St"
//     const cityStateZip = parts.slice(1, 3).join(",").trim(); // "San Francisco, CA 94115"

//     return [street, cityStateZip];
//   } catch (error) {
//     console.error("Error formatting theatre address:", error);
//     return ["Unknown Address", ""];
//   }
// };

export const formatTheatreAddress = async (
  vicinity: string,
  compound_code: string,
  location: { lat: number; lng: number }
): Promise<string[]> => {
  const { lat, lng } = location;
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      throw new Error("No results from geocoding API");
    }
    const fullAddress = data.results[0].formatted_address;
    const parts = fullAddress.split(",");

    const street = parts[0].trim();
    const cityStateZip = parts.slice(1, 3).join(",").trim();

    return [street, cityStateZip];
  } catch (error) {
    console.error("Error formatting theatre address:", error);
    return [vicinity, compound_code]; // fallback
  }
};
