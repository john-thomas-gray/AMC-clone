import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { icons } from '../../constants/index';

type BottomSheetButtonProps = {
  title: string;
  onPress?: () => void;
}

const BottomSheetButton = ({ title, onPress }: BottomSheetButtonProps) => {
  return (
    <View>
      <Pressable className="flex-row justify-between items-center rounded-lg px-3 py-4"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
        onPress={onPress}
      >
        <Text className="text-white text-lg text-garamond-regular">
          {title}
        </Text>
        <Image
          source={icons.dropdownIconWhite}
          className="w-3 h-3 ml-2"
        />
      </Pressable>
    </View>
  )
}

export default BottomSheetButton
