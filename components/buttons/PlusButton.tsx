import { icons } from "@/constants";
import React from "react";
import { Image, Pressable } from "react-native";

type PlusButtonProps = {
  onPress: () => void;
  disabled?: boolean;
};

const PlusButton = ({ onPress, disabled }: PlusButtonProps) => {
  return (
    <Pressable>
      <Image source={!disabled ? icons.plus : icons.plusDisabled} />
    </Pressable>
  );
};

export default PlusButton;
