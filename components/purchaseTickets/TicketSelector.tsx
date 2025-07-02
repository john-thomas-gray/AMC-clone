import React, { useState } from "react";
import { Text, View } from "react-native";
import MinusButton from "../buttons/MinusButton";
import PlusButton from "../buttons/PlusButton";

type TicketSelectorProps = {
  age: string;
  cost: number;
  fee: number;
  remainingTickets: number;
};

const TicketSelector = ({
  age,
  cost,
  fee,
  remainingTickets
}: TicketSelectorProps) => {
  const [localRemaining, setLocalRemaining] = useState(remainingTickets);

  const updateRemainingTickets = (operation: "Plus" | "Minus") => {
    if (operation === "Plus") {
      setLocalRemaining(prev => prev + 1);
    } else if (operation === "Minus") {
      setLocalRemaining(prev => Math.max(0, prev - 1));
    } else {
      throw new Error("Invalid operation");
    }
  };

  return (
    <View className="flex-row h-80 items-center justify-between px-4">
      <View>
        <Text className="text-white text-xl">{age}</Text>
        {age === "Child" ? (
          <Text className="text-white font-gordita-regular">Age 2–12</Text>
        ) : age === "Senior" ? (
          <Text className="text-white font-gordita-regular">Age 60+</Text>
        ) : null}
      </View>

      <View>
        <Text className="text-white text-xl">${(cost + fee).toFixed(2)}</Text>
        <Text className="text-white text-sm">
          ${cost.toFixed(2)} + ${fee.toFixed(2)} fee*
        </Text>
      </View>

      <View className="flex-row items-center space-x-2">
        <MinusButton onPress={() => updateRemainingTickets("Minus")} />
        <Text className="text-white text-lg">{localRemaining}</Text>
        <PlusButton onPress={() => updateRemainingTickets("Plus")} />
      </View>
    </View>
  );
};

export default TicketSelector;
