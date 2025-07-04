import ChooseTicketsFooter from "@/components/purchaseTickets/ChooseTicketsFooter";
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
    ? rawSelected.split(",")
    : [];

  const [remainingTickets, setRemainingTickets] = useState(
    parsedSelectedSeats.length
  );

  const ticketSkews =
    projector !== "IMax"
      ? [
          { age: "Adult", cost: 19.68, fee: 2.19 },
          { age: "Child", cost: 16.68, fee: 2.19 },
          { age: "Senior", cost: 18.18, fee: 2.19 }
        ]
      : [
          { age: "Adult", cost: 30.68, fee: 2.69 },
          { age: "Child", cost: 27.68, fee: 2.69 },
          { age: "Senior", cost: 29.18, fee: 2.69 }
        ];

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

          <View className="w-full h-[40] items-center justify-center my-4">
            {remainingTickets === 1 ? (
              <Text className="text-white font-gordita-regular text-center">
                Select your remaining ticket
              </Text>
            ) : remainingTickets > 1 ? (
              <Text className="text-white font-gordita-regular text-center">
                Select your {remainingTickets} remaining tickets
              </Text>
            ) : (
              <></>
            )}
          </View>
          {ticketSkews.map((ticket, index) => (
            <TicketSelector
              key={index}
              age={ticket.age}
              cost={ticket.cost}
              fee={ticket.fee}
              remainingTickets={remainingTickets}
              setRemainingTickets={setRemainingTickets}
            />
          ))}
          <View className="bg-gray-300 w-full px-3 rounded-lg pt-2 pb-3">
            <Text className="text-white font-gordita-regular text-lg pr-4">
              *This Conveience Fee is waived for AMC Stubs A-List and Premiere
              members, and for Premiere GO! members purchasing 4+ tickets.
            </Text>
          </View>
        </View>
      </ScrollView>
      <ChooseTicketsFooter remaining={remainingTickets} onPress={() => {}} />
    </View>
  );
};

export default ChooseTickets;
