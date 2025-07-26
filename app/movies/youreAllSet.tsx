import GorditaText from "@/components/GorditaText";
import YoureAllSetHeader from "@/components/purchaseTickets/youreAllSet/YoureAllSetHeader";
import ShimmerOverlay from "@/components/ShimmerOverlay";
import { icons, images } from "@/constants";
import { movieTicketPrice } from "@/constants/PriceConstants";
import { useModal } from "@/context/ModalContext";
import { PurchasesContext } from "@/context/PurchasesContext";
import { TheatreDataContext } from "@/context/theatreDataContext";
import { TimerContext } from "@/context/TimerContext";
import { getCurrentDate } from "@/utils/dateAndTime";
import { formatRuntime } from "@/utils/formatMovieData";
import { generateTicketConfirmationNumber } from "@/utils/generateTicketConfirmationNumber";
import { useRouter } from "expo-router";
import React, { useContext, useRef } from "react";
import { Image, SafeAreaView, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
const YoureAllSet = () => {
  const purchasesContext = useContext(PurchasesContext);
  if (!purchasesContext) {
    throw new Error("PurchasesContext must be used within PurchasesProvider");
  }
  const {
    resetSelectedTickets,
    resetSelectedSeats,
    setSelectedTickets,
    selectedTickets,
    selectedSeats,
    setSelectedSeats
  } = purchasesContext;

  const { selectedSession, loading } = useContext(TheatreDataContext);
  const router = useRouter();
  const { showModal, hideModal } = useModal();
  const { startTimer, stopTimer, resetTimer } = useContext(TimerContext);
  const yesNoModalId = useRef<string | null>(null);
  const cancelModalId = useRef<string | null>(null);

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
  console.log(screen);
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

  // For development
  if (selectedSeats.length === 0) {
    setSelectedSeats(["D9", "D10", "D11"]);
    setSelectedTickets([
      {
        projector: data.projector,
        age: "Adult",
        cost: movieTicketPrice.adult,
        count: 3
      }
    ]);
  }

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
        resetSelectedSeats();
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
  console.log("selected", selectedSeats);

  return (
    <View className="flex-1 bg-black px-2">
      <YoureAllSetHeader id={data.id} />
      <ScrollView>
        <GorditaText className="text-center text-gray-100 mb-8">
          We emailed your receipt. See you at the movies!
        </GorditaText>

        {/* Movie Info Row */}
        <View className="flex-row px-4 mb-4">
          <Image
            source={{ uri: data.posterImage }}
            style={{ width: 75, height: 100 }}
            resizeMode="contain"
          />

          <View className="flex-1 ml-4">
            <GorditaText
              className="text-white font-gordita-bold text-2xl mb-2"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {data.movieTitle}
            </GorditaText>

            <View className="flex-row items-center mb-4">
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
              Share & Meet Your Friends at {"\n"}AMC Theatres!
            </GorditaText>

            <View className="flex-row items-center mb-6">
              <Image source={icons.facebookBw} className="h-9 w-9 mx-0.5" />
              <Image source={icons.twitterBw} className="h-9 w-9 mx-0.5" />
            </View>

            <GorditaText className="text-gray-200 font-gordita-regular uppercase">
              TICKET CONFIRMATION #:
            </GorditaText>
            <GorditaText className="text-white font-gordita-regular">
              {generateTicketConfirmationNumber()}
            </GorditaText>
          </View>
        </View>

        {/* Center Circle */}
        <View className="w-full items-center justify-center mt-20 mb-8">
          <View className="h-[150px] w-[150px] rounded-full bg-white" />
        </View>

        {/* Info and Icon Columns */}
        <View className="flex-row items-start">
          {/* Left Column: Icon */}
          <View className="mr-4">
            <Image source={icons.ticketTabFocused} className="h-12 w-12" />
            <Image source={icons.locationTabFocused} className="h-12 w-12" />
            <Image source={icons.calendar} className="h-12 w-12" />
            <Image
              source={icons.creditCard}
              className="h-12 w-12"
              resizeMode="contain"
            />
          </View>

          {/* Right Column: GorditaText */}
          <View className="flex-1">
            <View className="mb-3">
              <GorditaText className="text-gray-200 font-gordita-regular uppercase mb-1">
                TICKETS
              </GorditaText>
              {selectedTickets.some(ticket => ticket.count > 0) ? (
                selectedTickets
                  .filter(ticket => ticket.count > 0)
                  .map((ticket, index) => (
                    <GorditaText
                      key={index}
                      className="text-white font-gordita-regular"
                    >
                      {ticket.count} {ticket.age}
                    </GorditaText>
                  ))
              ) : (
                <GorditaText className="text-white font-gordita-regular">
                  1 Adult
                </GorditaText>
              )}
            </View>

            <View>
              <GorditaText className="text-gray-200 font-gordita-regular uppercase mb-1">
                AUDITORIUM
              </GorditaText>
              <GorditaText className="text-white font-gordita-regular">
                {data.auditoriumNumber}
              </GorditaText>
            </View>

            <View>
              <GorditaText className="text-gray-200 font-gordita-regular uppercase mb-1">
                SEATS
              </GorditaText>
              <View className="flex-row">
                <GorditaText className="text-white font-gordita-regular">
                  {selectedSeats.join(", ")}
                </GorditaText>
                <TouchableOpacity>
                  <GorditaText className="text-blue-100"> View</GorditaText>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <GorditaText className="text-gray-200 font-gordita-regular uppercase mb-1">
                THEATRE
              </GorditaText>
              <View className="flex-row">
                <GorditaText className="text-white font-gordita-regular">
                  {data.theatreName}
                </GorditaText>
                <TouchableOpacity>
                  <GorditaText className="text-blue-100"> View</GorditaText>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <GorditaText className="text-gray-200 font-gordita-regular uppercase mb-1">
                DATE
              </GorditaText>
              <View className="flex-row">
                <GorditaText className="text-white font-gordita-regular">
                  {getCurrentDate()}
                </GorditaText>
                <TouchableOpacity>
                  <GorditaText className="text-blue-100"> View</GorditaText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default YoureAllSet;
