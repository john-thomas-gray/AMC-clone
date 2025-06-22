import { IconButtonProps } from '@/types/type';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

export const IconButton = ({ icon, title, onPress }: IconButtonProps & { onPress?: () => void }) => (
  <Pressable onPress={onPress}>
    <View className="flex-col items-center justify-start w-20">
      <Image source={icon} className="h-6 w-6 mb-3" resizeMode="contain" />
      <Text className="text-white font-gordita-regular">{title}</Text>
    </View>
  </Pressable>
);
