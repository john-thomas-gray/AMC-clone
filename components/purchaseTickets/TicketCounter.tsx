import React, { useState } from "react";
import { Text, View } from "react-native";
import MinusButton from "../buttons/MinusButton";
import PlusButton from "../buttons/PlusButton";

type TicketCounterProps = {
  remainingTickets: number;
  setRemainingTickets: React.Dispatch<React.SetStateAction<number>>;
};

const TicketCounter = ({
  remainingTickets,
  setRemainingTickets
}: TicketCounterProps) => {
  const [ticketCount, setTicketCount] = useState<number>(0);

  const updateRemainingTickets = (operation: "Plus" | "Minus") => {
    if (operation === "Plus") {
      setRemainingTickets(prev => prev + 1);
    } else if (operation === "Minus") {
      setRemainingTickets(prev => Math.max(0, prev - 1));
    } else {
      throw new Error("Invalid operation");
    }
  };

  const updateTicketCount = (operation: "Plus" | "Minus") => {
    if (operation === "Plus") {
      setTicketCount(prev => prev + 1);
    } else if (operation === "Minus") {
      setTicketCount(prev => Math.max(0, prev - 1));
    } else {
      throw new Error("Invalid operation");
    }
  };

  const handlePress = (operation: "Plus" | "Minus") => {
    updateRemainingTickets(operation);
    updateTicketCount(operation);
  };

  return (
    <View className="flex-row items-center space-x-2">
      <MinusButton
        onPress={() => handlePress("Minus")}
        disabled={ticketCount === 0}
      />
      <Text className="text-white text-3xl font-gordita-bold px-4">
        {ticketCount}
      </Text>
      <PlusButton
        onPress={() => handlePress("Plus")}
        disabled={remainingTickets === 0}
      />
    </View>
  );
};

export default TicketCounter;
