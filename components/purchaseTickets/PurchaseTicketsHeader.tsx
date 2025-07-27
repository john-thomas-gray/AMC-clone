import { PurchasesContext } from "@/context/PurchasesContext";
import { ExternalPathString, RelativePathString, useRouter } from "expo-router";
import React, { useContext } from "react";
import { Text, View } from "react-native";
import BackButton from "../buttons/BackButton";
import XButton from "../buttons/XButton";

type PurchaseTicketsHeaderProps = {
  movieTitle: string;
  details: string;
  id: string;
  to?: RelativePathString | ExternalPathString;
  onPress?: () => void;
};

const PurchaseTicketsHeader = ({
  movieTitle,
  details,
  id,
  to,
  onPress
}: PurchaseTicketsHeaderProps) => {
  const { resetSelectedTickets, resetSelectedSeats } =
    useContext(PurchasesContext)!;
  const router = useRouter();
  return (
    <View className="bg-black h-[18%] flex-row justify-between items-center px-4 pt-[67] border border-red pb-[12]">
      <BackButton className="" to={to} />

      <View className="w-[265] px-2">
        <Text className="text-white font-gordita-bold text-3xl">
          {movieTitle}
        </Text>
        <View>
          <Text className="text-white font-gordita-reguler">{details}</Text>
        </View>
      </View>

      <XButton
        onPress={() => {
          resetSelectedTickets();
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

export default PurchaseTicketsHeader;
