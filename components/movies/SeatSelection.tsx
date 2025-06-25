import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const SeatSelection = () => {
  const {
    movieTitle,
    theatreName,
    showtime,
    projector,
    seatCount,
    screenFeatures
  } = useLocalSearchParams();
  return (
    <View>
      <Text className="text-blue-100">SeatSelection</Text>
      <Text className="text-blue-100">Movie Title: {movieTitle}</Text>
      <Text className="text-blue-100">Theatre Name: {theatreName}</Text>
      <Text className="text-blue-100">Showtime: {showtime}</Text>
      <Text className="text-blue-100">Projector: {projector}</Text>
      <Text className="text-blue-100">Seat Count: {seatCount}</Text>
      <Text className="text-blue-100">Screen Features: {screenFeatures}</Text>
    </View>
  );
};

export default SeatSelection;
