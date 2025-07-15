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
import { showMatinee } from "@/utils/dateAndTime";
import { useRouter } from "expo-router";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  Text,
  View
} from "react-native";

const Payment = () => {
  const alertModalId = useRef<string | null>(null);
  const yesNoModalId = useRef<string | null>(null);
  const [showRewards, setShowRewards] = useState(false);
  const [rewardsRetracted, setRewardsRetracted] = useState(true);
  const cancelModalId = useRef<string | null>(null);
  const rewardsHeight = useRef(new Animated.Value(40)).current;

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

  const handleCancel = () => {
    cancelModalId.current = showModal("yesno", {
      title: "Cancel Order",
      body: "Are you sure you want to cancel your order?",
      onYes: () => selectedYes(true, "cancel"),
      onNo: () => selectedYes(false, "cancel")
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
      onYes: () => selectedYes(true, "yesNo"),
      onNo: () => selectedYes(false, "yesNo")
    });
  });

  useEffect(() => {
    Animated.timing(rewardsHeight, {
      toValue: showRewards ? 200 : 40,
      duration: 300,
      useNativeDriver: false
    }).start();

    if (showRewards) {
      if (rewardsRetracted) {
        setRewardsRetracted(false);
      }
    } else {
      const hideTimeout = setTimeout(() => {
        setRewardsRetracted(true);
      }, 300);
      return () => clearTimeout(hideTimeout);
    }
  }, [showRewards]);

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
          {selectedSession?.screen?.movie?.genres?.[0]?.name === "Horror" ? (
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
          ) : (
            <View />
          )}
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
              <Text className="text-blue-100 font-gordita-bold">Add Card</Text>
            </Pressable>
          </View>
          <View>
            <PaymentButton
              text="Apple Pay"
              image={icons.applePay}
              className="my-2"
            />
            <PaymentButton
              text="bitPay"
              image={icons.bitPay}
              className="my-2"
            />
            <PaymentButton
              text="payPal"
              image={icons.payPal}
              className="my-2"
            />
            <PaymentButton text="venmo" image={icons.venmo} className="my-2" />
            <Animated.View
              style={{
                height: rewardsHeight,
                overflow: "hidden",
                width: "100%"
              }}
            >
              <Pressable
                className="flex-row justify-between items-center"
                onPress={() => {
                  setShowRewards(!showRewards);
                }}
              >
                <Text className="text-white font-gordita-regular mr-2">
                  Use Rewards, Gift Cards, Promo Code, or Voucher
                </Text>
                <Image
                  source={
                    showRewards ? icons.upArrowWhite : icons.downArrowWhite
                  }
                  className="h-2 w-4"
                />
              </Pressable>
              {rewardsRetracted ? (
                <View />
              ) : (
                <View className="pt-2">
                  <Text className="text-gray-100 font-gordita-regular text-sm py-2">
                    Rewards can only be used on eligible purchases.
                  </Text>
                  <View className="flex-row items-center ">
                    <Image
                      source={icons.plusBlue}
                      className="h-4 w-4 mx-2 my-4"
                    />
                    <Text className="text-blue-100 font-gordita-bold">
                      Add Gift Card
                    </Text>
                  </View>
                  <View className="flex-row items-center ">
                    <Image
                      source={icons.plusBlue}
                      className="h-4 w-4 mx-2 my-4"
                    />
                    <Text className="text-blue-100 font-gordita-bold">
                      Add Promo Code
                    </Text>
                  </View>
                  <View className="flex-row items-center ">
                    <Image
                      source={icons.plusBlue}
                      className="h-4 w-4 mx-2 my-4"
                    />
                    <Text className="text-blue-100 font-gordita-bold">
                      Add Ticket Voucher
                    </Text>
                  </View>
                </View>
              )}
            </Animated.View>
          </View>
        </View>
        <View className="m-4">
          <Text className="text-gray-100 font-gordita-regular text-xs pt-2">
            No refunds are provided after the displayed showtime.
          </Text>
          {showMatinee(selectedSession?.showtime) ? (
            <Text className="text-gray-100 font-gordita-regular text-xs">
              {`\n`}
              20 % OFF the evening base ticket price for the same title and
              ticket type (Adult, Child, Senior, etc.) for showtimes before 4pm
              at select AMC, AMC DINE-IN, and AMC CLASSIC locations. Prices do
              not include tax. Offer valid at participating locations only.
              Discount is automatically applied. Available at the box office,
              online at AMCTheatres.com and the AMC Mobile App. Not valid with
              any other offer. Offer not combinable with 50% off Tickets on
              Tuesdays 7 Wednesdays discount. Lower price will be honored.
              Surcharges will apply for premium formats, alternative content and
              special events. Exclusions apply.
            </Text>
          ) : (
            <Text />
          )}
        </View>
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
