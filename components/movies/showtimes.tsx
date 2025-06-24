import useNearbyShowtimes from "@/constants/mockData";
import { formatTheatreAddress } from "@/utils/formatMovieData";
import React from "react";
import { ScrollView, Text } from "react-native";
import ShowtimeCard from "./showtimeCard";

const Showtimes = () => {
  const { showtimesData, loading, error } = useNearbyShowtimes();

  if (loading) return <Text>Loading nearby showtimes...</Text>;
  if (error) return <Text>Error: {error}</Text>;
  const theatreAddress = formatTheatreAddress(
    showtimesData.vicinity,
    showtimesData.compound_code,
    showtimesData.location
  );
  return (
    <ScrollView className="flex-1 bg-red-500">
      {showtimesData.map((showtimesData, index) => (
        <ShowtimeCard data={showtimesData} key={index} />
      ))}
    </ScrollView>
  );
};

export default Showtimes;
