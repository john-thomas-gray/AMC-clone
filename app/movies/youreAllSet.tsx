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
import React, { useContext, useRef } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";

const YoureAllSet = () => {
  const purchasesContext = useContext(PurchasesContext);
  if (!purchasesContext) {
    throw new Error("PurchasesContext must be used within PurchasesProvider");
  }
  const { resetSelectedTickets, resetSelectedSeats } = purchasesContext;

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
    genre: screen?.movie?.genres?.[0].name ?? "Unknown Genre"
  };

  const selectedYes = (yes: boolean, source: "yesNo" | "cancel") => {
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
  };

  return (
    <View className="flex-1 bg-black px-2">
      <YoureAllSetHeader id={data.id} />
      <Text className="flex justify-center items-center text-gray-100 mb-8">
        We emailed your receipt. See you at the movies!
      </Text>
      <View>
        <View className="flex-row">
          <View className="justify-start items-start px-8">
            <Image
              source={{ uri: data.posterImage }}
              style={{ width: 75, height: 100 }}
              resizeMode="contain"
            />
          </View>
          <View className="flex-1">
            <Text
              className="text-white font-gordita-bold text-2xl mb-2"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {data.movieTitle}
            </Text>
            <View className="flex-row mb-4">
              <Text className="text-gray-100 font-gordita-regular">
                {formatRuntime(data.runtime)}
              </Text>
              <Image source={icons.info} className="h-5 w-5" />
              {data.genre?.toLowerCase() === "horror" ? (
                <Text className="text-gray-100 font-gordita-regular"> R </Text>
              ) : (
                <Text className="text-gray-100 font-gordita-regular">
                  {" "}
                  PG-13
                </Text>
              )}
              {data.genre?.toLowerCase() === "horror" ? (
                <Image source={icons.info} className="h-5 w-5" />
              ) : (
                ""
              )}
            </View>

            <Text
              className="text-white font-gordita-bold text-lg mb-2"
              style={{ lineHeight: 18 }}
            >
              Share & Meet Your Friends at {"\n"}AMC Theatres!
            </Text>
            <View className="flex-row items-center mb-6">
              <Image source={icons.facebookBw} className="h-9 w-9 mx-0.5" />
              <Image source={icons.twitterBw} className="h-9 w-9 mx-0.5" />
            </View>
            <Text className="text-gray-100 font-gordita-regular uppercase">
              TICKET CONFIRMATION #:
            </Text>
            <Text className="text-white font-gordita-regular">
              {generateTicketConfirmationNumber()}
            </Text>
          </View>
        </View>
        <View className="w-full flex items-center justify-center mt-20">
          <View className="h-[150px] w-[150px] rounded-full bg-white" />
        </View>
      </View>
    </View>
  );
};

export default YoureAllSet;
