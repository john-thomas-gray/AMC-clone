import ConcessionSelector from "@/components/purchaseTickets/ConcessionSelector";
import PurchaseTicketsHeader from "@/components/purchaseTickets/PurchaseTicketsHeader";
import SignInBanner from "@/components/purchaseTickets/SignInBanner";
import TicketSelectionFooter from "@/components/purchaseTickets/TicketSelectionFooter";
import TicketSelector from "@/components/purchaseTickets/TicketSelector";
import { images } from "@/constants";
import { concessionPrice, movieTicketPrice } from "@/constants/PriceConstants";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";

const TicketSelection = () => {
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
  const [ticketCount, setTicketCount] = useState(0);

  const [concessionCount, setConcessionCount] = useState(0);

  const ticketSkews =
    projector !== "IMax"
      ? [
          {
            age: "Adult",
            cost: movieTicketPrice.adult,
            fee: movieTicketPrice.fee
          },
          {
            age: "Child",
            cost: movieTicketPrice.child,
            fee: movieTicketPrice.fee
          },
          {
            age: "Senior",
            cost: movieTicketPrice.senior,
            fee: movieTicketPrice.fee
          }
        ]
      : [
          {
            age: "Adult",
            cost: movieTicketPrice.adultImax,
            fee: movieTicketPrice.feeImax
          },
          {
            age: "Child",
            cost: movieTicketPrice.childImax,
            fee: movieTicketPrice.feeImax
          },
          {
            age: "Senior",
            cost: movieTicketPrice.seniorImax,
            fee: movieTicketPrice.feeImax
          }
        ];

  const rawMovieTitle = movieTitle;
  const normalizedMovieTitle = Array.isArray(rawMovieTitle)
    ? rawMovieTitle[0]
    : rawMovieTitle ?? "Untitled";
  const rawId = id;
  const normalizedId = Array.isArray(rawId) ? rawId[0] : rawId ?? "Untitled";
  const rawDetails = details;
  const normalizedDetails = Array.isArray(rawDetails)
    ? rawDetails[0]
    : rawDetails ?? "No details available";

  const router = useRouter();

  return (
    <View className="flex-1 bg-black">
      <PurchaseTicketsHeader
        movieTitle={normalizedMovieTitle}
        details={normalizedDetails}
        id={normalizedId}
        to="/movies/seatSelection"
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
              ticketCount={ticketCount}
              setTicketCount={setTicketCount}
            />
          ))}
          <View className="bg-gray-300 w-full px-3 rounded-lg pt-2 pb-3 mb-12">
            <Text className="text-white font-gordita-regular text-lg pr-4">
              *This Conveience Fee is waived for AMC Stubs A-List and Premiere
              members, and for Premiere GO! members purchasing 4+ tickets.
            </Text>
          </View>
        </View>
        <View className="border-gray-300 border-y mx-2 mb-6">
          <View className="items-center justify-center h-[70px]">
            <Text className="text-white font-gordita-bold text-xl">
              Would you like to add a combo?
            </Text>
          </View>
          <ConcessionSelector
            cost={concessionPrice.comboPopcornTwoDrinks}
            item="Large Popcorn + 2 Large Drinks"
            image={images.comboPopcornTwoDrinks}
            count={concessionCount}
            setConcessionCount={setConcessionCount}
          />
        </View>
      </ScrollView>
      <TicketSelectionFooter
        remaining={remainingTickets}
        onPress={() => {
          router.push({
            pathname: "/movies/expressPickup",
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
        comboCount={concessionCount}
      />
    </View>
  );
};

export default TicketSelection;
