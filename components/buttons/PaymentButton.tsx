import { logos } from "@/constants";
import React, { useEffect } from "react";
import { Image, Pressable, Text } from "react-native";

type PaymentButtonProps = {
  type: "default" | "applePay" | "bitPay" | "payPal" | "venmo";
  disabled?: boolean;
  onPress: () => void;
};

const getTypeDetails = (type: string) => {
  switch (type) {
    case "default":
      return {
        label: "Purchase",
        container:
          "h-[38px] flex flex-row items-center border rounded-full px-4 bg-gray-200 border-2 border-gray-100 rounded-full",
        text: "text-black"
      };
    case "applePay":
      return {
        label: "Apple Pay",
        container: "bg-gray-200 border-gray-100",
        icon: logos.applePayButton
      };
    case "bitPay":
      return {
        label: "BitPay",
        container: "bg-gray-200 border-gray-100",
        icon: logos.bitPayButton
      };
    case "payPal":
      return {
        label: "PayPal",
        container: "bg-gray-200 border-gray-100",
        icon: logos.payPalButton
      };
    case "venmo":
      return {
        label: "Venmo",
        container: "bg-gray-200 border-gray-100",
        icon: logos.venmoButton
      };
    default:
      throw new Error("Invalid payment type");
  }
};

const PaymentButton = ({
  type,
  disabled = true,
  onPress
}: PaymentButtonProps) => {
  useEffect(() => {
    getTypeDetails(type);
  }, [type]);
  const { label, container, icon, text } = getTypeDetails(type);
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`flex-row items-center justify-center
       p-2 ${container}`}
    >
      {label ? (
        <Text className={`${text}`}>{label}</Text>
      ) : (
        icon && <Image source={icon} className="w-4 h-4 mr-2" />
      )}
    </Pressable>
  );
};

export default PaymentButton;
