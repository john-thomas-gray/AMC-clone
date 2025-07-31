import XButton from "@/components/buttons/XButton";
import { PurchasesContext } from "@/context/PurchasesContext";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { Text, View } from "react-native";

type YoureAllSetProps = {
  onPress?: () => void;
};

const YoureAllSet = ({ onPress }: YoureAllSetProps) => {
  const { resetSelectedTickets, resetSelectedSeats } =
    useContext(PurchasesContext)!;

  const router = useRouter();
  return (
    <View className="bg-black h-[13.5%] flex-row justify-between items-center pt-[70]">
      <View className="w-[265]">
        <Text className="text-white font-gordita-bold text-3xl">
          You&apos;re All Set
        </Text>
      </View>

      <XButton
        onPress={() => {
          resetSelectedTickets();
          resetSelectedSeats();
          //Reset all purchase context values

          router.push({
            pathname: "/(tabs)/home"
          });
        }}
      />
    </View>
  );
};

export default YoureAllSet;
