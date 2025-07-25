import XButton from "@/components/buttons/XButton";
import { PurchasesContext } from "@/context/PurchasesContext";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { Text, View } from "react-native";

type YoureAllSetProps = {
  id: number;
  onPress?: () => void;
};

const YoureAllSet = ({ id, onPress }: YoureAllSetProps) => {
  const { resetSelectedSeats } = useContext(PurchasesContext)!;

  const router = useRouter();
  return (
    <View className="bg-black h-[16%] flex-row justify-between items-center pt-[67] border border-red">
      <View className="w-[265]">
        <Text className="text-white font-gordita-bold text-3xl">
          You&apos;re All Set
        </Text>
      </View>

      <XButton
        onPress={() => {
          resetSelectedSeats();
          if (onPress) {
            onPress();
          }
          router.push({
            pathname: "/movies/[id]",
            params: { id: id.toString() }
          });
        }}
      />
    </View>
  );
};

export default YoureAllSet;
