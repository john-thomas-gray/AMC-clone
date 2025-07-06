import AlertModal from "@/components/AlertModal";
import StubsCard from "@/components/cards/StubsCard";
import ExpressPickupFooter from "@/components/purchaseTickets/ExpressPickupFooter";
import PaymentHeader from "@/components/purchaseTickets/PaymentHeader";
import SignInBanner from "@/components/purchaseTickets/SignInBanner";
import { stubsCardData } from "@/constants/stubsCardContent";
import { PurchasesContext } from "@/context/PurchasesContext";
import { TheatreDataContext } from "@/context/theatreDataContext";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { ScrollView, View } from "react-native";

const Payment = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { resetSelectedSeats, resetSelectedTickets } =
    useContext(PurchasesContext);
  const { selectedSession } = useContext(TheatreDataContext);
  const router = useRouter();

  const handleClose = () => {
    setModalVisible(false);
    resetSelectedSeats();
    resetSelectedTickets();
    router.push({
      pathname: "/movies/[id]",
      params: { id: selectedSession?.screen.movie.id.toString() ?? "" }
    });
  };

  return (
    <View className="flex-1 bg-black">
      <AlertModal
        visible={modalVisible}
        onClose={() => handleClose()}
        title="Oops! Time is up."
        body="We had to release any reserved tickets or food & beverage items because the alloted time has expired."
      />
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
