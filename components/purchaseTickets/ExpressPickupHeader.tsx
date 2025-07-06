import AlertModal from "@/components/AlertModal";
import { PurchasesContext } from "@/context/PurchasesContext";
import { TheatreDataContext } from "@/context/theatreDataContext";
import { TimerContext } from "@/context/TimerContext";
import { ExternalPathString, RelativePathString, useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { Text, View } from "react-native";
import BackButton from "../buttons/BackButton";
import CountdownTimer from "../CountdownTimer";

type ExpressPickupHeaderProps = {
  to?: RelativePathString | ExternalPathString | undefined;
};

const ExpressPickupHeader = ({ to }: ExpressPickupHeaderProps) => {
  const { resetSelectedSeats, resetSelectedTickets } =
    useContext(PurchasesContext);
  const { selectedSession } = useContext(TheatreDataContext);

  const router = useRouter();

  const theatreName = selectedSession?.theatre?.name ?? "Theatre";
  const id = selectedSession?.screen.movie.id ?? "Ghostbusters";
  const [modalVisible, setModalVisible] = useState(false);
  const handleTimerFinish = () => {
    setModalVisible(true);
    stopTimer();
    resetTimer();
    console.log("Timer finished");
  };
  const handleClose = () => {
    setModalVisible(false);
    resetSelectedSeats();
    resetSelectedTickets();
    router.push({
      pathname: "/movies/[id]",
      params: { id: selectedSession?.screen.movie.id.toString() ?? "" }
    });
  };

  const { startTimer, stopTimer, resetTimer } = useContext(TimerContext);

  return (
    <View className="bg-black h-[18%] flex-row justify-between items-center px-4 pt-[67] border border-red pb-[12]">
      <BackButton className="" to={to} />

      <AlertModal
        visible={modalVisible}
        onClose={() => handleClose()}
        title="Oops! Time is up."
        body="We had to release any reserved tickets or food & beverage items because the alloted time has expired."
      />

      <View className="w-[265] px-2">
        <Text className="text-white font-gordita-bold text-3xl">
          Express Pick-Up
        </Text>
        <View>
          <Text className="text-white font-gordita-reguler">{theatreName}</Text>
        </View>
      </View>

      <View className="w-[34] items-end">
        <CountdownTimer initialSeconds={420} onFinish={handleTimerFinish} />
      </View>
    </View>
  );
};

export default ExpressPickupHeader;
