import { graphql } from "graphql";
import { createTheatreGraphQLContext } from "@/backend/graphqlDatabase";
import { Screen, Theatre } from "@/types/type";
import React, { createContext, useEffect, useState } from "react";

export interface SelectedSession {
  theatre: Theatre;
  screen: Screen;
  showtime: string;
}

interface TheatreDataContextValue {
  theatres: Theatre[];
  loading: boolean;
  error?: Error;
  selectedSession?: SelectedSession;
  setSelectedSession?: React.Dispatch<
    React.SetStateAction<SelectedSession | undefined>
  >;
}

export const TheatreDataContext = createContext<TheatreDataContextValue>({
  theatres: [],
  loading: true
});

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
  const [selectedSession, setSelectedSession] = useState<
    SelectedSession | undefined
  >(undefined);

  useEffect(() => {
    async function fetchTheatreData() {
      setLoading(true);
      setError(undefined);

      try {
        const { schema, rootValue } = await createTheatreGraphQLContext({
          apiKey
        });
        const result = await graphql({
          schema,
          source:
            "{ theatres { id name location { lat lng } vicinity compound_code screens { number features showtimes movie { id backdropPath genres { id name } title synopsis release_date runtime tagline status vote_average poster_path } type { projector logo tagline seatCount } } movies { id backdropPath genres { id name } title synopsis release_date runtime tagline status vote_average poster_path } } }",
          rootValue
        });

        if (result.errors?.length) {
          throw new Error(result.errors[0].message);
        }

        const detailedTheatres = (result.data?.theatres ?? []) as Theatre[];

        setTheatres(detailedTheatres);

        if (
          detailedTheatres.length > 0 &&
          detailedTheatres[0].screens.length > 0
        ) {
          setSelectedSession({
            theatre: detailedTheatres[0],
            screen: detailedTheatres[0].screens[0],
            showtime: detailedTheatres[0].screens[0].showtimes[0] || ""
          });
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }
    fetchTheatreData();
  }, [apiKey]);
  return (
    <TheatreDataContext.Provider
      value={{ theatres, loading, error, selectedSession, setSelectedSession }}
    >
      {children}
    </TheatreDataContext.Provider>
  );
};
