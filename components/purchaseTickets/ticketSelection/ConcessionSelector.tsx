import Counter from "@/components/purchaseTickets/Counter";
import { images } from "@/constants";
import { ConcessionItem } from "@/context/PurchasesContext";
import React from "react";
import { Image, Text, View } from "react-native";

type ConcessionSelectorProps = {
  title: string;
  description: string;
  price: number;
  image?: number;
  selectedConcessions: ConcessionItem[];
  setSelectedConcessions: React.Dispatch<
    React.SetStateAction<ConcessionItem[]>
  >;
};

const ConcessionSelector = ({
  title,
  description,
  price,
  image = images.defaultConcessions,
  selectedConcessions,
  setSelectedConcessions
}: ConcessionSelectorProps) => {
  const existingItem = selectedConcessions.find(item => item.title === title);
  const count = existingItem?.count ?? 0;

  const setCount = (value: React.SetStateAction<number>) => {
    setSelectedConcessions(prev => {
      const newCount = typeof value === "function" ? value(count) : value;
      if (newCount <= 0) {
        return prev.filter(item => item.title !== title);
      }

      const updated = [...prev];
      const index = updated.findIndex(item => item.title === title);
      const newItem: ConcessionItem = {
        title,
        description,
        cost: price,
        count: newCount
      };

      if (index !== -1) {
        updated[index] = newItem;
      } else {
        updated.push(newItem);
      }

      return updated;
    });
  };

  return (
    <View className="h-20 items-center justify-between mb-6">
      <View className="mx-4 flex-row justify-between items-center">
        <View className="h-[60px] w-[60px]">
          <Image source={image} className="h-[60px] w-[60px]" />
        </View>

        <View className="px-4 w-[60%]">
          <Text className="text-white text-xl font-gordita-bold pb-2 leading-[1.1] mb-1">
            {title}
          </Text>
          <Text className="text-white text-sm font-gordita-regular">
            {description}
          </Text>
          <Text className="text-white text-md font-gordita-bold mt-1">
            ${price.toFixed(2)}
          </Text>
        </View>

        <Counter count={count} setCount={setCount} size="S" />
      </View>
    </View>
  );
};

export default ConcessionSelector;
