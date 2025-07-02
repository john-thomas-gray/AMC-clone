import React from "react";
import { Text, View } from "react-native";
import CustomButton from "../buttons/CustomButton";

const SignInBanner = () => {
  return (
    <View className="flex-row w-full items-center justify-between pl-3 pr-5 pt-2 pb-3 bg-purple-100">
      <Text className="flex-1 text-white font-gordita-reguler text-lg text-left pr-4 leading-tight">
        Sign in to take advantage of AMC Stubs benefits, including waived fees
        as applicable.
      </Text>
      <CustomButton
        title="Sign In"
        variant="transparent"
        bold={true}
        textStyle="text-sm"
        onPress={() => console.log("Sign In button pressed")}
      />
    </View>
  );
};

export default SignInBanner;
