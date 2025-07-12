import PaymentButton from "@/components/buttons/PaymentButton";
import StubsCard from "@/components/cards/StubsCard";
import ExpressPickupFooter from "@/components/purchaseTickets/ExpressPickupFooter";
import PaymentHeader from "@/components/purchaseTickets/PaymentHeader";
import SignInBanner from "@/components/purchaseTickets/SignInBanner";
import { icons } from "@/constants";
import { stubsCardData } from "@/constants/stubsCardContent";
import { ModalContext } from "@/context/ModalContext";
import { PurchasesContext } from "@/context/PurchasesContext";
import { TheatreDataContext } from "@/context/theatreDataContext";
import { TimerContext } from "@/context/TimerContext";
import { useRouter } from "expo-router";
import React, { useContext, useRef } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

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
        <View className="w-full border-b border-gray-300 p-4">
          <View>
            <Text className="text-white font-gordita-bold text-xl">
              Contact Info
            </Text>
            <Pressable
              className="flex-row items-center"
              onPress={() => console.log("add email pressed")}
            >
              <Image source={icons.plusBlue} className="h-4 w-4 mx-2 my-6" />
              <Text className="text-blue-100 font-gordita-bold">
                Add Email Address
              </Text>
            </Pressable>
          </View>
          <Text className="font-gordita-regular text-gray-100 text-sm mb-2">
            Your receipt and order confirmation will be sent to this email
            address.
          </Text>
        </View>
        <View className="w-full border-b border-gray-300 p-4">
          <View>
            <Text className="text-white font-gordita-bold text-xl">
              ID Required for R-Rated Movies
            </Text>
            <Text className="text-white font-gordita-regular text-lg">
              Guests under 17 must be accompanied by a guardian who is 21 or
              older. Please be prepared to show ID at the theatre. Children
              under 6 are not allowed at R-rated movies after 6pm at this
              theatre.{" "}
            </Text>
          </View>
        </View>
        <View className="w-full border-b border-gray-300 p-4">
          <View>
            <View className="flex-row items-center">
              <Image source={icons.film} className="h-6 w-6 mr-2 my-6" />
              <Text className="text-white font-gordita-bold text-xl">
                Movie Start Time
              </Text>
            </View>
            <Text className="font-gordita-regular text-gray-100  text-sm mb-2">
              The listed showtime is when trailers and additional context begin.
              The movie will start 25-30 minutes after the listed showtime.
            </Text>
          </View>
        </View>
        <View className="w-full border-b border-gray-300 p-4">
          <View>
            <Text className="text-white font-gordita-bold text-xl">
              Payment
            </Text>
            <Pressable
              className="flex-row items-center"
              onPress={() => console.log("add card pressed")}
            >
              <Image source={icons.plusBlue} className="h-4 w-4 mx-2 my-4" />
              <Text className="text-blue-100 font-gordita-bold">AddCard</Text>
            </Pressable>
          </View>
          <View>
            <PaymentButton
              text="Apple Pay"
              image={icons.ApplePay}
              className="my-2"
            />
            <PaymentButton
              text="BitPay"
              image={icons.BitPay}
              className="my-2"
            />
            <PaymentButton
              text="PayPal"
              image={icons.PayPal}
              className="my-2"
            />
            <PaymentButton text="Venmo" image={icons.Venmo} className="my-2" />
          </View>
        </View>

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
