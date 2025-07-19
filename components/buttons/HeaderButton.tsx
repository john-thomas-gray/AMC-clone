import React from "react";
import { Image, Pressable } from "react-native";
import { HeaderButtonProps } from "../../types/type";

const HandleClick = (link: string) => {
  console.log(`Navigating to: ${link}`);
};

const HeaderButton = ({ icon, link, additionalStyles }: HeaderButtonProps) => {
  return (
    <Pressable
      onPress={() => HandleClick(link)}
      className={`${additionalStyles} flex items-center justify-center`}
    >
      <Image source={icon} className="w-8 h-8" />
    </Pressable>
  );
};

export default HeaderButton;
