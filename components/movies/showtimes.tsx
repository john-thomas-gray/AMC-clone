import { Theatre } from "@/types/type";
import React from "react";
import { ScrollView } from "react-native";
import ShowtimeCard from "./ShowtimeCard";

type ShowtimesProps = {
  movieId: number;
  theatres: Theatre[];
};

const Showtimes = ({ movieId, theatres }: ShowtimesProps) => {
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
