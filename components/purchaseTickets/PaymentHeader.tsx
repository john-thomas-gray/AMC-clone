import { useModal } from "@/context/ModalContext";
import { PurchasesContext } from "@/context/PurchasesContext";
import { TheatreDataContext } from "@/context/theatreDataContext";
import { TimerContext } from "@/context/TimerContext";
import { getCurrentDate } from "@/utils/dateAndTime";
import { ExternalPathString, RelativePathString, useRouter } from "expo-router";
import React, { useContext, useRef, useState } from "react";
import { Text, View } from "react-native";
import BackButton from "../buttons/BackButton";
import XButton from "../buttons/XButton";
import CountdownTimer from "../CountdownTimer";

type PaymentHeaderProps = {
  to?: RelativePathString | ExternalPathString | undefined;
};

const PaymentHeader = ({ to }: PaymentHeaderProps) => {
  const purchasesContext = useContext(PurchasesContext);
  if (!purchasesContext) {
    throw new Error("PurchasesContext must be used within PurchasesProvider");
  }
  const { resetSelectedTickets, resetSelectedSeats } = purchasesContext;

  const { selectedSession } = useContext(TheatreDataContext);

  const router = useRouter();

  const [timerCount, setTimerCount] = useState(420);

  const theatreName = selectedSession?.theatre?.name ?? "Theatre";
  const movieTitle = selectedSession?.screen.movie.title ?? "Movie";
  const showtime = selectedSession?.showtime ?? "";
  const projector = selectedSession?.screen.type.projector ?? "";
  const id = selectedSession?.screen.movie.id ?? "Ghostbusters";
  const details = [theatreName, getCurrentDate(), showtime, projector];
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
    <View className="bg-black h-[18%] flex-row justify-between items-center px-4 pt-[67] border border-red pb-[12]">
      <BackButton
        className=""
        onPress={() => {
          cancelModalId.current = showModal("yesno", {
            title: "Cancel Order",
            body: "Are you sure you want to cancel your order?",
            onYes: () => selectedYes(true, "yesNo"),
            onNo: () => selectedYes(false, "yesNo")
          });
        }}
      />

      <View className="w-[265] px-2">
        <Text className="text-white font-gordita-bold text-3xl">
          {movieTitle}
        </Text>
        <View>
          <Text className="text-white font-gordita-reguler">
            {details.filter(Boolean).join(" | ")}
          </Text>
        </View>
      </View>
      <View className="mt-[35] mr-4 w-[40] items-end">
        <CountdownTimer />
      </View>
      <XButton
        onPress={() => {
          cancelModalId.current = showModal("yesno", {
            title: "Cancel Order",
            body: "Are you sure you want to cancel your order?",
            onYes: () => selectedYes(true, "yesNo"),
            onNo: () => selectedYes(false, "yesNo")
          });
        }}
      />
    </View>
  );
};

export default PaymentHeader;
