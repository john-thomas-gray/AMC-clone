import { icons } from "@/constants";
import React from "react";
import { Image, Text, View } from "react-native";
import CustomButton from "../buttons/CustomButton";

type Showtime = {
  id: number;
  title: string;
  runtime: string;
  overview: string;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
  genres: { id: number; name: string }[];
  times: string[];
};

type ShowtimeCardProps = {
  data: {
    theatreName: string;
    address: string[];
    showtimes: Showtime[];
  };
};

const ShowtimeCard = ({ data }: ShowtimeCardProps) => {
  return (
    <View className="flex bg-black border-t border-gray-300 p-4">
      {/* Theatre Header */}
      <View className="flex-row items-center mb-2">
        <Image
          className="h-5 w-5 mr-2"
          source={icons.favouriteOff}
          resizeMode="contain"
        />
        <View>
          <Text className="text-white font-bold">{data.theatreName}</Text>
          <Text className="text-gray-300 text-xs">{data.address}</Text>
        </View>
      </View>

      {/* Movies and Showtimes */}
      {data.showtimes.map(movie => (
        <View key={movie.id} className="mb-4">
          <Text className="text-white text-base font-semibold mb-1">
            {movie.title}
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {movie.times.map((time, index) => (
              <CustomButton
                key={index}
                variant="black"
                onPress={() => console.log(`Pressed ${movie.title} at ${time}`)}
                title={time}
              />
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

export default ShowtimeCard;
