import { icons } from "@/constants";
import { PurchasesContext } from "@/context/PurchasesContext";
import React, { useContext } from "react";
import { Image, Pressable, Text, View } from "react-native";

type CartButtonProps = {
  onPress: () => void;
};

const CartButton = ({ onPress }: CartButtonProps) => {
  const context = useContext(PurchasesContext);

  if (!context) {
    throw new Error("CartButton must be used within a PurchasesProvider");
  }

  const { cartCostTotal, cartItemCount } = context;
  return (
    <Pressable className="w-[140] flex-row items-center" onPress={onPress}>
      <View className="h-10 w-10 relative">
        <Image source={icons.cart} resizeMode="contain" className="h-10 w-10" />
        <View className="absolute inset-1 items-center justify-center ml-2 mb-1">
          <Text className="text-white font-gordita-regular">
            {cartItemCount}
          </Text>
        </View>
      </View>

      <Text className="text-white font-gordita-regular ml-2">
        ${cartCostTotal.toFixed(2)}
      </Text>
    </Pressable>
  );
};

export default CartButton;
