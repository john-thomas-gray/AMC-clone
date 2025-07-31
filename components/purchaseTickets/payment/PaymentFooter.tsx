import { Link, useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import PaymentButton from "../../buttons/PaymentButton";
import CartButton from "../CartButton";

type Props = {
  onPress: () => void;
  buttonText?: string;
  disabled?: boolean;
  selectedPaymentMethod?:
    | "default"
    | "applePay"
    | "bitPay"
    | "payPal"
    | "venmo";
};

const PaymentFooter = ({
  onPress,
  buttonText = "Continue to Purchase",
  disabled = false,
  selectedPaymentMethod = "default"
}: Props) => {
  const router = useRouter();
  return (
    <View className="border-t border-gray-300 ">
      <View className="h-[120] mt-3 justify-center">
        <Text className="text-white text-sm px-4">
          By proceeding to purchase, I agree to the{" "}
          <Link
            href="https://www.amctheatres.com/terms-and-conditions"
            className="text-blue-100 text-sm"
          >
            AMC Terms of Use
          </Link>
          .
        </Text>

        <View className=" h-[100] pl-4 pr-8 pt-4 pb-8 flex-row justify-between items-center">
          <View className="h-5 w-5 mb-5">
            <CartButton
              onPress={() => {
                console.log("cart button pressed");
              }}
            />
          </View>
          <PaymentButton
            selectedPaymentMethod={selectedPaymentMethod}
            onPress={() => {
              onPress();
            }}
            disabled={disabled}
          />
        </View>
      </View>
    </View>
  );
};

export default PaymentFooter;
