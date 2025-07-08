import { icons } from "@/constants";
import { ExternalPathString, RelativePathString, useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type BackButtonProps = {
  className?: string;
  global?: boolean;
  to?: RelativePathString | ExternalPathString | undefined;
  onPress?: () => void;
};

const BackButton = ({
  className = "",
  global = false,
  to,
  onPress
}: BackButtonProps) => {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (to) {
      router.push(to);
    } else {
      router.back();
    }
  };

  const content = (
    <Pressable
      onPress={handlePress}
      className={`h-6 w-6 ${className}`}
      accessibilityLabel="Back"
    >
      <Image
        source={icons.backArrowWhite}
        style={{ height: "100%", width: "100%", resizeMode: "contain" }}
      />
    </Pressable>
  );

  return global ? (
    <SafeAreaView className="flex-1">{content}</SafeAreaView>
  ) : (
    <View className="h-6 w-6">{content}</View>
  );
};

export default BackButton;
