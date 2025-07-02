import { icons } from "@/constants";
import React from "react";
import { View } from "react-native";
import CustomButton from "../buttons/CustomButton";
import { IconButton } from "../buttons/IconButton";

type Props = {
  onPress: () => void;
  disabled?: boolean;
};

const PurchaseTicketsFooter = ({ onPress }: Props) => {
  return (
    <View>
      <View className="border-t border-gray-300 px-4 pt-4 pb-8 flex-row justify-between items-center">
        <View className="h-5 w-5">
          <IconButton
            icon={icons.upload}
            onPress={() => {
              console.log("upload pressed");
            }}
            iconStyle="h-4 w-4"
          />
        </View>
        <CustomButton
          variant="white"
          title="Continue"
          bold={true}
          onPress={() => onPress()}
        />
      </View>
    </View>
  );
};

export default PurchaseTicketsFooter;
