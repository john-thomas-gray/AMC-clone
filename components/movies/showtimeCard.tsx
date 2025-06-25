import { icons } from "@/constants";
import { Screen, Theatre } from "@/types/type";
import { formatTheatreAddress } from "@/utils/formatMovieData";
import React, { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import CustomButton from "../buttons/CustomButton";

type ShowtimeCardProps = {
  theatreData: Theatre;
  screenData: Screen[];
};

const ShowtimeCard = ({ theatreData, screenData }: ShowtimeCardProps) => {
  const [address, setAddress] = useState<string[]>([]);

  useEffect(() => {
    const getAddress = async () => {
      const formatted = await formatTheatreAddress(
        theatreData.vicinity,
        theatreData.compound_code,
        theatreData.location
      );
      setAddress(formatted);
    };
    getAddress();
  }, [theatreData]);

  return (
    <View className="flex bg-black border-t border-gray-300 p-4">
      {/* Theatre Header */}
      <View className="flex-row items-center mb-2 justify-between">
        <Image
          className="h-5 w-5 mr-2"
          source={icons.favouriteOff}
          resizeMode="contain"
        />
        <View>
          <Text className="text-white font-gordita-regular">
            {theatreData.name}
          </Text>
          {address.length > 0 && (
            <>
              <Text className="text-blue-100 font-gordita-regular">
                {address[0]}
              </Text>
              <Text className="text-blue-100 font-gordita-regular">
                {address[1]}
              </Text>
            </>
          )}
        </View>
        <Text className="text-white font-gordita-regular">Distance</Text>
      </View>

      {/* Screen type */}
      {screenData.map((screen, index) => (
        <View key={index} className="flex-1">
          <View>
            <View className="flex-row justify-between image-center">
              <View className="flex-col">
                <View className="flex-row">
                  <Text className="text-white font-gordita-regular">
                    {screen.type.projector}
                  </Text>
                  <Pressable className="h-5 w-5">
                    <Image
                      source={icons.info}
                      resizeMode="contain"
                      className="h-full w-full"
                    />
                  </Pressable>
                </View>

                <Text className="text-white font-gordita-regular">
                  {screen.type.tagline}
                </Text>
              </View>

              <Image
                source={screen.type.logo}
                resizeMode="contain"
                className="h-12 w-full"
              />
            </View>

            <Text className="text-gray-100 font-gordita-regular">
              {screen.features.join(" • ")}
            </Text>
          </View>

          <View className="flex-row flex-wrap gap-2">
            {screen.showtimes.map((time, i) => (
              <CustomButton
                key={i}
                variant="black"
                onPress={() =>
                  console.log(`Pressed ${screen.movie.title} at ${time}`)
                }
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
