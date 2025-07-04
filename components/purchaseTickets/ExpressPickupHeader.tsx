import { formatTime } from "@/utils/dateAndTime";
import {
  ExternalPathString,
  RelativePathString,
  useLocalSearchParams,
  useRouter
} from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import BackButton from "../buttons/BackButton";

type ExpressPickupHeaderProps = {
  to?: RelativePathString | ExternalPathString;
};

const ExpressPickupHeader = ({ to }: ExpressPickupHeaderProps) => {
  const { id, movieTitle, theatreName, showtime, projector, details } =
    useLocalSearchParams();

  const router = useRouter();

  const [timerCount, setTimerCount] = useState(4200);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimerCount(prevCount => {
        if (prevCount <= 1) {
          clearInterval(interval);
          console.log(id);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timerCount === 0) {
      router.push({
        pathname: "/movies/[id]",
        params: {
          id: Array.isArray(id) ? id[0] : id?.toString(),
          movieTitle,
          theatreName,
          showtime,
          projector,
          details
        }
      });
    }
  }, [timerCount]);

  return (
    <View className="bg-black h-[18%] flex-row justify-between items-center px-4 pt-[67] border border-red pb-[12]">
      <BackButton className="" to={to} />

      <View className="w-[265] px-2">
        <Text className="text-white font-gordita-bold text-3xl">
          Express Pick-Up
        </Text>
        <View>
          <Text className="text-white font-gordita-reguler">{theatreName}</Text>
        </View>
      </View>

      <View className="w-[34] border-red-500 border items-end">
        <Text className="text-white font-gordita-reguler">
          {formatTime(timerCount)}
        </Text>
      </View>
    </View>
  );
};

export default ExpressPickupHeader;
