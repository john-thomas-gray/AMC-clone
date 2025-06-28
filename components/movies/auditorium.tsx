import { images } from "@/constants";
import React from "react";
import { Image, Text, View } from "react-native";

const Auditorium = () => {
  return (
    <View>
      <Image source={images.screen} />
      <Text>Auditorium</Text>
    </View>
  );
};

export default Auditorium;
