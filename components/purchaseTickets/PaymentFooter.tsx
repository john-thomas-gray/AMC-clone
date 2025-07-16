import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import PaymentButton from "../buttons/PaymentButton";
import CartButton from "./CartButton";

type Props = {
  onPress: () => void;
  buttonText?: string;
  paymentType?: "default" | "applePay" | "bitPay" | "payPal" | "venmo";
  disabled?: boolean;
};

const PaymentFooter = ({
  onPress,
  buttonText = "Continue to Purchase",
  disabled = false,
  paymentType = "default"
}: Props) => {
  return (
    <View className="border-t border-gray-300 ">
      <View className="h-[100] mt-3 justify-center">
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

        <View className="px-4 pt-4 pb-8 flex-row justify-between ">
          <View className="h-5 w-5">
            <CartButton
              onPress={() => {
                console.log("cart button pressed");
              }}
            />
          </View>
          <PaymentButton
            type={paymentType}
            onPress={() => {
              console.log("Payment button pressed");
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default PaymentFooter;
