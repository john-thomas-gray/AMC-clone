import ExpressPickupFooter from "@/components/purchaseTickets/ExpressPickupFooter";
import ExpressPickupHeader from "@/components/purchaseTickets/ExpressPickupHeader";
import { TheatreDataContext } from "@/context/theatreDataContext";
import { RelativePathString, useRouter } from "expo-router";
import React, { useContext } from "react";
import { View } from "react-native";

const ExpressPickup = () => {
  const { selectedSession } = useContext(TheatreDataContext);
  const router = useRouter();
  return (
    <View className="flex-1 bg-black">
      <ExpressPickupHeader
        to={"/movies/ticketSelection" as RelativePathString}
      />
      <ExpressPickupFooter onPress={() => router.push("/movies/payment")} />
    </View>
  );
};

export default ExpressPickup;
