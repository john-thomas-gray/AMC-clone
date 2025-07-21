import Counter from "@/components/purchaseTickets/Counter";
import React from "react";
import { Text, View } from "react-native";

type TicketSelectorProps = {
  age: string;
  cost: number;
  fee: number;
  remainingTickets: number;
  ticketCount: number;
  setTicketCount: React.Dispatch<React.SetStateAction<number>>;
};

const TicketSelector = ({
  age,
  cost,
  fee,
  remainingTickets,
  ticketCount,
  setTicketCount
}: TicketSelectorProps) => {
  return (
    <View className="flex-row h-20  items-start justify-between mb-6">
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

      <View className="items-center flex-row">
        <View className="flex-col items-center">
          <Text className="text-white text-3xl font-gordita-bold pb-2">
            ${(cost + fee).toFixed(2)}
          </Text>
          <Text className="text-white text-sm font-gordita-regular">
            ${cost.toFixed(2)} + ${fee.toFixed(2)} fee*
          </Text>
        </View>
        <Counter
          remaining={remainingTickets}
          count={ticketCount}
          setCount={setTicketCount}
          limit={9}
        />
      </View>
    </View>
  );
};

export default TicketSelector;
