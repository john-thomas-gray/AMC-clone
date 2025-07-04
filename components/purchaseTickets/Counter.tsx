import React, { useState } from "react";
import { Text, View } from "react-native";
import MinusButton from "../buttons/MinusButton";
import PlusButton from "../buttons/PlusButton";

type CounterProps = {
  remaining?: number;
  setRemaining?: React.Dispatch<React.SetStateAction<number>>;
  count?: number;
  setCount?: React.Dispatch<React.SetStateAction<number>>;
  limit?: number;
  size?: "S" | "M" | "L";
};

const fontSizes = {
  S: "text-md",
  M: "text-3xl",
  L: "text-5xl"
} as const;

const widths = {
  S: "w-[35px]",
  M: "w-[50px]",
  L: "w-[65px]"
} as const;

const Counter = ({
  remaining: remainingProp,
  setRemaining: setRemainingProp,
  count: countProp,
  setCount: setCountProp,
  limit = 99,
  size = "M"
}: CounterProps) => {
  const [internalRemaining, setInternalRemaining] = useState(limit);
  const [internalCount, setInternalCount] = useState(0);

  const remaining = remainingProp ?? internalRemaining;
  const setRemaining = setRemainingProp ?? setInternalRemaining;
  const count = countProp ?? internalCount;
  const setCount = setCountProp ?? setInternalCount;

  const handlePress = (op: "Plus" | "Minus") => {
    if (op === "Plus") {
      if (remaining > 0 && count < limit) {
        setCount(c => c + 1);
        setRemaining(r => r - 1);
      }
    } else {
      if (count > 0) {
        setCount(c => c - 1);
        setRemaining(r => r + 1);
      }
    }
  };

  return (
    <View className="flex-row items-center space-x-2">
      <MinusButton
        onPress={() => handlePress("Minus")}
        disabled={count === 0}
        size={size}
      />
      <View className={`items-center ${widths[size]}`}>
        <Text className={`text-white font-gordita-bold ${fontSizes[size]}`}>
          {count}
        </Text>
      </View>
      <PlusButton
        onPress={() => handlePress("Plus")}
        disabled={remaining === 0 || count >= limit}
        size={size}
      />
    </View>
  );
};

export default Counter;
