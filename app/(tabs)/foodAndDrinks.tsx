import MacGuffinsBar from "@/components/foodAndDrinks/MacguffinsBar";
import OrderAhead from "@/components/foodAndDrinks/OrderAhead";
import SlidingLayout from "@/components/layouts/SlidingLayout";
import React from "react";
import { View } from "react-native";

const FoodAndDrinks = () => {
  return (
    <View className="flex-1 bg-black">
      <SlidingLayout buttonNames={["ORDER AHEAD", "MACGUFFINS BAR"]}>
        <OrderAhead />
        <MacGuffinsBar />
      </SlidingLayout>
    </View>
  );
};
export default FoodAndDrinks;
