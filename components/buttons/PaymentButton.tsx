import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  View
} from "react-native";

type PaymentButtonProps = {
  text: string;
  image: ImageSourcePropType;
  className?: string;
  onPress?: () => void;
};

const PaymentButton = ({ text, image, className }: PaymentButtonProps) => {
  const bgRadius = useRef(new Animated.Value(0)).current;
  const clickPoint = useRef(new Animated.ValueXY()).current;
  const [buttonDown, setButtonDown] = useState(false);

  useEffect(() => {
    Animated.timing(bgRadius, {
      toValue: buttonDown ? 1000 : 0,
      duration: 200,
      useNativeDriver: true
    }).start();
    console.log("buttonDown");
  }, [buttonDown]);

  const handlePressIn = (e: GestureResponderEvent) => {
    const { locationX, locationY } = e.nativeEvent;
    clickPoint.setValue({ x: locationX, y: locationY });
    setButtonDown(true);
    console.log(clickPoint);
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={() => setButtonDown(false)}
      className={`${buttonDown ? "bg-white/20" : ""} ${className} py-2 w-full`}
    >
      <Animated.View className="flex-row items-center ">
        <View className="relative items-center justify-center ml-2 mr-6">
          <View className="h-5 w-5 bg-white rounded-[50]"></View>
          <View className="h-3.5 w-3.5 bg-black rounded-[50] absolute z-10"></View>
        </View>
        <Image source={image} className="h-[35] w-[55] mr-2" />
        <Text className="font-gordita-bold text-white">{text} </Text>
      </Animated.View>
    </Pressable>
  );
};

export default PaymentButton;
