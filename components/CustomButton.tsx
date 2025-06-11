import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { ButtonProps } from '../types/type';

const getVariant = (variant: ButtonProps['variant']) => {
  switch (variant) {
    case 'red':
      return {
        container: 'bg-red-200 border-red-200',
        text: 'text-white',
      };
    case 'white':
      return {
        container: 'bg-white border-white',
        text: 'text-black',
      };
    case 'black':
      return {
        container: 'bg-black border-white',
        text: 'text-white',
      };
    case 'transparent':
      return {
        container: 'bg-transparent border-white',
        text: 'text-white',
      };
    case 'transparent-black':
      return {
        container: 'bg-transparent border-black',
        text: 'text-black',
      };
    default:
      return {
        container: '',
        text: '',
      };
  }
};


const CustomButton = ({
  title,
  onPress,
  variant,
  IconLeft = undefined,
  IconRight = undefined,
  className = '',
  ...props
}: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={{ height: 38 }}
      className={`flex flex-row items-center border rounded-full
        ${getVariant(variant).container} px-4 ${className}`}
      {...props}
    >
      {IconLeft && <View className="mr-2">{<IconLeft />}</View>}

      <Text
        className={`flex-grow text-center font-gordita-bold ${getVariant(variant).text}`}
      >
        {title}
      </Text>

      {IconRight && <View className="ml-2">{<IconRight />}</View>}
    </Pressable>
  )
}


export default CustomButton
