import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";

type PaymentButtonProps = {
  onPressIn?: () => void;
  onPressOut?: () => void;
  text: string;
  image: ImageSourcePropType;
  className?: string;
};

const PaymentButton = ({
  onPressIn,
  onPressOut,
  text,
  image,
  className
}: PaymentButtonProps) => {
  const bgRadius = useRef(new Animated.Value(0)).current;
  const clickPoint = useRef(new Animated.ValueXY()).current;
  const bgTwoOpacity = useRef(new Animated.Value(0)).current;
  const buttonRadiusAnim = useRef(new Animated.Value(0)).current;
  const buttonColorAnim = useRef(new Animated.Value(0)).current;
  const [buttonDown, setButtonDown] = useState(false);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    Animated.timing(bgRadius, {
      toValue: buttonDown ? 1000 : 0,
      duration: 200,
      useNativeDriver: true
    }).start();
  }, [buttonDown]);

  const handlePressIn = (e: GestureResponderEvent) => {
    const { locationX, locationY } = e.nativeEvent;
    clickPoint.setValue({ x: locationX, y: locationY });
    setButtonDown(true);

    Animated.timing(bgTwoOpacity, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false
    }).start();
  };

  const handlePressOut = () => {
    setButtonDown(false);
    setSelected(true);
    if (onPressOut) {
      onPressOut();
    }
    Animated.timing(bgTwoOpacity, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false
    }).start();

    Animated.timing(buttonRadiusAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false
    }).start();

    Animated.timing(buttonColorAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false
    }).start();
  };

  const bgTwoColor = bgTwoOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(255,255,255,0.0)", "rgba(255,255,255,0.1)"]
  });

  const buttonRadius = buttonRadiusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 8]
  });

  const buttonColor = buttonColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["white", "#00A8E1"]
  });

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      className={`${className} py-2 w-full overflow-hidden`}
    >
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            backgroundColor: bgTwoColor
          }
        ]}
        pointerEvents="none"
      />

      <View className="flex-row items-center px-4">
        <View
          className="items-center justify-center mr-6"
          style={[{ position: "relative" }]}
        >
          <Animated.View
            className="h-5 w-5 rounded-full absolute"
            style={[{ backgroundColor: buttonColor }]}
          />
          <View className="h-3.5 w-3.5 bg-black rounded-full absolute z-10" />
          <Animated.View
            className="rounded-full absolute z-10"
            style={[
              {
                height: buttonRadius,
                width: buttonRadius,
                backgroundColor: buttonColor
              }
            ]}
          />
        </View>
        <Image source={image} className="h-[35px] w-[55px] mr-2" />
        <Text className="font-gordita-bold text-white">{text}</Text>
      </View>
    </Pressable>
  );
};

export default PaymentButton;
