import React from 'react';
import { Image, ImageSourcePropType, TouchableOpacity } from "react-native";

const HandleClick = (link: string) => {
  console.log(`Navigating to: ${link}`);
}

const HeaderButton = ({ icon, link, additionalStyles }: { icon: ImageSourcePropType; link: string; additionalStyles?: string }) => {
  return (
    <TouchableOpacity onPress={() => HandleClick(link)} className={`${additionalStyles} flex items-center justify-center`}>
      <Image source={icon} className="w-8 h-8" />
    </TouchableOpacity>
  )
}

export default HeaderButton
