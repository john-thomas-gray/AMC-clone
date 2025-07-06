import { PurchasesContext } from "@/context/PurchasesContext";
import { TheatreDataContext } from "@/context/theatreDataContext";
import { getCurrentDate } from "@/utils/dateAndTime";
import { ExternalPathString, RelativePathString, useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import BackButton from "../buttons/BackButton";
import XButton from "../buttons/XButton";
import CountdownTimer from "../CountdownTimer";

type PaymentHeaderProps = {
  to?: RelativePathString | ExternalPathString | undefined;
};

const PaymentHeader = ({ to }: PaymentHeaderProps) => {
  const purchasesContext = useContext(PurchasesContext);
  if (!purchasesContext) {
    throw new Error("PurchasesContext must be used within PurchasesProvider");
  }
  const { resetSelectedSeats } = purchasesContext;

  const { selectedSession } = useContext(TheatreDataContext);

  const router = useRouter();

  const [timerCount, setTimerCount] = useState(420);

  const theatreName = selectedSession?.theatre?.name ?? "Theatre";
  const movieTitle = selectedSession?.screen.movie.title ?? "Movie";
  const showtime = selectedSession?.showtime ?? "";
  const projector = selectedSession?.screen.type.projector ?? "";
  const id = selectedSession?.screen.movie.id ?? "Ghostbusters";
  const details = [theatreName, getCurrentDate(), showtime, projector];

  useEffect(() => {}, []);

  useEffect(() => {
    if (timerCount === 0) {
      router.push({
        pathname: "/movies/[id]",
        params: { id: id.toString() }
      });
    }
  }, [timerCount]);

  return (
    <View className="bg-black h-[18%] flex-row justify-between items-center px-4 pt-[67] border border-red pb-[12]">
      <BackButton className="" to={to} />

      <View className="w-[265] px-2">
        <Text className="text-white font-gordita-bold text-3xl">
          {movieTitle}
        </Text>
        <View>
          <Text className="text-white font-gordita-reguler">
            {details.filter(Boolean).join(" | ")}
          </Text>
        </View>
      </View>
      <View className="mt-[35] mr-6">
        <CountdownTimer />
      </View>
      <XButton
        onPress={() => {
          resetSelectedSeats();
          router.push({
            pathname: "/movies/[id]",
            params: { id: id.toString() }
          });
        }}
      />
    </View>
  );
};

export default PaymentHeader;
