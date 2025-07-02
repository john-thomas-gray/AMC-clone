import PurchaseTicketsFooter from "@/components/purchaseTickets/PurchaseTicketsFooter";
import PurchaseTicketsHeader from "@/components/purchaseTickets/PurchaseTicketsHeader";
import SignInBanner from "@/components/purchaseTickets/SignInBanner";
import TicketSelector from "@/components/purchaseTickets/TicketSelector";
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
        <View className="flex-1 px-2">
          {new Date().getDay() === 2 ? (
            <View className="w-full h-[80] border border-red-500 items-center justify-center">
              <Text className="text-white font-gordita-bold text-lg text-center leading-tight">
                Discount Tuesdays savings will be shown on your order summary,
                if applicable.
              </Text>
            </View>
          ) : null}

          {remainingTickets === 1 ? (
            <View className="w-full h-[40] items-center justify-center">
              <Text className="text-white font-gordita-regular text-center">
                Select your remaining ticket
              </Text>
            </View>
          ) : remainingTickets > 1 ? (
            <View className="w-full h-[40] items-center justify-center">
              <Text className="text-white font-gordita-regular text-center">
                Select your {remainingTickets} remaining tickets
              </Text>
            </View>
          ) : (
            <></>
          )}
          <TicketSelector
            age="Child"
            cost={15.6}
            fee={2.3}
            remainingTickets={remainingTickets}
            setRemainingTickets={setRemainingTickets}
          />
          <View className="bg-gray-300 w-full p-2 rounded">
            <Text className="text-white font-gordita-regular text-lg">
              *This Conveience Fee is waived for AMC Stubs A-List and Premiere
              members, and for Premiere GO! members purchasing 4+ tickets.
            </Text>
          </View>
        </View>
      </ScrollView>
      <PurchaseTicketsFooter onPress={() => {}} />
    </View>
  );
};

export default ChooseTickets;
