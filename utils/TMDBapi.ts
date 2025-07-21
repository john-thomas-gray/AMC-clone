export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  BACKDROP_URL: "https://image.tmdb.org/t/p/w533_and_h300_bestv2",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
  }
};

export const fetchMovies = async () => {
  try {
    const endpoint =
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";

    const response = await fetch(endpoint, {
      method: "GET",
      headers: TMDB_CONFIG.headers
    });

    const data = await response.json();
    const moviesSummary = data.results;

    const detailedMovies = await Promise.all(
      moviesSummary.map((movie: { id: number }) =>
        fetchMovieById(movie.id.toString())
      )
    );
    return detailedMovies;
  } catch (error) {
    console.log("fetchMovies using backup. Error:", error);
    // const backup =
  }
};

export const fetchComingSoon = async ({ query }: { query: string }) => {
  const endpoint =
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=2";
  // ? `${TMDB_CONFIG.BASE_URL}/3/movie/upcoming`
  // : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=upcoming.desc`

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers
  });

  if (!response.ok) {
    // @ts-ignore
    throw new Error("Failed to fetch movies", response.statusText);
  }

  const data = await response.json();

  return data.results;
};

export const fetchMovieById = async (id: string) => {
  const response = await fetch(
    `${TMDB_CONFIG.BASE_URL}/movie/${id}?language=en-US`,
    {
      method: "GET",
      headers: TMDB_CONFIG.headers
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Failed to fetch movie ${id}:`, response.status, errorText);
    throw new Error("Failed to fetch movie details");
  }

  return await response.json();
};
