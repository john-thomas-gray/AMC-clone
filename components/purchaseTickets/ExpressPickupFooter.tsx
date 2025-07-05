import React from "react";
import { View } from "react-native";
import CustomButton from "../buttons/CustomButton";
import CartButton from "./CartButton";

type Props = {
  onPress: () => void;
  buttonText?: string;
  theatre?: string;
  projector?: string;
  showtime?: string;
  showDate?: string;
};

const ExpressPickupFooter = ({
  onPress,
  buttonText = "Continue to Purchase"
}: Props) => {
  return (
    <View className="h-[100] border border-red-500">
      <View className="border-t border-gray-300 px-4 pt-4 pb-8 flex-row justify-between items-center ">
        <View className="h-5 w-5">
          <CartButton />
        </View>
        <CustomButton title={buttonText} variant="white" onPress={onPress} />
      </View>
    </View>
  );
};

export default ExpressPickupFooter;
