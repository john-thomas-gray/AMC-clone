import { graphql } from "graphql";
import {
  buildTheatreDatabase,
  createTheatreGraphQLContext
} from "@/backend/graphqlDatabase";
import type { NearbyTheatre } from "@/types/type";

describe("theatre GraphQL database", () => {
  const nearbyTheatres: NearbyTheatre[] = [
    {
      place_id: "place-1",
      name: "AMC 2",
      vicinity: "123 Main St",
      plus_code: { compound_code: "AAA+111" },
      geometry: { location: { lat: 10, lng: 20 } }
    }
  ];

  const movies = [
    {
      id: 101,
      title: "Movie One",
      overview: "Synopsis",
      poster_path: "/poster-1.jpg"
    },
    {
      id: 202,
      title: "Movie Two",
      overview: "Synopsis two",
      poster_path: "/poster-2.jpg"
    }
  ];

  beforeEach(() => {
    jest.spyOn(Math, "random").mockReturnValue(0.1);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("builds theatres from nearby places and movies", async () => {
    const database = await buildTheatreDatabase({ nearbyTheatres, movies });

    expect(database.theatres).toHaveLength(1);
    const theatre = database.theatres[0];
    expect(theatre.id).toBe("place-1");
    expect(theatre.screens).toHaveLength(2);
    expect(theatre.movies.map(movie => movie.id)).toEqual(
      theatre.screens.map(screen => screen.movie.id)
    );
  });

  it("serves theatre data through GraphQL", async () => {
    const { schema, rootValue } = await createTheatreGraphQLContext({
      nearbyTheatres,
      movies
    });

    const result = await graphql({
      schema,
      source: "{ theatres { id name screens { number showtimes movie { id title } } } }",
      rootValue
    });

    expect(result.errors).toBeUndefined();
    const theatres = (result.data?.theatres ?? []) as Array<{
      id: string;
      name: string;
      screens: Array<{ number: number; showtimes: string[] }>;
    }>;
    expect(theatres).toHaveLength(1);
    expect(theatres[0].name).toBe("AMC 2");
    expect(theatres[0].screens[0].showtimes.length).toBeGreaterThan(0);
  });
});
