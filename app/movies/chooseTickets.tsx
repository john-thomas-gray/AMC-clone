import PurchaseTicketsFooter from "@/components/purchaseTickets/PurchaseTicketsFooter";
import PurchaseTicketsHeader from "@/components/purchaseTickets/PurchaseTicketsHeader";
import SignInBanner from "@/components/purchaseTickets/SignInBanner";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";

const ChooseTickets = () => {
  const {
    id,
    movieTitle,
    theatreName,
    showtime,
    projector,
    details,
    selectedSeats
  } = useLocalSearchParams();

  const rawSelected = selectedSeats;

  const parsedSelectedSeats = Array.isArray(rawSelected)
    ? rawSelected
    : typeof rawSelected === "string"
    ? rawSelected.split(",") // assuming they were joined like "A1,B2,C3"
    : [];

  const [remainingTickets, setRemainingTickets] = useState(
    parsedSelectedSeats.length
  );

  return (
    <View className="flex-1 bg-black">
      <PurchaseTicketsHeader
        movieTitle={movieTitle}
        details={details}
        id={id}
      />
      <ScrollView className="flex">
        <SignInBanner />
        <View className="flex-1">
          {remainingTickets > 0 ? (
            <View className="w-full h-[40] items-center justify-center">
              <Text className="text-white font-gordita-regular items-center justify-center">
                Select your remaining ticket
              </Text>
            </View>
          ) : (
            <View />
          )}
        </View>
        <PurchaseTicketsFooter onPress={() => {}} />
      </ScrollView>
    </View>
  );
};

export default ChooseTickets;
