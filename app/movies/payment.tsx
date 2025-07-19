import StubsCard from "@/components/cards/StubsCard";
import GorditaText from "@/components/GorditaText";
import PaymentFooter from "@/components/purchaseTickets/PaymentFooter";
import PaymentHeader from "@/components/purchaseTickets/PaymentHeader";
import PaymentSelector from "@/components/purchaseTickets/PaymentSelector";
import SignInBanner from "@/components/purchaseTickets/SignInBanner";
import ShimmerOverlay from "@/components/ShimmerOverlay";
import { icons, images } from "@/constants";
import { stubsCardData } from "@/constants/stubsCardContent";
import { useModal } from "@/context/ModalContext";
import { PurchasesContext } from "@/context/PurchasesContext";
import { TheatreDataContext } from "@/context/theatreDataContext";
import { TimerContext } from "@/context/TimerContext";
import { showMatinee } from "@/utils/dateAndTime";
import { useRouter } from "expo-router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Animated, Image, Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const Payment = () => {
  const alertModalId = useRef<string | null>(null);
  const yesNoModalId = useRef<string | null>(null);
  const [showRewards, setShowRewards] = useState(false);
  const [rewardsRetracted, setRewardsRetracted] = useState(true);
  const cancelModalId = useRef<string | null>(null);
  const rewardsHeight = useRef(new Animated.Value(40)).current;

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "default" | "applePay" | "bitPay" | "payPal" | "venmo"
  >("default");

  const { showModal, hideModal } = useModal();
  const { resetSelectedSeats, resetSelectedTickets } =
    useContext(PurchasesContext);
  const { selectedSession, loading } = useContext(TheatreDataContext);
  const router = useRouter();
  const { resetTimer, startTimer, onTimeReached } = useContext(TimerContext);
  const handlePaymentSelected = (
    type: "default" | "applePay" | "bitPay" | "payPal" | "venmo"
  ) => {
    setSelectedPaymentMethod(type);
  };
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
  return (
    <View className="flex-1 bg-black">
      <PaymentHeader />
      <ScrollView>
        <SignInBanner />
        <StubsCard {...stubsCardData.premiere.payment} className="pt-5" />
        <View className="border-b border-gray-300 mx-4 py-4 max-w-[92%] self-center">
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

        {selectedSession?.screen?.movie?.genres?.[0]?.name === "Horror" ? (
          <View className="border-b border-gray-300 mx-4 py-4 max-w-[92%] self-center">
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
        <View className="border-b border-gray-300 mx-4 py-4 max-w-[92%] self-center">
          <View>
            <View className="flex-row items-center">
              <Image source={icons.film} className="h-6 w-6 mr-2" />
              <Text className="text-white font-gordita-bold text-xl">
                Movie Start Time
              </Text>
            </View>
            <Text className="font-gordita-regular text-gray-100  text-sm mb-2">
              The listed showtime is when trailers and additional content begin.
              The movie will start 25-30 minutes after the listed showtime.
            </Text>
          </View>
        </View>
        <View className="w-full border-b border-gray-300 py-4 mx-4 max-w-[92%] self-center">
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
            <PaymentSelector
              text="Apple Pay"
              image={icons.applePay}
              onPressOut={() => handlePaymentSelected("applePay")}
              selected={selectedPaymentMethod === "applePay"}
            />
            <PaymentSelector
              text="BitPay"
              image={icons.bitPay}
              onPressOut={() => handlePaymentSelected("bitPay")}
              selected={selectedPaymentMethod === "bitPay"}
            />
            <PaymentSelector
              text="PayPal"
              image={icons.payPal}
              onPressOut={() => handlePaymentSelected("payPal")}
              selected={selectedPaymentMethod === "payPal"}
            />
            <PaymentSelector
              text="Venmo"
              image={icons.venmo}
              onPressOut={() => handlePaymentSelected("venmo")}
              selected={selectedPaymentMethod === "venmo"}
            />

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
                <GorditaText className="mr-2 pt-2">
                  Use Rewards, Gift Cards, Promo Code, or Voucher
                </GorditaText>
                <Image
                  source={
                    showRewards ? icons.upArrowWhite : icons.downArrowWhite
                  }
                  className="h-3 w-4"
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
                      className="h-5 w-5 mx-2 my-4"
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
        <View className=" mx-4 py-4 max-w-[92%] self-center">
          <Text className="text-gray-100 font-gordita-regular text-xs">
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
      <PaymentFooter
        buttonText="Purchase"
        onPress={() => {
          console.log("purchased");
        }}
        disabled={!selectedPaymentMethod}
        selectedPaymentMethod={selectedPaymentMethod}
      />
    </View>
  );
};

export default Payment;
