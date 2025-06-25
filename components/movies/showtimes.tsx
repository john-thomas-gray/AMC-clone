import { TheatreDataContext } from "@/context/theatreDataContext";
import React, { useContext } from "react";
import { ScrollView, Text } from "react-native";
import ShowtimeCard from "./ShowtimeCard";

type ShowtimesProps = {
  movieId: number;
};

const Showtimes = ({ movieId }: ShowtimesProps) => {
  const { theatres, loading, error } = useContext(TheatreDataContext);

  if (loading) return <Text>Loading nearby showtimes...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!theatres || theatres.length === 0)
    return <Text>No theatres found nearby.</Text>;

  return (
    <ScrollView className="flex-1 bg-black">
      {theatres.map(theatre => {
        const filteredScreens = theatre.screens.filter(
          screen => screen.movie.id === movieId
        );

        if (filteredScreens.length === 0) return null;

        const theatreData = {
          ...theatre,
          screens: filteredScreens,
          movies: filteredScreens.map(screen => screen.movie)
        };

        return (
          <ShowtimeCard
            key={theatre.id}
            theatreData={theatreData}
            screenData={filteredScreens}
          />
        );
      })}
    </ScrollView>
  );
};

export default Showtimes;
