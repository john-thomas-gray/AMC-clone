import YoureAllSetHeader from "@/components/purchaseTickets/youreAllSet/YoureAllSetHeader";
import { useModal } from "@/context/ModalContext";
import { PurchasesContext } from "@/context/PurchasesContext";
import { TheatreDataContext } from "@/context/theatreDataContext";
import { TimerContext } from "@/context/TimerContext";
import { getCurrentDate } from "@/utils/dateAndTime";
import { useRouter } from "expo-router";
import React, { useContext, useRef } from "react";
import { Image, Text, View } from "react-native";

const YoureAllSet = () => {
  const purchasesContext = useContext(PurchasesContext);
  if (!purchasesContext) {
    throw new Error("PurchasesContext must be used within PurchasesProvider");
  }
  const { resetSelectedTickets, resetSelectedSeats } = purchasesContext;

  const { selectedSession } = useContext(TheatreDataContext);

  const router = useRouter();
  const { theatre, screen, showtime } = selectedSession;
  const data = {
    movieTitle: screen.movie.title ?? "Theatre",
    posterImage: screen.movie.image ?? "Movie",
    showtime: showtime ?? "",
    projector: screen.type.projector ?? "",
    id: screen.movie.id ?? "1"
  };
  const details = [
    screen.theatreName,
    getCurrentDate(),
    showtime,
    screen.projector
  ];
  const { showModal, hideModal } = useModal();
  const { startTimer, stopTimer, resetTimer } = useContext(TimerContext);
  const yesNoModalId = useRef<string | null>(null);
  const cancelModalId = useRef<string | null>(null);

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
    <View className="flex-1 bg-black">
      <YoureAllSetHeader id={data.id} />
      <Text className="flex justify-center items-center text-gray-100 my-4">
        We emailed your receipt. See you at the movies!
      </Text>
      <View>
        <View className="flex-row">
          <Image
            source={{ uri: data.posterImage }}
            style={{ width: 150, height: 225 }}
            className="padding-6 bg-red-500"
          />
          r
          <View>
            <Text
              className="text-white font-gordita-bold text-2xl"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {data.movieTitle}
            </Text>
            <Text className="text-white font-gordita-regular">
              {details.filter(Boolean).join(" | ")}
            </Text>
            <Text className="text-white font-gordita-bold">
              Share & Meet Your Friends at AMC Theatres!
            </Text>
            <View className="flex-row items-center">
              <Image />
              <Image />
            </View>
            <Text className="text-gray-100 font-gordita-regular capitalize">
              TICKET CONFIRMATION #:
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default YoureAllSet;
