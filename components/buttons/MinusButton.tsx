import { icons } from "@/constants";
import React from "react";
import { Image, Pressable } from "react-native";

type MinusButtonProps = {
  onPress: () => void;
  disabled?: boolean;
  size?: "S" | "M" | "L";
};

const sizeStyles = {
  S: "h-6 w-6",
  M: "h-10 w-10",
  L: "h-14 w-14"
};

const MinusButton = ({ onPress, disabled, size = "M" }: MinusButtonProps) => {
  const dimensions = sizeStyles[size];
  return (
    <Pressable className={dimensions} onPress={disabled ? undefined : onPress}>
      <Image
        className={dimensions}
        resizeMode="contain"
        source={!disabled ? icons.minus : icons.minusDisabled}
      />
    </Pressable>
  );
};

export default MinusButton;
