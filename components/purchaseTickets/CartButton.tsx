import { icons } from "@/constants";
import React from "react";
import { Image, Text, View } from "react-native";

type CartButtonProps = {
  itemCount?: number;
  costTotal?: number;
};

const CartButton = ({ itemCount = 0, costTotal = 0 }: CartButtonProps) => {
  return (
    <View className="h-10 w-10">
      <Image source={icons.cart} resizeMode="contain" className="h-10 w-10" />
      <Text>{itemCount}</Text>
    </View>
  );
};

export default CartButton;
