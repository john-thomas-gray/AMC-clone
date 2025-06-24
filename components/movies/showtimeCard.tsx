import { icons } from "@/constants";
import React from "react";
import { Image, Text, View } from "react-native";
import CustomButton from "../buttons/CustomButton";

type ShowtimeCardProps = {
  data: {
    theatre: any;
    address: any;
    showtimes: {
      id: any;
      title: any;
      runtime: any;
      overview: any;
      release_date: any;
      poster_path: any;
      backdrop_path: any;
      genres: any;
      times: string[];
    }[];
  };
};

const ShowtimeCard = ({ data }: ShowtimeCardProps) => {
  return (
    <View className="flex bg-black border-top border-grey-300">
      {/* Theatre */}
      <View className="flex-row">
        <Image
          className="h-5 w-5"
          source={icons.favouriteOff}
          resizeMode="contain"
        />
        <View className="flex-col">
          <Text className="text-white">{data.theatre}</Text>
          <Text className="text-white">{data.address}</Text>
          <Text className="text-white">{data.address}</Text>
        </View>
        {/* <View>{data.distance} mi</View> */}
      </View>
      {/* Projector Type */}
      <View>
        <View>
          <View>
            <Text className="text-white"></Text>
            <Image />
          </View>
          <Text className="text-white"></Text>
        </View>
      </View>
      {/* Extras */}
      <Text className="text-white"></Text>
      {/* Showtimes */}
      <View>
        {data.showtimes.map((time, index) => (
          <CustomButton
            key={index}
            variant="black"
            onPress={() => {
              console.log(`pressed showtime ${time}`);
            }}
            title={"time"}
          />
        ))}
      </View>
    </View>
  );
};

export default ShowtimeCard;
