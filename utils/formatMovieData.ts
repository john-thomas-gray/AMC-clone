import { TMDB_CONFIG } from "./TMDBapi";

type Genres = {id: number, name: string}

export const formatRuntime = (runtime: number | string): string => {
  const numericRuntime = typeof runtime === "string" ? Number(runtime) : runtime;

  const hr = Math.floor(numericRuntime / 60).toString();
  const min = (numericRuntime % 60).toString();

  return `${hr} HR ${min} MIN`;
};

export const formatGenre = (genres: Genres[]): string => {
  if (!Array.isArray(genres) || genres.length === 0 || !genres[0].name) {
    return 'UNKNOWN'
  }

  return genres[0].name.toUpperCase();
};

export const formatBackdrop = (path: string): string => {
  console.log(`${TMDB_CONFIG.BACKDROP_URL}${path}`)
  return `${TMDB_CONFIG.BACKDROP_URL}${path}`
}

export const formatMPAA = (genre: string): string => {
  if(genre === 'HORROR')
  {
    return 'R'
  }

  return 'PG-13'
}
