import { icons, images } from "@/constants";
import React from "react";
import { Image, Text, View } from "react-native";

const Auditorium = () => {
  const pairs = [
    {
      icon: icons.seat,
      text: "Traditional Seat"
    },
    {
      icon: icons.wheelchair,
      text: "Wheelchair"
    },
    {
      icon: icons.companion,
      text: "Companion"
    },
    {
      icon: icons.available,
      text: "Available"
    },
    {
      icon: icons.selected,
      text: "Selected"
    },
    {
      icon: icons.occupied,
      text: "Occupied"
    }
  ];

  const seatTypes = pairs.map((pair, index) => (
    <View key={index} className="flex-row items-center">
      <View className="h-5 w-5">
        <Image source={pair.icon} className="h-5 w-5" resizeMode="contain" />
      </View>
      <Text className="text-white font-gordita-regular pl-1">{pair.text}</Text>
    </View>
  ));

  const firstRow = seatTypes.slice(0, 3);
  const secondRow = seatTypes.slice(3, 6);

  return (
    <View className="flex-1 bg-red">
      <View className="items-center">
        <Image
          source={images.screen}
          resizeMode="contain"
          className="w-[90%]"
        />
      </View>
      <View className="flex-1 justify-end">
        <View className="items-center mx-4">
          <View className="w-full bg-black border-t border-gray-300">
            <View className="flex-row justify-between px-4 pb-4 pt-4">
              {firstRow}
            </View>
            <View className="flex-row justify-between px-8 pb-4">
              {secondRow}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Auditorium;
