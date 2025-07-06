import StubsCard from "@/components/cards/StubsCard";
import ExpressPickupFooter from "@/components/purchaseTickets/ExpressPickupFooter";
import PaymentHeader from "@/components/purchaseTickets/PaymentHeader";
import SignInBanner from "@/components/purchaseTickets/SignInBanner";
import { stubsCardData } from "@/constants/stubsCardContent";
import { ModalContext } from "@/context/ModalContext";
import { PurchasesContext } from "@/context/PurchasesContext";
import { TheatreDataContext } from "@/context/theatreDataContext";
import { TimerContext } from "@/context/TimerContext";
import { useRouter } from "expo-router";
import React, { useContext, useRef } from "react";
import { ScrollView, View } from "react-native";

const Payment = () => {
  const alertModalId = useRef<string | null>(null);
  const yesNoModalId = useRef<string | null>(null);

  const { showModal, hideModal } = useContext(ModalContext);
  const { resetSelectedSeats, resetSelectedTickets } =
    useContext(PurchasesContext);
  const { selectedSession } = useContext(TheatreDataContext);
  const router = useRouter();
  const { resetTimer, startTimer, onTimeReached } = useContext(TimerContext);

  const handleClose = () => {
    if (alertModalId.current) {
      hideModal(alertModalId.current);
      alertModalId.current = null;
    }

    resetSelectedSeats();
    resetSelectedTickets();

    router.push({
      pathname: "/movies/[id]",
      params: { id: selectedSession?.screen.movie.id.toString() ?? "" }
    });
  };

  const selectedYes = (yes: boolean) => {
    if (yesNoModalId.current) {
      hideModal(yesNoModalId.current);
      yesNoModalId.current = null;
    }

    if (yes) {
      resetTimer();
      startTimer(420);
    }
  };

  onTimeReached(0, () => {
    alertModalId.current = showModal("alert", {
      title: "Oops! Time is up.",
      body: "We had to release any reserved tickets or food & beverage items because the allotted time has expired.",
      onClose: () => handleClose()
    });
  });

  onTimeReached(30, () => {
    yesNoModalId.current = showModal("yesno", {
      title: "Need More Time?",
      body: "We will soon release any reserved tickets or food & beverage items. Do you need more time to complete your purchase?",
      onYes: () => selectedYes(true),
      onNo: () => selectedYes(false)
    });
  });

  return (
    <View className="flex-1 bg-black">
      <PaymentHeader />
      <ScrollView>
        <SignInBanner />
        <StubsCard {...stubsCardData.premiere.payment} />
        <View className="flex-1"></View>
      </ScrollView>
      <ExpressPickupFooter
        buttonText="Purchase"
        onPress={() => {
          console.log("purchased");
        }}
        disabled={true}
      />
    </View>
  );
};

export default Payment;
