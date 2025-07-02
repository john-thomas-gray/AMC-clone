import React from "react";
import { Text, View } from "react-native";
import TicketCounter from "./TicketCounter";

type TicketSelectorProps = {
  age: string;
  cost: number;
  fee: number;
  remainingTickets: number;
  setRemainingTickets: React.Dispatch<React.SetStateAction<number>>;
};

const TicketSelector = ({
  age,
  cost,
  fee,
  remainingTickets,
  setRemainingTickets
}: TicketSelectorProps) => {
  return (
    <View className="flex-row h-80 border border-red-500 items-start justify-between">
      <View>
        <Text className="text-white text-3xl font-gordita-bold pb-2">
          {age}
        </Text>
        {age === "Child" ? (
          <Text className="text-white font-gordita-regular">Age 2–12</Text>
        ) : age === "Senior" ? (
          <Text className="text-white font-gordita-regular">Age 60+</Text>
        ) : null}
      </View>

      <View className="items-center">
        <Text className="text-white text-3xl font-gordita-bold pb-2">
          ${(cost + fee).toFixed(2)}
        </Text>
        <Text className="text-white text-sm font-gordita-regular">
          ${cost.toFixed(2)} + ${fee.toFixed(2)} fee*
        </Text>
      </View>

      <TicketCounter
        remainingTickets={remainingTickets}
        setRemainingTickets={setRemainingTickets}
      />
    </View>
  );
};

export default TicketSelector;
