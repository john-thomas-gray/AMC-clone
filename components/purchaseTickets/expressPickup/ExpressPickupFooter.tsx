import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import CustomButton from "../../buttons/CustomButton";
import CartButton from "../CartButton";

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
    <View className="border-t border-gray-300 ">
      <View className="h-[100] mt-3 justify-center">
        {buttonText === "Purchase" ? (
          <Text className="text-white text-sm px-4">
            By proceeding to purchase, I agree to the{" "}
            <Link
              href="https://www.amctheatres.com/terms-and-conditions"
              className="text-blue-100 text-sm"
            >
              AMC Terms of {`\n`} Use
            </Link>
            .
          </Text>
        ) : (
          <View />
        )}
        <View className="px-4 pt-4 pb-8 flex-row justify-between ">
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
    </View>
  );
};

export default ExpressPickupFooter;
