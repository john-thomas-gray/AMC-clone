import { logos } from "@/constants/index";
import { NearbyTheatre, Screen, ScreenTypesMap, Theatre } from "@/types/type";
import { getNearbyTheatres } from "@/utils/location";
import { fetchMovies } from "@/utils/TMDBapi";
import React, { createContext, useEffect, useState } from "react";

interface TheatreDataContextValue {
  theatres: Theatre[];
  loading: boolean;
  error?: Error;
}

export const TheatreDataContext = createContext<TheatreDataContextValue>({
  theatres: [],
  loading: true
});

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

const getScreenNum = (theatre: string): number => {
  const match = theatre.match(/(\d+)(?!.*\d)/); // find the last number in the string
  return match ? Number(match[1]) : 1;
};

const getRandomShowtimes = () => {
  const showtimes = [];
  const count = Math.floor(Math.random() * 8) + 4;
  for (let i = 0; i < count; i++) {
    const hour = Math.floor(Math.random() * 12) + 1;
    const minute = Math.random() < 0.5 ? "00" : "30";
    const period = Math.random() < 0.5 ? "AM" : "PM";
    showtimes.push(`${hour}:${minute} ${period}`);
  }
  return showtimes;
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

const screenTypes: ScreenTypesMap = {
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
    projector: "IMAX",
    logo: logos.imax,
    tagline: "EXPERIENCE THE EXTRAORDINARY",
    seatCount: getSeatCount("imax")
  }
};

const generateScreens = async (screenCount: number): Promise<Screen[]> => {
  const movies = await fetchMovies({ query: "" });
  const moviePool = [...movies];
  const screenTypeKeys = Object.keys(screenTypes) as (keyof ScreenTypesMap)[];
  const imaxLimit = 2;
  let imaxCount = 0;

  const screens: Screen[] = [];

  for (let i = 0; i < screenCount; i++) {
    if (moviePool.length === 0) break;
    const movieIndex = Math.floor(Math.random() * moviePool.length);
    const movie = moviePool.splice(movieIndex, 1)[0];

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

const generateTheatres = async (
  nearbyTheatres: NearbyTheatre[]
): Promise<Theatre[]> => {
  const theatres = await Promise.all(
    nearbyTheatres.map(async theatre => {
      const screens = await generateScreens(getScreenNum(theatre.name));
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

export const TheatreDataContextProvider = ({
  children,
  apiKey
}: {
  children: React.ReactNode;
  apiKey: string;
}) => {
  const [theatres, setTheatres] = useState<Theatre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    async function fetchTheatreData() {
      setLoading(true);
      setError(undefined);

      try {
        // 2. Get nearby theatres
        const nearby = await getNearbyTheatres(apiKey);

        // 3. Generate detailed theatre data
        const detailedTheatres = await generateTheatres(nearby);
        setTheatres(detailedTheatres);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }
    fetchTheatreData();
  }, [apiKey]);
  return (
    <TheatreDataContext.Provider value={{ theatres, loading, error }}>
      {children}
    </TheatreDataContext.Provider>
  );
};
