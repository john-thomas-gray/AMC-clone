import { icons, images } from "@/constants";
import React from "react";
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  Pressable,
  Text,
  View
} from "react-native";

type ConcessionsCardProps = {
  title: string;
  imagePath: ImageSourcePropType;
  onPress: () => void;
};

const ConcessionsCard = ({
  title,
  imagePath = images.teensTastyDeal,
  onPress
}: ConcessionsCardProps) => {
  return (
    <Pressable className="w-full h-[180] bg-white flex-1" onPress={onPress}>
      <ImageBackground
        source={imagePath}
        resizeMode="cover"
        className="w-full h-full"
      >
        <View className="flex-1 justify-end">
          <View
            className="bg-black bg-opacity-50 px-3 py-2 flex-row justify-between items-center"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
          >
            <Text className="text-white text-3xl font-gordita-regular">
              {title}
            </Text>
            <View className="h-6 w-6 ml-2">
              <Image
                source={icons.backArrowWhite}
                style={{ height: "100%", width: "100%", resizeMode: "contain" }}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

export default ConcessionsCard;
