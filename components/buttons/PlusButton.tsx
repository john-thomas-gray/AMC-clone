import { icons } from "@/constants";
import React from "react";
import { Image, Pressable } from "react-native";

type PlusButtonProps = {
  onPress: () => void;
  disabled?: boolean;
};

const PlusButton = ({ onPress, disabled }: PlusButtonProps) => {
  return (
    <Pressable className="h-10 w-10">
      <Image
        className="h-10 w-10"
        resizeMode="contain"
        source={!disabled ? icons.plus : icons.plusDisabled}
      />
    </Pressable>
  );
};

export default PlusButton;
