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
  disabled?: boolean;
};

const ExpressPickupFooter = ({
  onPress,
  buttonText = "Continue to Purchase",
  disabled = false
}: Props) => {
  return (
    <View className="h-[100]">
      <View className="border-t border-gray-300 px-4 pt-4 pb-8 flex-row justify-between ">
        <View className="h-5 w-5">
          <CartButton
            onPress={() => {
              console.log("cart button pressed");
            }}
          />
        </View>
        <CustomButton
          title={buttonText}
          bold={true}
          disabled={disabled}
          variant="white"
          onPress={onPress}
        />
      </View>
    </View>
  );
};

export default ExpressPickupFooter;
