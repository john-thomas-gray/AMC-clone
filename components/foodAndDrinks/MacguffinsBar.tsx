import React from "react";
import { Image, ImageBackground, Text, View } from "react-native";
import { backgrounds, banners } from "../../constants/index";
import { useBottomSheet } from "../../context/BottomSheetContext";
import BottomSheetButton from "../buttons/BottomSheetButton";
import CustomButton from "../buttons/CustomButton";

const MacguffinsBar = () => {
  const { bottomSheetRef: bottomSheetRef } = useBottomSheet();
  const { selectedTheatre } = useBottomSheet();
  return (
    <ImageBackground
      source={backgrounds.redOrangeGradient}
      resizeMode="cover"
      className="flex-1 h-full w-full"
    >
      <View className="flex-1 items-center ">
        {/* Top Banner */}
        <View className="flex w-full h-36 ">
          <Image source={banners.macguffinsBar} className="w-full h-full" />
        </View>

        {/* Select Theatre Button */}
        <View className="flex-row items-center w-full px-3 mt-2">
          <BottomSheetButton
            title={
              selectedTheatre.length > 0
                ? selectedTheatre
                : "Select a Participating Theatre"
            }
            onPress={() => {
              bottomSheetRef.current?.snapToIndex(1);
            }}
          />
        </View>

        {/* Content Box */}
        <View
          className="px-3 pt-0 pb-1 rounded-lg w-[95%] mt-6"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <View className="flex-row mt-1">
            <Text className="text-white text-3xl font-gordita-bold">
              MacGuffins
            </Text>
            <Text className="text-2xl text-white font-gordita-bold relative leading-none pt-2">
              ®
            </Text>
            <Text className="text-white text-3xl font-gordita-bold"> Bar</Text>
          </View>
          <Text className="text-white font-gordita-regular text-[16px] leading-snug mt-2 mb-1">
            Grown-ups need movie treats, too. At MacGuffins Bar, beer and wine
            are always ready to be poured, and select theatres even offer
            premium had-crafted beverages you can&apos;t find anywhere else. For
            guests 21+ only.
          </Text>
        </View>

        {/* Bottom Bar */}
        <View
          className="flex-row bg-black justify-start items-center w-full h-[11%]
          border-t border-gray-300 px-4 mt-[166px] relative"
        >
          <CustomButton
            title="Featured Drinks"
            bold={true}
            onPress={() => console.log("Featured Drinks Pressed")}
            variant="black"
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default MacguffinsBar;
