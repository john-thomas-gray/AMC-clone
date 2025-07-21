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
      <YoureAllSetHeader
        movieTitle="Movie Title"
        details="Details about the movie"
        id="12345"
      />
      <Text className="flex justify-center items-center text-gray-100">
        We emailed your receipt. See you at the movies!
      </Text>
      <View>
        <View>
          <Image source={data.posterImage} />
          <View>
            <Text
              className="text-white font-gordita-bold text-3xl"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {data.movieTitle}
            </Text>
            <View>
              <Text className="text-white font-gordita-reguler">
                {details.filter(Boolean).join(" | ")}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default YoureAllSet;
