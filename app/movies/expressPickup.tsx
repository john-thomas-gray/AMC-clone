import ExpressPickupFooter from "@/components/purchaseTickets/ExpressPickupFooter";
import ExpressPickupHeader from "@/components/purchaseTickets/ExpressPickupHeader";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";

const ExpressPickup = () => {
  useLocalSearchParams(
    id,
    movieTitle,
    theatreName,
    showtime,
    projector,
    details,
    selectedSeats
  );
  return (
    <View className="flex-1 bg-black">
      <ExpressPickupHeader to="/movies/ticketSelection" />
      <ExpressPickupFooter />
    </View>
  );
};

export default ExpressPickup;
