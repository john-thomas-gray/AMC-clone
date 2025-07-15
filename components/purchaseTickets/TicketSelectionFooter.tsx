import React from "react";
import { Text, View } from "react-native";
import CustomButton from "../buttons/CustomButton";

type Props = {
  onPress: () => void;
  remaining: number;
  comboCount: number;
  ticketCount: number; // add ticketCount here
};

const SelectTicketsFooter = ({
  onPress,
  remaining,
  comboCount = 0,
  ticketCount
}: Props) => {
  return (
    <View>
      <View className="border-t border-gray-300 px-4 pt-2 pb-8 flex-row justify-between items-center">
        <View
          className={`flex-col items-start ${
            ticketCount === 0 || comboCount === 0
              ? "justify-center"
              : "justify-start"
          }`}
        >
          {ticketCount > 0 && (
            <Text className="text-white text-md uppercase">
              {ticketCount === 1
                ? `${ticketCount} TICKET SELECTED`
                : `${ticketCount} TICKETS SELECTED`}
            </Text>
          )}

          {comboCount > 0 && (
            <Text className="text-white text-md uppercase">
              {comboCount === 1
                ? `${comboCount} COMBO SELECTED`
                : `${comboCount} COMBOS SELECTED`}
            </Text>
          )}
        </View>
        {remaining === 0 ? (
          <CustomButton
            variant="white"
            title="Continue"
            bold
            onPress={onPress}
          />
        ) : (
          <CustomButton
            variant="inactive"
            title="Continue"
            bold
            onPress={() => {}}
          />
        )}
      </View>
    </View>
  );
};

export default SelectTicketsFooter;
