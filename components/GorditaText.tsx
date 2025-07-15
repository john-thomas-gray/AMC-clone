import React, { ReactNode } from "react";
import { Text, TextProps } from "react-native";

type GorditaTextProps = {
  children: ReactNode;
  className?: string;
} & TextProps;

const GorditaText = ({
  children,
  className = "",
  ...props
}: GorditaTextProps) => {
  return (
    <Text className={`font-gordita-regular text-white ${className}`} {...props}>
      {children}
    </Text>
  );
};

export default GorditaText;
