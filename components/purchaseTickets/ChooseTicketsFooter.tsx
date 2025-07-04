import React, { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import CustomButton from "../buttons/CustomButton";

type Props = {
  onPress: () => void;
  remaining: number;
};

const ChooseTicketsFooter = ({ onPress, remaining }: Props) => {
  const [count, setCount] = useState(0);
  const totalTickets = useRef(remaining);

  useEffect(() => {
    setCount(prevCount => {
      return totalTickets.current - remaining;
    });
  }, [remaining]);

  return (
    <View>
      <View className="border-t border-gray-300 px-4 pt-4 pb-8 flex-row justify-between items-center">
        <Text className="font-gordita-bold text-white text-lg uppercase">
          {count === 0
            ? ""
            : count === 1
            ? `${count} TICKET SELECTED`
            : `${count} TICKETS SELECTED`}
        </Text>
        {remaining === 0 ? (
          <CustomButton
            variant="white"
            title="Continue"
            bold={true}
            onPress={() => onPress()}
          />
        ) : (
          <CustomButton
            variant="inactive"
            title="Continue"
            bold={true}
            onPress={() => onPress()}
          />
        )}
      </View>
    </View>
  );
};

export default ChooseTicketsFooter;
