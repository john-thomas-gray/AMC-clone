import { TheatreDataContext } from "@/context/theatreDataContext"; // update path if needed
import { formatTheatreAddress } from "@/utils/formatMovieData";
import React, { useContext } from "react";
import { ScrollView, Text } from "react-native";
import ShowtimeCard from "./showtimeCard";

const Showtimes = () => {
  const { theatres, loading, error } = useContext(TheatreDataContext);

  if (loading) return <Text>Loading nearby showtimes...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!theatres || theatres.length === 0)
    return <Text>No theatres found nearby.</Text>;

  return (
    <ScrollView className="flex-1 bg-red-500">
      {theatres.map(theatre => {
        const theatreAddress = formatTheatreAddress(
          theatre.name,
          theatre.id,
          theatre.location
        );

        const showtimes = theatre.screens.map(screen => ({
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
