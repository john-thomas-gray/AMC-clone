import BackButton from "@/components/buttons/BackButton";
import CustomButton from "@/components/buttons/CustomButton";
import { IconButton } from "@/components/buttons/IconButton";
import XButton from "@/components/buttons/XButton";
import { icons } from "@/constants";
import { getCurrentDate } from "@/utils/date";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import Auditorium from "./seatSelection/auditorium";

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
      <View className="bg-black h-[18%] flex-row justify-between items-center px-4 pt-[90]">
        <BackButton className="" />

        <View className="w-[265] px-2">
          <Text className="text-white font-gordita-bold text-3xl">
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
      <View className="flex-row w-full items-center justify-between pl-3 pr-5 pt-2 pb-3 bg-purple-100">
        <Text className="flex-1 text-white font-gordita-reguler text-lg text-left pr-4 leading-tight">
          Sign in to take advantage of AMC Stubs benefits, including waived fees
          as applicable.
        </Text>
        <CustomButton
          title="Sign In"
          variant="transparent"
          bold={true}
          textStyle="text-sm"
          onPress={() => console.log("Sign In button pressed")}
        />
      </View>
      <Auditorium />
      {children}
      <View className="flex-1 justify-end">
        <View className="justify-between items-center px-4 pt-4 pb-8 flex-row border-t border-gray-300">
          <View className="h-5 w-5">
            <IconButton
              icon={icons.upload}
              onPress={() => {
                console.log("upload pressed");
              }}
              iconStyle="h-4 w-4"
            />
          </View>
          <CustomButton
            variant="white"
            title="Continue"
            bold={true}
            onPress={() => console.log("continue")}
          />
        </View>
      </View>
    </View>
  );
};

export default SeatSelection;
