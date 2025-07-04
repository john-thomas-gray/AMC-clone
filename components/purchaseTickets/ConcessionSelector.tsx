import { images } from "@/constants";
import React from "react";
import { Image, Text, View } from "react-native";
import Counter from "./Counter";

type ConcessionSelectorProps = {
  cost: number;
  item: string;
  image?: number;
  count: number;
  setConcessionCount: React.Dispatch<React.SetStateAction<number>>;
};

const ConcessionSelector = ({
  cost = 0,
  item = "",
  count = 0,
  image = images.defaultConcessions,
  setConcessionCount
}: ConcessionSelectorProps) => {
  return (
    <View className="h-20 items-center justify-between mb-6">
      <View className="mx-4 flex-row justify-between items-center">
        <View className="h-[60px] w-[60px]">
          <Image source={image} className="h-[60px] w-[60px]" />
        </View>

        <View className="px-4 w-[60%]">
          <Text className="text-white text-xl font-gordita-bold pb-2 leading-[1.1] mb-1">
            {item}
          </Text>
          <Text className="text-white text-md font-gordita-bold">${cost}</Text>
        </View>

        <Counter count={count} setCount={setConcessionCount} size="S" />
      </View>
    </View>
  );
};

export default ConcessionSelector;
