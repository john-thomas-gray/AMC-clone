import BackButton from "@/components/buttons/BackButton";
import { Stack, useSegments } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function MoviesLayout() {
  const rawSegments = useSegments();
  const segments = rawSegments as string[];

  const hideGlobalBack =
    segments.includes("seatSelection") || segments.includes("chooseTickets");

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      {!hideGlobalBack && (
        <View className="absolute top-5 left-5 z-10">
          <BackButton global />
        </View>
      )}
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}
