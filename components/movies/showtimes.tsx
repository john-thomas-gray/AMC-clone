import { TheatreDataContext } from "@/context/theatreDataContext"; // update path if needed
import { formatTheatreAddress } from "@/utils/formatMovieData";
import React, { useContext } from "react";
import { ScrollView, Text } from "react-native";
import ShowtimeCard from "./ShowtimeCard";

type ShowtimesProps = {
  movieId: number;
};

const Showtimes = ({ movieId }: ShowtimesProps) => {
  console.log("Showtimes component mounted!");
  const { theatres, loading, error } = useContext(TheatreDataContext);

  // if (loading) return <Text>Loading nearby showtimes...</Text>;
  // if (error) return <Text>Error: {error.message}</Text>;
  console.log(theatres);
  if (!theatres || theatres.length === 0)
    return <Text>No theatres found nearby.</Text>;

  return (
    <ScrollView className="flex-1 bg-red-500">
      {theatres.map(theatre => {
        console.log("→ Checking theatre:", theatre.name);
        console.log(
          "→ Screen movie IDs:",
          theatre.screens.map(s => s.movie.id)
        );
        console.log("→ Target movieId:", movieId);
        const filteredScreens = theatre.screens.filter(
          screen => screen.movie.id === movieId
        );

        if (filteredScreens.length === 0) return null;

        const theatreAddress = formatTheatreAddress(
          theatre.name,
          theatre.id,
          theatre.location
        );

        const showtimes = filteredScreens.map(screen => ({
          id: screen.movie.id,
          title: screen.movie.title,
          runtime: screen.movie.runtime,
          overview: screen.movie.synopsis,
          release_date: screen.movie.release_date,
          poster_path: screen.movie.poster_path,
          backdrop_path: screen.movie.backdropPath,
          genres: screen.movie.genres,
          times: screen.showtimes
        }));

        return (
          <ShowtimeCard
            key={theatre.id}
            data={{
              theatreName: theatre.name,
              address: theatreAddress,
              showtimes
            }}
          />
        );
      })}
    </ScrollView>
  );
};

export default Showtimes;
