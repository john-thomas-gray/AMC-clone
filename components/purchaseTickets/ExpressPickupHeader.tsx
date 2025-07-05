import { TheatreDataContext } from "@/context/theatreDataContext";
import { formatTime } from "@/utils/dateAndTime";
import { ExternalPathString, RelativePathString, useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import BackButton from "../buttons/BackButton";

type ExpressPickupHeaderProps = {
  to?: RelativePathString | ExternalPathString | undefined;
};

const ExpressPickupHeader = ({ to }: ExpressPickupHeaderProps) => {
  const { selectedSession } = useContext(TheatreDataContext);

  const router = useRouter();

  const [timerCount, setTimerCount] = useState(1);
  const theatreName = selectedSession?.theatre?.name ?? "Theatre";
  const id = selectedSession?.screen.movie.id ?? "Ghostbusters";

  useEffect(() => {
    const interval = setInterval(() => {
      setTimerCount(prevCount => {
        if (prevCount <= 1) {
          clearInterval(interval);
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
        pathname: `/movies/${id}`
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
