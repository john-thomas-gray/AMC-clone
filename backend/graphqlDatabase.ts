import { buildSchema, GraphQLSchema } from "graphql";
import { NearbyTheatre, Theatre } from "@/types/type";
import { getNearbyTheatres } from "@/utils/location";
import { fetchMovies } from "@/utils/TMDBapi";
import { generateTheatres } from "@/utils/theatreDataGenerator";

type RawMovie = {
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
};

export interface TheatreGraphQLDatabase {
  theatres: Theatre[];
}

export const theatreSchema: GraphQLSchema = buildSchema(`
  type Genre {
    id: Int!
    name: String!
  }

  type Movie {
    id: Int!
    backdropPath: String
    genres: [Genre!]
    title: String
    synopsis: String
    release_date: String
    runtime: String
    tagline: String
    status: String
    vote_average: Float
    poster_path: String
  }

  type ScreenType {
    projector: String!
    logo: Int!
    tagline: String!
    seatCount: Int!
  }

  type Screen {
    number: Int!
    movie: Movie!
    type: ScreenType!
    features: [String!]!
    showtimes: [String!]!
  }

  type Location {
    lat: Float!
    lng: Float!
  }

  type Theatre {
    id: String!
    name: String!
    location: Location!
    vicinity: String!
    compound_code: String!
    screens: [Screen!]!
    movies: [Movie!]!
  }

  type Query {
    theatres: [Theatre!]!
  }
`);

export const buildTheatreDatabase = async ({
  apiKey,
  nearbyTheatres,
  movies
}: {
  apiKey?: string;
  nearbyTheatres?: NearbyTheatre[];
  movies?: RawMovie[];
}): Promise<TheatreGraphQLDatabase> => {
  const resolvedNearby =
    nearbyTheatres ?? (apiKey ? await getNearbyTheatres(apiKey) : []);
  const resolvedMovies = movies ?? (await fetchMovies());
  const theatres = await generateTheatres(resolvedNearby, resolvedMovies);
  return { theatres };
};

export const createTheatreGraphQLContext = async ({
  apiKey,
  nearbyTheatres,
  movies
}: {
  apiKey?: string;
  nearbyTheatres?: NearbyTheatre[];
  movies?: RawMovie[];
}) => {
  const database = await buildTheatreDatabase({
    apiKey,
    nearbyTheatres,
    movies
  });

  const rootValue = {
    theatres: () => database.theatres
  };

  return {
    schema: theatreSchema,
    rootValue,
    database
  };
};
