import BackButton from "@/components/buttons/BackButton";
import React from "react";
import { Text, View } from "react-native";

const NotFound = () => {
  return (
    <View className="flex-1 bg-black">
      <BackButton global className="m-4" />
      <View className="flex-1 items-center bg-black">
        <Text className="text-white">
          The page you are looking for could not be found.
        </Text>
      </View>
    </View>
  );
};

export default NotFound;
