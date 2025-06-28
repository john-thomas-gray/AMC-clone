import { onDemand } from "@/constants/OnDemandContent";
import React from "react";
import { Image, Linking, Text, View } from "react-native";
import CustomButton from "../buttons/CustomButton";

const OnDemand = () => {
  return (
    <View className="flex-1 flex-col my-32 bg-black items-center">
      {/* Logo */}
      <View className="flex-row items-bottom mb-4">
        <Image
          source={require("@/assets/images/fandangoLogo.png")}
          className="contain h-24 w-24 mr-2"
        />

        <View className="items-start flex-col">
          <View className="flex-row mb-1">
            <Text className="font-gordita-bold text-fandango-blue text-5xl">
              {onDemand.logo.top_text}
            </Text>
            <Text className="font-gordita-bold text-fandango-blue text-sm relative leading-none">
              {onDemand.logo.trademark}
            </Text>
          </View>

          <Text className="font-gordita-bold text-fandango-orange text-5xl leading-none">
            {onDemand.logo.bottom_text}
          </Text>
        </View>
      </View>

      {/* Content */}
      <View className="mb-4 mx-10">
        <Text className="text-white font-gordita-bold text-center text-2xl">
          {onDemand.title}
        </Text>
      </View>

      <View className="mb-4 mx-8">
        <Text className="text-white font-gordita-regular text-center text-lg">
          {onDemand.description}
        </Text>
      </View>

      {/* Button */}
      <View className="mb-4">
        <CustomButton
          title={onDemand.buttonText}
          bold={true}
          onPress={() => Linking.openURL(onDemand.buttonURL)}
          variant="black"
        />
      </View>
    </View>
  );
};

export default OnDemand;
