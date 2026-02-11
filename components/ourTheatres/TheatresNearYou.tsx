import { icons } from "@/constants";
import { useBottomSheet } from "@/context/BottomSheetContext";
import { TheatreDataContext } from "@/context/theatreDataContext";
import React, { useContext } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import Map from "../Map";
import OurTheatresBottomSheet from "./OurTheatresBottomSheet";

const TheatresNearYou = () => {
  const { bottomSheetRef: bottomSheetRef } = useBottomSheet();
  const { userLocation } = useContext(TheatreDataContext);
  
  // Extract city and state from full address (e.g., "123 Main St, New York, NY 10001, USA")
  const getShortLocation = (address?: string) => {
    if (!address) return "Loading...";
    
    const parts = address.split(",");
    if (parts.length >= 3) {
      // Return "City, State" format
      return `${parts[parts.length - 3].trim()}, ${parts[parts.length - 2].trim()}`;
    }
    return address;
  };
  
  return (
    <SafeAreaView className="flex-1">
      <View className="flex bg-gray-450">
        <View className="flex-row justify-between items-center p-4">
          <View className="flex-row">
            <Image source={icons.targetWhite} className="h-5 w-5" />
            <Text className="font-gordita-regular text-white pl-3">
              {getShortLocation(userLocation)}
            </Text>
          </View>
          <Text className="font-gordita-bold text-blue-100">
            Change Location
          </Text>
        </View>
      </View>

      <Map />

      <OurTheatresBottomSheet
        initialSnapIndex={1}
        bottomSheetRef={bottomSheetRef}
      />
    </SafeAreaView>
  );
};

export default TheatresNearYou;
