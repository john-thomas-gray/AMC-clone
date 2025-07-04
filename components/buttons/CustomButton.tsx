import React from "react";
import { Pressable, Text, View } from "react-native";
import { ButtonProps } from "../../types/type";

const getVariant = (variant: ButtonProps["variant"]) => {
  switch (variant?.toLowerCase()) {
    case "red":
      return {
        container: "bg-red-200 border-red-200",
        text: "text-white"
      };
    case "white":
      return {
        container: "bg-white border-white",
        text: "text-black"
      };
    case "black":
      return {
        container: "bg-black border-white",
        text: "text-white"
      };
    case "transparent":
      return {
        container: "bg-transparent border-white",
        text: "text-white"
      };
    case "transparent-black":
      return {
        container: "bg-transparent border-black",
        text: "text-black"
      };
    case "inactive":
      return {
        container: "bg-gray-200 border-gray-200",
        text: "text-black"
      };
    default:
      throw new Error("Illegal variant.");
  }
};

const CustomButton = ({
  title,
  onPress,
  variant,
  bold,
  disabled = false,
  IconLeft = undefined,
  IconRight = undefined,
  textStyle = "",
  className = "",
  ...props
}: ButtonProps) => {
  const variantStyles = getVariant(variant);

  const disabledStyles = {
    container: "bg-gray-300 border-gray-300",
    text: "text-gray-500"
  };

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      style={{ height: 38 }}
      className={`flex flex-row items-center border rounded-full px-4 ${className} ${
        disabled ? disabledStyles.container : variantStyles.container
      }`}
      {...props}
    >
      {IconLeft && <View className="mr-2">{<IconLeft />}</View>}

      <Text
        className={`flex-grow text-center ${
          disabled ? disabledStyles.text : variantStyles.text
        } ${bold ? "font-gordita-bold" : "font-gordita-regular"} ${textStyle}`}
      >
        {title}
      </Text>

      {IconRight && <View className="ml-2">{<IconRight />}</View>}
    </Pressable>
  );
};

export default CustomButton;
