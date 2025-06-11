import React from 'react';
import { Image, TouchableOpacity } from "react-native";
import { HeaderButtonProps } from "../../types/type";

const HandleClick = (link: string) => {
  console.log(`Navigating to: ${link}`);
}

const HeaderButton = ({ icon, link, additionalStyles }: HeaderButtonProps) => {
  return (
    <TouchableOpacity onPress={() => HandleClick(link)} className={`${additionalStyles} flex items-center justify-center`}>
      <Image source={icon} className="w-8 h-8" />
    </TouchableOpacity>
  )
}

export default HeaderButton
