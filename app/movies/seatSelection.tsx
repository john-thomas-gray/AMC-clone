import BackButton from "@/components/buttons/BackButton";
import XButton from "@/components/buttons/XButton";
import { getCurrentDate } from "@/utils/date";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

type SeatSelectionProps = {
  children: React.ReactNode;
};

const SeatSelection = ({ children }: SeatSelectionProps) => {
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
      <View className="bg-red-500 h-[18%] flex-row justify-between px-4 pt-[90]">
        <BackButton className="" />

        <View className="w-[265] px-2">
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
