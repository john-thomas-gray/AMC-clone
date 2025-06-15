import { icons } from "@/constants";
import { useBottomSheet } from "@/context/BottomSheetContext";
import React from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';
import Map from "../Map";
import OurTheatresBottomSheet from "./OurTheatresBottomSheet";

const TheatresNearYou = () => {
  const { bottomSheetRef: bottomSheetRef } = useBottomSheet();
  return (
    <SafeAreaView className="flex-1">
      <View className="flex bg-gray-450">
        <View className="flex-row justify-between items-center p-4">
          <View className="flex-row">
            <Image source={icons.targetWhite} className="h-5 w-5"/>
            <Text className="font-gordita-regular text-white pl-3">San Francisco, CA</Text>
          </View>
          <Text className="font-gordita-bold text-blue-100">Change Location</Text>
        </View>
      </View>

      <Map />

      <OurTheatresBottomSheet
        initialSnapIndex={1}
        bottomSheetRef={bottomSheetRef}
      />

    </SafeAreaView>
  )
}

export default TheatresNearYou
