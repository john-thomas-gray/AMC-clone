import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { icons } from '../../constants/index';

type BottomSheetButtonProps = {
  title: string;
  onPress: () => void;
}

const BottomSheetButton = ({ title, onPress }: BottomSheetButtonProps) => {
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View>
      <Pressable className=
      {`flex-row justify-between items-center rounded-lg px-3 py-4 w-full
        ${isFocused ? 'border-2 border-white' : ''}`}

        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
        onPress={() => {
          onPress();
          setIsFocused(true);
        }}
        // onPressOut={() => setIsFocused(false)}
      >
        <Text className="text-white text-lg font-gordita-regular">
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
