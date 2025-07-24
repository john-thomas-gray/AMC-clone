import SignInBanner from "@/components/banners/SignInBanner";
import PurchaseTicketsHeader from "@/components/purchaseTickets/PurchaseTicketsHeader";
import ConcessionSelector from "@/components/purchaseTickets/ticketSelection/ConcessionSelector";
import TicketSelectionFooter from "@/components/purchaseTickets/ticketSelection/TicketSelectionFooter";
import TicketSelector from "@/components/purchaseTickets/ticketSelection/TicketSelector";
import { icons, images } from "@/constants";
import { concessionPrice, movieTicketPrice } from "@/constants/PriceConstants";
import { PurchasesContext } from "@/context/PurchasesContext";
import { TheatreDataContext } from "@/context/theatreDataContext";
import { getCurrentDate } from "@/utils/dateAndTime";
import { RelativePathString, useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const TicketSelection = () => {
  const router = useRouter();
  const { selectedSession } = useContext(TheatreDataContext);
  const purchasesContext = useContext(PurchasesContext);
  if (!purchasesContext) {
    throw new Error("PurchasesContext must be used within a PurchasesProvider");
  }
  const rRated = selectedSession?.screen?.movie?.genres?.[0]?.name === "Horror";

  const {
    selectedSeats,
    setSelectedSeats,
    selectedConcessions,
    setSelectedConcessions,
    selectedTickets,
    setSelectedTickets,
    cartItemCount,
    setCartItemCount,
    cartCostTotal,
    setCartCostTotal,
    resetSelectedTickets
  } = purchasesContext;

  const [ticketCount, setTicketCount] = useState(0);
  const [concessionCount, setConcessionCount] = useState(0);

  const totalTicketCount = selectedTickets.reduce((sum, t) => sum + t.count, 0);
  const remainingTickets = selectedSeats.length - totalTicketCount;

  if (!selectedSession) {
    return (
      <View className="flex-1 bg-black">
        <SignInBanner />
        <PurchaseTicketsHeader
          movieTitle="No Session Selected"
          details=""
          id=""
          to={`/movies/seatSelection` as RelativePathString}
          onPress={() => {
            setTicketCount(0);
            setConcessionCount(0);
          }}
        />
      </View>
    );
  }

  const { theatre, screen, showtime } = selectedSession;
  const movieTitle = screen.movie.title;
  const id = screen.movie.id;

  const details = [
    theatre.name,
    getCurrentDate(),
    showtime,
    screen.type.projector
  ]
    .filter(Boolean)
    .join(" | ");

  const normalizedDetails =
    typeof details === "string" ? details : "No details available";
  const normalizedMovieTitle =
    typeof movieTitle === "string" ? movieTitle : "No title available";
  const normalizedId = typeof id === "string" ? id : "No ID available";

  const ticketSkews =
    screen.type.projector !== "IMax"
      ? [
          {
            age: "Adult",
            cost: movieTicketPrice.adult,
            fee: movieTicketPrice.fee,
            totalPrice: movieTicketPrice.adult + movieTicketPrice.fee
          },
          {
            age: "Child",
            cost: movieTicketPrice.child,
            fee: movieTicketPrice.fee,
            totalPrice: movieTicketPrice.child + movieTicketPrice.fee
          },
          {
            age: "Senior",
            cost: movieTicketPrice.senior,
            fee: movieTicketPrice.fee,
            totalPrice: movieTicketPrice.senior + movieTicketPrice.fee
          }
        ]
      : [
          {
            age: "Adult",
            cost: movieTicketPrice.adultImax,
            fee: movieTicketPrice.feeImax,
            totalPrice: movieTicketPrice.adultImax + movieTicketPrice.feeImax
          },
          {
            age: "Child",
            cost: movieTicketPrice.childImax,
            fee: movieTicketPrice.feeImax,
            totalPrice: movieTicketPrice.childImax + movieTicketPrice.feeImax
          },
          {
            age: "Senior",
            cost: movieTicketPrice.seniorImax,
            fee: movieTicketPrice.feeImax,
            totalPrice: movieTicketPrice.seniorImax + movieTicketPrice.feeImax
          }
        ];

  return (
    <View className="flex-1 bg-black">
      <PurchaseTicketsHeader
        movieTitle={normalizedMovieTitle}
        details={normalizedDetails}
        id={normalizedId}
        to={`/movies/seatSelection` as RelativePathString}
        onPress={() => {
          setTicketCount(0);
          setConcessionCount(0);
        }}
      />
      <ScrollView className="flex">
        <SignInBanner />
        <View className="flex-1 px-2">
          {new Date().getDay() === 2 && (
            <View className="w-full h-[80] items-center justify-center">
              <Text className="text-white font-gordita-bold text-lg text-center leading-tight">
                Discount Tuesdays savings will be shown on your order summary,
                if applicable.
              </Text>
            </View>
          )}

          <View className="w-full h-[40] items-center justify-center my-4">
            {remainingTickets === 1 ? (
              <Text className="text-white font-gordita-bold text-lg text-center">
                Select your remaining ticket
              </Text>
            ) : remainingTickets > 1 ? (
              <Text className="text-white font-gordita-regular text-center">
                Select your {remainingTickets} remaining tickets
              </Text>
            ) : null}
          </View>

          {ticketSkews.map((ticket, index) => {
            const existingTicket = selectedTickets.find(
              t => t.age === ticket.age && t.projector === screen.type.projector
            );

            const ticketCount = existingTicket?.count ?? 0;

            const setTicketCount = (value: React.SetStateAction<number>) => {
              setSelectedTickets(prev => {
                const updated = [...prev];
                const ticketIndex = updated.findIndex(
                  t =>
                    t.age === ticket.age &&
                    t.projector === screen.type.projector
                );

                const newCount =
                  typeof value === "function"
                    ? value(updated[ticketIndex]?.count ?? 0)
                    : value;

                if (ticketIndex !== -1) {
                  updated[ticketIndex] = {
                    ...updated[ticketIndex],
                    count: newCount
                  };
                } else {
                  updated.push({
                    projector: screen.type.projector,
                    age: ticket.age,
                    cost: ticket.cost,
                    count: newCount
                  });
                }

                return updated;
              });
            };

            return (
              <TicketSelector
                key={index}
                age={ticket.age}
                cost={ticket.cost}
                fee={ticket.fee}
                remainingTickets={remainingTickets}
                ticketCount={ticketCount}
                setTicketCount={setTicketCount}
              />
            );
          })}

          <View className="bg-gray-300 w-full px-3 rounded-lg pt-2 pb-3 mb-12">
            <Text className="text-white font-gordita-regular text-lg pr-4">
              *This Convenience Fee is waived for AMC Stubs A-List and Premiere
              members, and for Premiere GO! members purchasing 4+ tickets.
            </Text>
          </View>
        </View>

        {rRated ? (
          <View className="items-center justify-center pb-10">
            <View className="flex-row">
              <Text className="text-blue-100 font-gordita-regular">
                ID Required for R-Rated Movies{"  "}
              </Text>
              <Image source={icons.info} className="h-5 w-5" />
            </View>
          </View>
        ) : (
          <View />
        )}

        <View className="border-gray-300 border-y mx-2 mb-6">
          <View className="items-center justify-center h-[70px]">
            <Text className="text-white font-gordita-bold text-xl">
              Would you like to add a combo?
            </Text>
          </View>

          <ConcessionSelector
            price={concessionPrice.comboPopcornTwoDrinks}
            title="Large Popcorn + 2 Large Drinks"
            description="Popcorn. 2 Large Drinks."
            image={images.comboPopcornTwoDrinks}
            selectedConcessions={selectedConcessions}
            setSelectedConcessions={setSelectedConcessions}
          />
        </View>
      </ScrollView>
      <TicketSelectionFooter
        remaining={remainingTickets}
        comboCount={concessionCount}
        ticketCount={ticketCount}
        onPress={() => {
          router.push({ pathname: "/movies/expressPickup" });
        }}
      />
    </View>
  );
};

export default TicketSelection;
