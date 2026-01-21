import { logos } from "@/constants/index";
import {
  Movie,
  NearbyTheatre,
  Screen,
  ScreenTypesMap,
  Theatre
} from "@/types/type";
import { fetchMovies } from "@/utils/TMDBapi";

const getSeatCount = (screenType: string): number => {
  switch (screenType) {
    case "laser":
      return 120 | 150;
    case "reald":
      return 120;
    case "dolby":
      return 150;
    case "imax":
      return 200;
    default:
      return 100;
  }
};

export const screenTypes: ScreenTypesMap = {
  laser: {
    projector: "Laser at AMC",
    logo: logos.laser,
    tagline: "PICTURE A BETTER WORLD",
    seatCount: getSeatCount("laser")
  },
  reald: {
    projector: "RealD 3D",
    logo: logos.reald,
    tagline: "VISUALIZING THE FUTURE",
    seatCount: getSeatCount("reald")
  },
  dolby: {
    projector: "Dolby Cinema",
    logo: logos.dolby,
    tagline: "COMPLETELY CAPTIVATING",
    seatCount: getSeatCount("dolby")
  },
  imax: {
    projector: "IMax",
    logo: logos.imax,
    tagline: "EXPERIENCE THE EXTRAORDINARY",
    seatCount: getSeatCount("imax")
  }
};

export const getScreenNum = (theatre: string): number => {
  const match = theatre.match(/(\d+)(?!.*\d)/);
  return match ? Number(match[1]) : 1;
};

const toMinutes = (time: string): number => {
  const match = time.match(/^(\d{1,2}):(\d{2})(am|pm)$/);
  if (!match) return 0;

  let [_, hour, minute, period] = match;
  let h = parseInt(hour);
  const m = parseInt(minute);

  if (period === "pm" && h !== 12) h += 12;
  if (period === "am" && h === 12) h = 0;

  return h * 60 + m;
};

export const getRandomShowtimes = () => {
  const validTimes = [];

  const periods = ["am", "pm"];
  for (let hour = 1; hour <= 12; hour++) {
    for (let minute of ["00", "30"]) {
      for (let period of periods) {
        const timeInMinutes = toMinutes(`${hour}:${minute}${period}`);
        if (timeInMinutes >= 480 || timeInMinutes <= 30) {
          validTimes.push(`${hour}:${minute}${period}`);
        }
      }
    }
  }

  const shuffled = validTimes.sort(() => 0.5 - Math.random());
  const count = Math.floor(Math.random() * 8) + 1;
  const showtimes = shuffled.slice(0, count);

  return showtimes.sort((a, b) => toMinutes(a) - toMinutes(b));
};

const getFeatures = (screenType: string, seatCount: number): string[] => {
  switch (screenType) {
    case "laser":
      if (seatCount === 150) {
        return [
          "AMC Signature Recliners",
          "Reserved Seating",
          "Laser at AMC",
          "Closed Caption",
          "Audio Description"
        ];
      } else {
        return [
          "Reserved Seating",
          "Laser at AMC",
          "Closed Caption",
          "Audio Description"
        ];
      }
    case "dolby":
      return [
        "AMC Signature Recliners",
        "Reserved Seating",
        "Closed Caption",
        "Audio Description"
      ];
    case "reald":
      return [
        "AMC Signature Recliners",
        "Reserved Seating",
        "Laser at AMC",
        "Closed Caption",
        "Audio Description"
      ];
    case "imax":
      return [
        "Plush Rockers",
        "Reserved Seating",
        "IMAX at AMC",
        "Closed Caption",
        "Audio Description"
      ];
    default:
      return [
        "AMC Signature Recliners",
        "Reserved Seating",
        "Closed Caption",
        "Audio Description"
      ];
  }
};

export const generateScreens = async (
  screenCount: number,
  moviesOverride?: Array<{
    id: number;
    backdrop_path?: string;
    genres?: { id: number; name: string }[];
    title?: string;
    overview?: string;
    release_date?: string;
    runtime?: string;
    tagline?: string;
    status?: string;
    vote_average?: number;
    poster_path?: string;
  }>
): Promise<Screen[]> => {
  const movies = moviesOverride ?? (await fetchMovies()) ?? [];
  const moviePool = [...movies];
  const screenTypeKeys = Object.keys(screenTypes) as (keyof ScreenTypesMap)[];
  const imaxLimit = 2;
  let imaxCount = 0;

  const screens: Screen[] = [];

  for (let i = 0; i < screenCount; i++) {
    if (moviePool.length === 0) break;
    const movieIndex = Math.floor(Math.random() * moviePool.length);
    const rawMovie = moviePool.splice(movieIndex, 1)[0];
    const movie: Movie = {
      id: rawMovie.id,
      backdropPath: rawMovie.backdrop_path,
      genres: rawMovie.genres,
      title: rawMovie.title,
      synopsis: rawMovie.overview,
      release_date: rawMovie.release_date,
      runtime: rawMovie.runtime,
      tagline: rawMovie.tagline,
      status: rawMovie.status,
      vote_average: rawMovie.vote_average,
      poster_path: rawMovie.poster_path
    };

    let typeKey: keyof ScreenTypesMap;
    do {
      typeKey =
        screenTypeKeys[Math.floor(Math.random() * screenTypeKeys.length)];
    } while (typeKey === "imax" && imaxCount >= imaxLimit);

    if (typeKey === "imax") imaxCount++;

    const type = screenTypes[typeKey];

    screens.push({
      number: i + 1,
      movie,
      type,
      features: getFeatures(type.projector, type.seatCount),
      showtimes: getRandomShowtimes()
    });
  }
  return screens;
};

export const generateTheatres = async (
  nearbyTheatres: NearbyTheatre[],
  moviesOverride?: Array<{
    id: number;
    backdrop_path?: string;
    genres?: { id: number; name: string }[];
    title?: string;
    overview?: string;
    release_date?: string;
    runtime?: string;
    tagline?: string;
    status?: string;
    vote_average?: number;
    poster_path?: string;
  }>
): Promise<Theatre[]> => {
  const theatres = await Promise.all(
    nearbyTheatres.map(async theatre => {
      const screens = await generateScreens(
        getScreenNum(theatre.name),
        moviesOverride
      );
      const movies = screens.map(screen => screen.movie);
      return {
        id: theatre.place_id,
        name: theatre.name,
        vicinity: theatre.vicinity,
        compound_code: theatre.plus_code.compound_code,
        location: theatre.geometry.location,
        screens,
        movies
      };
    })
  );
  return theatres;
};
