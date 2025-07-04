import { icons } from "@/constants";
import { TheatreDataContext } from "@/context/theatreDataContext";
import { Screen, Theatre } from "@/types/type";
import { formatTheatreAddress } from "@/utils/formatMovieData";
import { useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import CustomButton from "../buttons/CustomButton";

type ShowtimeCardProps = {
  theatreData: Theatre;
  screenData: Screen[];
};

const ShowtimeCard = ({ theatreData, screenData }: ShowtimeCardProps) => {
  const [address, setAddress] = useState<string[]>([]);
  const router = useRouter();
  const { setSelectedSession } = useContext(TheatreDataContext);

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

  if (!setSelectedSession) {
    return <Text>Error: Theatre data context not initialized properly.</Text>;
  }
  return (
    <View className="flex-1 bg-black border-b border-gray-300 p-4">
      {/* Theatre Header */}
      <View className="flex-col ">
        <View className="flex-row items-start mb-2 justify-between items-end">
          <View className="flex-row justify-end">
            <Image
              className="h-7 w-7 mr-2"
              source={icons.favouriteOff}
              resizeMode="contain"
            />

            <Text className="text-white font-gordita-bold text-xl">
              {theatreData.name}
            </Text>
          </View>
          <Text className="text-gray-100 font-gordita-regular">
            Distance mi
          </Text>
        </View>
        <View className="ml-[30] pb-6">
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
      </View>

      {/* Screen type */}
      {screenData.map((screen, index) => (
        <View key={index} className="flex-1">
          <View>
            <View className="flex-row justify-between image-center">
              <View className="flex-col">
                <View className="flex-row items-center mb-0.5">
                  <Text className="text-white font-gordita-bold pr-2">
                    {screen.type.projector}
                  </Text>
                  <Pressable className="h-5 w-5 mb-1">
                    <Image
                      source={icons.info}
                      resizeMode="contain"
                      className="h-full w-full"
                    />
                  </Pressable>
                </View>

                <Text className="text-white font-gordita-regular capital mb-3">
                  {screen.type.tagline}
                </Text>
              </View>

              <Image
                source={screen.type.logo}
                resizeMode="contain"
                className="h-12 w-24"
              />
            </View>

            <View className="flex-row flex-wrap mb-4 items-center">
              <Text className="text-gray-100 font-gordita-regular">
                {screen.features[0]}
              </Text>

              {screen.features.slice(1).map((feature, i) => (
                <View key={i + 1} className="flex-row items-center">
                  <Text className="text-gray-100 font-gordita-bold mx-1 pt-1">
                    •
                  </Text>
                  <Text className="text-gray-100 font-gordita-regular">
                    {feature}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View className="flex-row flex-wrap gap-2 mb-6">
            {screen.showtimes.map((time, i) => (
              <CustomButton
                key={i}
                variant="black"
                bold={true}
                onPress={() => {
                  setSelectedSession({
                    theatre: theatreData,
                    screen: screen,
                    showtime: time
                  });
                  router.push("/movies/seatSelection");
                }}
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
