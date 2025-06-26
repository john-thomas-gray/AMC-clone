import BackButton from "@/components/buttons/BackButton";
import XButton from "@/components/buttons/XButton";
import { getCurrentDate } from "@/utils/date";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const SeatSelection = ({ children }: React.ReactNode) => {
  const router = useRouter();

  const {
    id,
    movieTitle,
    theatreName,
    showtime,
    projector,
    seatCount,
    screenFeatures
  } = useLocalSearchParams();

  const details = [theatreName, getCurrentDate(), showtime, projector]
    .filter(Boolean)
    .join(" | ");

  return (
    <View className="flex-1 bg-black">
      <View className="bg-red-500 w-full h-[18.5%] flex-row items-center px-4 pt-8">
        <BackButton className="border border-black" />
        <View className="w-[80%]">
          <Text className="text-white font-gordita-bold text-2xl">
            {movieTitle}
          </Text>
          <View>
            <Text className="text-white font-gordita-reguler">{details}</Text>
          </View>
        </View>
        <XButton
          onPress={() =>
            router.push({
              pathname: "/movies/[id]",
              params: { id: id.toString() }
            })
          }
        />
      </View>
      {children}
    </View>
  );
};

export default SeatSelection;
