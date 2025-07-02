import PurchaseTicketsFooter from "@/components/purchaseTickets/PurchaseTicketsFooter";
import PurchaseTicketsHeader from "@/components/purchaseTickets/PurchaseTicketsHeader";
import SignInBanner from "@/components/purchaseTickets/SignInBanner";
import { getCurrentDate } from "@/utils/date";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import Auditorium from "../../components/purchaseTickets/Auditorium";

const SeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handleSeatToggle = (seatID: string) => {
    setSelectedSeats(prev =>
      prev.includes(seatID)
        ? prev.filter(id => id !== seatID)
        : [...prev, seatID]
    );
  };

  const router = useRouter();

  const {
    id,
    movieTitle,
    theatreName,
    showtime,
    projector,
    seatCount,
    screenFeatures
  } = useLocalSearchParams();

  const seatNum = Array.isArray(seatCount)
    ? Number(seatCount[0])
    : Number(seatCount);

  const details = [theatreName, getCurrentDate(), showtime, projector]
    .filter(Boolean)
    .join(" | ");

  return (
    <View className="flex-1 bg-black">
      <PurchaseTicketsHeader
        movieTitle={movieTitle}
        details={details}
        id={[id]}
      />
      <SignInBanner />
      <View className="flex-1 pt-4">
        <Auditorium seatNum={seatNum} onSeatToggle={handleSeatToggle} />
      </View>
      <PurchaseTicketsFooter
        disabled={selectedSeats.length === 0}
        onPress={() => {
          router.push({
            pathname: "/movies/chooseTickets",
            params: {
              id,
              movieTitle,
              theatreName,
              showtime,
              projector,
              details,
              selectedSeats
            }
          });
        }}
      />
    </View>
  );
};

export default SeatSelection;
