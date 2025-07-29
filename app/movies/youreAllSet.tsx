import GorditaText from "@/components/GorditaText";
import YoureAllSetHeader from "@/components/purchaseTickets/youreAllSet/YoureAllSetHeader";
import ShimmerOverlay from "@/components/ShimmerOverlay";
import { icons, images } from "@/constants";
import { useModal } from "@/context/ModalContext";
import { PurchasesContext } from "@/context/PurchasesContext";
import { TheatreDataContext } from "@/context/theatreDataContext";
import { TimerContext } from "@/context/TimerContext";
import { formatRuntime } from "@/utils/formatMovieData";
import { generateTicketConfirmationNumber } from "@/utils/generateTicketConfirmationNumber";
import { useRouter } from "expo-router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Image, Pressable, SafeAreaView, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const YoureAllSet = () => {
  // ADD LOGIC TO HANDLE THE TIMER
  // ADD LOGIC TO HANDLE THE TIMER
  // ADD LOGIC TO HANDLE THE TIMER
  // ADD LOGIC TO HANDLE THE TIMER
  // ADD LOGIC TO HANDLE THE TIMER

  const [confirmationNumber] = useState(() =>
    generateTicketConfirmationNumber()
  );
  const purchasesContext = useContext(PurchasesContext);
  if (!purchasesContext) {
    throw new Error("PurchasesContext must be used within PurchasesProvider");
  }
  const { resetSelectedTickets, setSelectedTickets, selectedTickets } =
    purchasesContext;

  const { selectedSession, loading } = useContext(TheatreDataContext);
  const router = useRouter();
  const { showModal, hideModal } = useModal();
  const { startTimer, stopTimer, resetTimer } = useContext(TimerContext);
  const yesNoModalId = useRef<string | null>(null);
  const cancelModalId = useRef<string | null>(null);
  const [numberEntered, setNumberEntered] = useState(false);

  // Aggregate all seats from adult, child, and senior tickets
  const allSelectedSeats = [
    ...selectedTickets.adult.seats,
    ...selectedTickets.child.seats,
    ...selectedTickets.senior.seats
  ];

  // Set default seats if none selected (do this safely in useEffect)
  useEffect(() => {
    if (allSelectedSeats.length === 0) {
      setSelectedTickets({
        adult: {
          ...selectedTickets.adult,
          seats: ["D9", "D10", "D11"],
          tickets: {
            ...selectedTickets.adult.tickets,
            Standard: {
              ...selectedTickets.adult.tickets.Standard,
              count: 3
            }
          }
        },
        child: selectedTickets.child,
        senior: selectedTickets.senior
      });
    }
  }, [allSelectedSeats.length, selectedTickets, setSelectedTickets]);

  if (!selectedSession || loading) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <ShimmerOverlay
          source={images.loadingOneShimmer}
          imageSource={images.loadingOne}
          className="h-[100%] w-[100%]"
        />
      </SafeAreaView>
    );
  }

  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";
  const { theatre, screen, showtime } = selectedSession;
  const data = {
    movieTitle: screen?.movie?.title ?? "Theatre",
    posterImage: screen?.movie?.poster_path
      ? `${BASE_IMAGE_URL}${screen.movie.poster_path}`
      : "https://via.placeholder.com/150x225",
    showtime: showtime ?? "",
    projector: screen?.type?.projector ?? "",
    id: screen?.movie?.id ?? 1,
    theatreName: theatre?.name ?? "Unknown Theatre",
    runtime: screen?.movie?.runtime ?? 0,
    genre: screen?.movie?.genres?.[0].name ?? "Unknown Genre",
    auditoriumNumber: screen?.number ?? 1
  };

  function selectedYes(yes: boolean, source: "yesNo" | "cancel") {
    const clearModal = (ref: React.RefObject<string | null>) => {
      if (ref.current) {
        hideModal(ref.current);
        ref.current = null;
      }
    };

    clearModal(cancelModalId);
    clearModal(yesNoModalId);

    if (yes) {
      if (source === "yesNo") {
        resetTimer();
        startTimer(420);
        resetSelectedTickets();
        router.push({
          pathname: "/movies/[id]",
          params: {
            id: selectedSession?.screen.movie.id.toString() ?? ""
          }
        });
      }

      if (source === "cancel") {
        router.push({
          pathname: "/movies/[id]",
          params: {
            id: selectedSession?.screen.movie.id.toString() ?? ""
          }
        });
      }
    }
  }

  return (
    <View className="flex-1 bg-black px-4">
      <YoureAllSetHeader id={data.id} />
      <ScrollView>
        <GorditaText className="text-sm text-gray-100 mb-8 mt-1">
          We emailed your receipt. See you at the movies!
        </GorditaText>

        {/* Movie Info Row */}
        <View className="flex-row pl-8 mb-4 mt-2">
          <Image
            source={{ uri: data.posterImage }}
            style={{ width: 90, height: 110 }}
            resizeMode="contain"
          />

          <View className="flex-1 ml-10">
            <GorditaText
              className="text-white font-gordita-bold text-2xl mb-2"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {data.movieTitle}
            </GorditaText>

            <View className="flex-row items-center mb-6">
              <GorditaText className="text-gray-100 font-gordita-regular">
                {formatRuntime(data.runtime)}{" "}
              </GorditaText>
              <Image source={icons.info} className="h-5 w-5" />
              <GorditaText className="text-gray-100 font-gordita-regular">
                {" "}
                {data.genre?.toLowerCase() === "horror" ? "R" : "PG-13"}{" "}
              </GorditaText>
              {data.genre?.toLowerCase() === "horror" && (
                <Image source={icons.info} className="h-5 w-5" />
              )}
            </View>

            <GorditaText
              className="text-white font-gordita-bold text-lg mb-2"
              style={{ lineHeight: 18 }}
            >
              Share & Meet Your Friends at AMC Theatres!
            </GorditaText>

            <View className="flex-row items-center mb-6">
              <Image source={icons.facebookBw} className="h-9 w-9 mx-0.5" />
              <Image source={icons.twitterBw} className="h-9 w-9 mx-0.5" />
            </View>

            <GorditaText className="text-gray-100 font-gordita-regular uppercase">
              TICKET CONFIRMATION #:
            </GorditaText>
            <GorditaText className="text-white font-gordita-regular text-lg">
              {confirmationNumber}
            </GorditaText>
          </View>
        </View>

        {/* QR Code */}
        <View className="w-full items-center justify-center mt-12 mb-8">
          <View className="h-[150px] w-[150px] rounded-full bg-white" />
        </View>

        {/* Icon and Info Columns */}
        <View className="w-full items-center justify-center">
          <View className="flex-row gap-x-10 items-start mb-2">
            {/* Left Column: Icon */}
            <View className="flex-column border border-red-500 ml-10">
              <Image
                source={icons.ticketTabFocused}
                className="h-12 w-12 mt-[54]"
              />
              <Image
                source={icons.locationTabFocused}
                className="h-12 w-12 mt-[84]"
              />
              <Image source={icons.calendar} className="h-12 w-12 mt-[76]" />
              <Image
                source={icons.creditCard}
                className="h-12 w-12 mt-[58]"
                resizeMode="contain"
              />
            </View>

            {/* Right Column: GorditaText */}
            <View className="flex-column border border-blue-100">
              <View className="mb-2">
                <GorditaText className="text-gray-100 font-gordita-regular uppercase mb-[2]">
                  TICKETS
                </GorditaText>

                {(["adult", "child", "senior"] as const).map(age =>
                  Object.entries(selectedTickets[age].tickets).map(
                    ([projectorType, ticket]) =>
                      ticket.count > 0 ? (
                        <GorditaText
                          key={`${age}-${projectorType}`}
                          className="text-white font-gordita-regular text-lg"
                        >
                          {ticket.count}{" "}
                          {age.charAt(0).toUpperCase() + age.slice(1)}
                        </GorditaText>
                      ) : null
                  )
                )}

                {(["adult", "child", "senior"] as const).every(age =>
                  Object.values(selectedTickets[age].tickets).every(
                    ticket => ticket.count === 0
                  )
                ) && (
                  <GorditaText className="text-white font-gordita-regular text-lg">
                    1 Adult
                  </GorditaText>
                )}
              </View>

              <View>
                <GorditaText className="text-gray-100 font-gordita-regular uppercase mb-[2]">
                  AUDITORIUM
                </GorditaText>
                <GorditaText className="text-white font-gordita-regular text-lg mb-2 mb-2">
                  {data.auditoriumNumber}
                </GorditaText>
              </View>

              <View className="mb-3">
                <GorditaText className="text-gray-100 font-gordita-regular uppercase mb-[2]">
                  SEATS
                </GorditaText>
                <View className="flex-row items-center">
                  <GorditaText className="text-white font-gordita-regular text-lg mb-2">
                    {allSelectedSeats.length > 0
                      ? allSelectedSeats.join(", ")
                      : "No seats selected"}
                  </GorditaText>
                  <Pressable>
                    <GorditaText className="font-gordita-bold text-blue-100 pb-1 pl-2">
                      View
                    </GorditaText>
                  </Pressable>
                </View>
              </View>

              <View className="mb-6">
                <GorditaText className="text-gray-100 font-gordita-regular uppercase mb-[2]">
                  THEATRE
                </GorditaText>
                <View className="flex-column">
                  <GorditaText className="text-white font-gordita-regular text-lg mb-1">
                    {data.theatreName}
                  </GorditaText>
                  <View className="flex-column">
                    <GorditaText
                      className="text-blue-100 text-sm"
                      style={{ lineHeight: 14 }}
                    >
                      ADDRESS LINE 1
                    </GorditaText>
                    <GorditaText
                      className="text-blue-100 text-sm"
                      style={{ lineHeight: 14 }}
                    >
                      ADDRESS LINE 2
                    </GorditaText>
                  </View>
                </View>
              </View>

              <View>
                <GorditaText className="text-gray-100 font-gordita-regular uppercase mb-[8]">
                  DATE
                </GorditaText>
                <View className="flex-column">
                  <GorditaText
                    className="text-white font-gordita-regular text-lg"
                    style={{ lineHeight: 16 }}
                  >
                    {selectedTickets.adult.date}
                  </GorditaText>
                  <GorditaText
                    className="text-gray-100 text-sm mb-7"
                    style={{ lineHeight: 14 }}
                  >
                    at TIME
                  </GorditaText>
                  <GorditaText className="text-blue-100 font-gordita-bold mb-10">
                    Add to calendar
                  </GorditaText>
                </View>
              </View>

              <View>
                <GorditaText className="text-gray-100 font-gordita-regular uppercase mb-[6]">
                  PAYMENT
                </GorditaText>
                <GorditaText
                  className="text-white font-gordita-regular text-lg"
                  style={{ lineHeight: 16 }}
                >
                  Apple Pay
                </GorditaText>
                <GorditaText
                  className="text-gray-100 text-sm mb-7"
                  style={{ lineHeight: 14 }}
                >
                  Cost
                </GorditaText>
              </View>
            </View>
          </View>
        </View>

        {/* Apple Wallet Icon */}
        <View className="flex items-center pb-[40] border-b border-gray-300">
          <Image
            source={icons.appleWallet}
            className="h-14" // Tailwind height/width
            resizeMode="contain"
          />
        </View>

        <View className="py-8 border-b border-gray-300">
          <GorditaText className="text-white font-gordita-bold text-2xl">
            Send My Digital Tickets
          </GorditaText>

          <GorditaText className="text-sm text-gray-100 mb-8">
            Add your number to get your ticket via text.
          </GorditaText>

          <GorditaText className="text-white font-gordita-bold">
            Phone Number
          </GorditaText>

          <TextInput></TextInput>

          <Pressable>
            <GorditaText
              className={`text-lg font-gordita-bold ${
                numberEntered ? "text-gray-100" : "text-gray-200"
              }`}
            >
              Text My Tickets
            </GorditaText>
          </Pressable>
        </View>

        <View className="pt-8 pb-6 ">
          <GorditaText className="text-white font-gordita-bold text-2xl">
            Order Details
          </GorditaText>

          <View className="flex-column pb-6">
            <View className="flex-column">
              <GorditaText className="text-gray-100 text-sm font-gordita-regular uppercase">
                TICKETS
              </GorditaText>

              <View className="flex-row justify-between">
                <GorditaText className="font-gordita-bold">
                  Adult Ticket
                </GorditaText>

                <GorditaText className="font-gordita-bold">COST</GorditaText>
              </View>

              <View className="flex-row justify-between">
                <GorditaText className="font-gordita-bold">
                  3x Child Ticket
                </GorditaText>

                <GorditaText className="font-gordita-bold">COST</GorditaText>
              </View>
            </View>

            <View className="flex-column">
              <GorditaText className="text-gray-100 text-sm font-gordita-regular uppercase">
                Concessions
              </GorditaText>

              <View className="flex-row justify-between">
                <GorditaText className="font-gordita-bold">
                  Large Popcorn
                </GorditaText>

                <GorditaText className="font-gordita-bold">COST</GorditaText>
              </View>

              <View className="flex-row justify-between">
                <GorditaText className="font-gordita-bold">3x Soda</GorditaText>

                <GorditaText className="font-gordita-bold">COST</GorditaText>
              </View>
            </View>

            <View className="flex-column">
              <GorditaText className="text-gray-100 text-sm font-gordita-regular uppercase">
                FEES
              </GorditaText>

              <View className="flex-row justify-between">
                <GorditaText className="font-gordita-bold">
                  Convenience Fee
                </GorditaText>

                <GorditaText className="font-gordita-bold">COST</GorditaText>
              </View>
            </View>
          </View>

          <View className="border-y border-gray-300 pt-4 pb-3">
            <View className="flex-row justify-between items-center">
              <GorditaText className="font-gordita-bold">Taxes</GorditaText>

              <GorditaText className="font-gordita-bold">COST</GorditaText>
            </View>
          </View>
          <View className="flex-row justify-end items-center pb-12 pt-6">
            <View className="mr-2 ">
              <GorditaText className="text-md text-gray-100 uppercase">
                TOTAL
              </GorditaText>
            </View>

            <GorditaText className="font-gordita-bold">TOTAL COST</GorditaText>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default YoureAllSet;
