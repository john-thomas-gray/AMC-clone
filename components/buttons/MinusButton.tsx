import { icons } from "@/constants";
import React from "react";
import { Image, Pressable } from "react-native";

type MinusButtonProps = {
  onPress: () => void;
  disabled?: boolean;
};

const MinusButton = ({ onPress, disabled }: MinusButtonProps) => {
  return (
    <Pressable>
      <Image source={!disabled ? icons.minus : icons.minusDisabled} />
    </Pressable>
  );
};

export default MinusButton;
