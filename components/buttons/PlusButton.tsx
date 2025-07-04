import { icons } from "@/constants";
import React from "react";
import { Image, Pressable } from "react-native";

type PlusButtonProps = {
  onPress: () => void;
  disabled?: boolean;
  size?: "S" | "M" | "L";
};

const sizeStyles = {
  S: "h-6 w-6",
  M: "h-10 w-10",
  L: "h-14 w-14"
};

const PlusButton = ({ onPress, disabled, size = "M" }: PlusButtonProps) => {
  const dimensions = sizeStyles[size];

  return (
    <Pressable className={dimensions} onPress={disabled ? undefined : onPress}>
      <Image
        className={dimensions}
        resizeMode="contain"
        source={!disabled ? icons.plus : icons.plusDisabled}
      />
    </Pressable>
  );
};

export default PlusButton;
