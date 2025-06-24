import { IconButtonProps } from '@/types/type';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

export const IconButton = ({ icon, title, width, style, onPress }: IconButtonProps & { onPress?: () => void }) => (
  <Pressable onPress={onPress} className={`flex border border-red-500 items-center ${style} `}>
    <View className={`items-center justify-start ${width ? `w-${width}` : 'w-22'}`}>
      <Image source={icon} className="h-6 w-6 mb-3" resizeMode="contain" />
      <Text className="text-white font-gordita-regular text-center">{title}</Text>
    </View>
  </Pressable>
);
