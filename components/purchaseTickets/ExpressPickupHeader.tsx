import { ModalContext } from "@/context/ModalContext";
import { PurchasesContext } from "@/context/PurchasesContext";
import { TheatreDataContext } from "@/context/theatreDataContext";
import { TimerContext } from "@/context/TimerContext";
import { ExternalPathString, RelativePathString, useRouter } from "expo-router";
import React, { useContext, useEffect, useRef } from "react";
import { Text, View } from "react-native";
import BackButton from "../buttons/BackButton";
import CountdownTimer from "../CountdownTimer";

type ExpressPickupHeaderProps = {
  to?: RelativePathString | ExternalPathString | undefined;
};

const ExpressPickupHeader = ({ to }: ExpressPickupHeaderProps) => {
  const { resetSelectedSeats, resetSelectedTickets } =
    useContext(PurchasesContext);
  const { selectedSession } = useContext(TheatreDataContext);
  const router = useRouter();
  const alertModalId = useRef<string | null>(null);
  const yesNoModalId = useRef<string | null>(null);
  const cancelModalId = useRef<string | null>(null);
  const { showModal, hideModal } = useContext(ModalContext);
  const { startTimer, stopTimer, resetTimer } = useContext(TimerContext);
  const theatreName = selectedSession?.theatre?.name ?? "Theatre";
  const id = selectedSession?.screen.movie.id ?? "123";
  const { onTimeReached } = useContext(TimerContext);

  const handleCancel = () => {
    cancelModalId.current = showModal("yesno", {
      title: "Cancel Order",
      body: "Are you sure you want to cancel your order?",
      onYes: () => selectedYes(true, "cancel"),
      onNo: () => selectedYes(false, "cancel")
    });
  };

  const handleClose = () => {
    hideModal(alertModalId.current);
    resetSelectedSeats();
    resetSelectedTickets();
    router.push({
      pathname: "/movies/[id]",
      params: { id: selectedSession?.screen.movie.id.toString() ?? "" }
    });
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

  const hasRegistered = useRef(false);

  useEffect(() => {
    if (hasRegistered.current) return;

    onTimeReached(30, () => {
      showModal("yesno", {
        title: "Need More Time?",
        body: "We had to release any reserved tickets or food & beverage items because the allotted time has expired.",
        onYes: () => selectedYes(true, "yesNo"),
        onNo: () => selectedYes(false, "yesNo")
      });
    });

    hasRegistered.current = true;
  }, []);

  return (
    <View className="bg-black h-[18%] flex-row justify-between items-center px-4 pt-[67] border border-red pb-[12]">
      <BackButton className="" to={to} onPress={handleCancel} />

      <View className="w-[265] px-2">
        <Text className="text-white font-gordita-bold text-3xl">
          Express Pick-Up
        </Text>
        <View>
          <Text className="text-white font-gordita-reguler">{theatreName}</Text>
        </View>
      </View>

      <View className="w-[34] items-end">
        <CountdownTimer
          initialSeconds={420}
          onFinish={() =>
            onTimeReached(0, () => {
              showModal("alert", {
                title: "Oops! Time is up.",
                body: "We had to release any reserved tickets or food & beverage items because the allotted time has expired.",
                onClose: () => handleClose()
              });
            })
          }
        />
      </View>
    </View>
  );
};

export default ExpressPickupHeader;
