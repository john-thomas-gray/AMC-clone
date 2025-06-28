import { images } from "@/constants/index";
import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import CustomButton from "../buttons/CustomButton";

const MyFavoriteTheatres = () => {
  const [textWidth, setTextWidth] = useState(0);

  return (
    <View className="flex-1 items-center bg-black mx-4 mt-10">
      <View className="flex-1 items-center">
        <View className="items-center mb-6">
          <Image
            source={images.stubsLogoAllWhite}
            style={{ width: textWidth, height: 85 }}
            resizeMode="contain"
          />

          <Text
            className="text-white font-ebgaramond-semibold text-2xl text-center"
            onLayout={event => setTextWidth(event.nativeEvent.layout.width)}
          >
            MEMBER EXCLUSIVE
          </Text>
        </View>

        <Text className="text-white font-gordita-regular text-lg text-center mb-4">
          Sign in with your AMC Stubs account to use this feature. If you
          don&apos;t have one, you can join for free.
        </Text>

        <View className="w-[30%] mt-4 mb-8">
          <CustomButton
            title="Sign In"
            bold={true}
            variant="white"
            onPress={() => console.log("Sign In Pressed")}
            className="mb-4 w-full"
          />
          <CustomButton
            title="Join Now"
            bold={true}
            variant="black"
            onPress={() => console.log("Join Now Pressed")}
            className="w-full"
          />
        </View>
      </View>
    </View>
  );
};

export default MyFavoriteTheatres;
