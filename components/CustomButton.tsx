import React from 'react';
import { Pressable, Text } from 'react-native';
import { ButtonProps } from '../types/type';

const getVariant = (variant: ButtonProps['variant']) => {
  switch (variant) {
    case 'red':
      return {
        container: 'bg-red-500 border-red-500',
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
  className,
  ...props
}: ButtonProps) => {
  return (

    <Pressable
      onPress={onPress}
      style={{ height: 46 }}
      className={`flex flex-row items-center justify-center border rounded-full
      ${getVariant(variant).container} ${className} px-5`}
      {...props}>
      {IconLeft && <IconLeft/>}
      <Text  className={`font-gordita-bold text-lg ${getVariant(variant).text}`}>{title}</Text>
      {IconRight && <IconRight/>}
    </Pressable>
  )
}

export default CustomButton
