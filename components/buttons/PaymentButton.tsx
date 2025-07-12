import React from "react";
import { Image, Pressable, Text, View } from "react-native";

type PaymentButtonProps = {
  text: string;
  image: Image;
  className?: string;
};

const PaymentButton = ({ text, image, className }: PaymentButtonProps) => {
  return (
    <Pressable className={`flex-row items-center ${className}`}>
      <View className="relative items-center justify-center ml-2 mr-6">
        <View className="h-5 w-5 bg-white rounded-[50]"></View>
        <View className="h-3.5 w-3.5 bg-black rounded-[50] absolute z-10"></View>
      </View>
      <Image source={image} className="h-[35] w-[55] mr-2" />
      <Text className="font-gordita-bold text-white">{text}</Text>
    </Pressable>
  );
};

export default PaymentButton;
