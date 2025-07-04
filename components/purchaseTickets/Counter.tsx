import React, { useState } from "react";
import { Text, View } from "react-native";
import MinusButton from "../buttons/MinusButton";
import PlusButton from "../buttons/PlusButton";

type CounterProps = {
  remaining: number;
  setRemaining: React.Dispatch<React.SetStateAction<number>>;
};

const Counter = ({ remaining, setRemaining }: CounterProps) => {
  const [count, setCount] = useState<number>(0);

  const updateRemaining = (operation: "Plus" | "Minus") => {
    if (operation === "Plus") {
      setRemaining(prev => prev - 1);
    } else if (operation === "Minus") {
      setRemaining(prev => Math.max(0, prev + 1));
    } else {
      throw new Error("Invalid operation");
    }
  };

  const updateCount = (operation: "Plus" | "Minus") => {
    if (operation === "Plus" && remaining > 0) {
      setCount(prev => prev + 1);
    } else if (operation === "Minus") {
      setCount(prev => Math.max(0, prev - 1));
    } else {
      throw new Error("Invalid operation");
    }
  };

  const handlePress = (operation: "Plus" | "Minus") => {
    updateRemaining(operation);
    updateCount(operation);
  };

  return (
    <View className="flex-row items-center space-x-2">
      <MinusButton
        onPress={() => handlePress("Minus")}
        disabled={count === 0}
      />
      <View className="items-center w-[50px]">
        <Text className="text-white text-3xl font-gordita-bold">{count}</Text>
      </View>
      <PlusButton
        onPress={() => handlePress("Plus")}
        disabled={remaining === 0 || count > 9}
      />
    </View>
  );
};

export default Counter;
