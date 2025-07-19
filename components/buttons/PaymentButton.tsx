import { logos } from "@/constants";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";

type PaymentButtonProps = {
  selectedPaymentMethod:
    | "default"
    | "applePay"
    | "bitPay"
    | "payPal"
    | "venmo"
    | null;
  disabled?: boolean;
  onPress: () => void;
};

const getTypeDetails = (selectedPaymentMethod: string | null) => {
  switch (selectedPaymentMethod) {
    case "default":
      return {
        label: "Purchase",
        containerStyle: {
          backgroundColor: "#e5e7eb",
          borderColor: "#d1d5db",
          borderWidth: 2
        },
        text: "text-black",
        rounded: 50,
        dimensions: { w: 160, h: 50 }
      };
    case "applePay":
      return {
        label: "Apple Pay",
        icon: logos.applePayButton,
        containerStyle: { backgroundColor: "#ffffff" },
        rounded: 3,
        dimensions: { w: 120, h: 25 },
        imageStyle: { width: 80, height: 20 }
      };
    case "bitPay":
      return {
        label: "BitPay",
        icon: logos.bitPayButton,
        containerStyle: { backgroundColor: "#1A3B8B" },
        rounded: 5,
        dimensions: { w: 140, h: 35 },
        imageStyle: { width: 90, height: 22 }
      };
    case "payPal":
      return {
        label: "PayPal",
        icon: logos.payPalButton,
        containerStyle: { backgroundColor: "#0070BA" },
        rounded: 50,
        dimensions: { w: 150, h: 35 },
        imageStyle: { width: 110, height: 18 }
      };
    case "venmo":
      return {
        label: "Venmo",
        icon: logos.venmoButton,
        containerStyle: { backgroundColor: "#3D95CE" },
        rounded: 5,
        dimensions: { w: 141, h: 36 },
        imageStyle: { width: 45, height: 20 }
      };
    default:
      console.warn(`Unknown payment type: ${selectedPaymentMethod}`);
      return {
        label: "Purchase",
        containerStyle: {
          backgroundColor: "#e5e7eb",
          borderColor: "#d1d5db",
          borderWidth: 2
        },
        text: "text-black",
        rounded: 100,
        dimensions: { w: 160, h: 50 }
      };
  }
};

const PaymentButton = ({
  selectedPaymentMethod = "default",
  disabled = false,
  onPress
}: PaymentButtonProps) => {
  const { label, icon, text, containerStyle, rounded, dimensions, imageStyle } =
    getTypeDetails(selectedPaymentMethod);

  const animatedHeight = useRef(new Animated.Value(dimensions.h)).current;
  const animatedWidth = useRef(new Animated.Value(dimensions.w)).current;
  const animatedBorderRadius = useRef(new Animated.Value(rounded)).current;

  useEffect(() => {
    const { rounded, dimensions } = getTypeDetails(selectedPaymentMethod);

    Animated.parallel([
      Animated.timing(animatedHeight, {
        toValue: dimensions.h,
        duration: 50,
        useNativeDriver: false
      }),
      Animated.timing(animatedWidth, {
        toValue: dimensions.w,
        duration: 50,
        useNativeDriver: false
      }),
      Animated.timing(animatedBorderRadius, {
        toValue: rounded,
        duration: 50,
        useNativeDriver: false
      })
    ]).start();
  }, [selectedPaymentMethod]);

  return (
    <Animated.View
      style={[
        {
          height: animatedHeight,
          width: animatedWidth,
          borderRadius: animatedBorderRadius,
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 16,
          flexDirection: "row",
          opacity: disabled ? 0.4 : 1
        },
        containerStyle
      ]}
    >
      <Pressable
        onPress={onPress}
        disabled={disabled}
        style={StyleSheet.absoluteFill}
      >
        <View
          style={{
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {icon ? (
            <Image
              source={icon}
              style={imageStyle ?? { width: 80, height: 24 }}
              resizeMode="contain"
            />
          ) : (
            <Text
              className={`font-gordita-bold text-base ${text ?? "text-white"}`}
            >
              {label}
            </Text>
          )}
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default PaymentButton;
