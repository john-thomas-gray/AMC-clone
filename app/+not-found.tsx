import BackButton from "@/components/buttons/BackButton";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

const NotFound = () => {
  const router = useRouter();
  return (
    <View className="flex-1 bg-black">
      <BackButton global className="m-4" />
      <View className="flex-1 items-center bg-black">
        <Text className="text-white">
          The page you are looking for could not be found.
        </Text>
      </View>
      <Pressable
        onPress={() => {
          router.push("/(tabs)/home");
        }}
        className="px-4 py-2 bg-blue-600 rounded items-center justify-center"
      >
        <Text className="text-white text-center">Go Home</Text>
      </Pressable>
    </View>
  );
};

export default NotFound;
