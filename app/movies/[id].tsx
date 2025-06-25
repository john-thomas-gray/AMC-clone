import SlidingLayout from "@/components/SlidingLayout";
import Details from "@/components/movies/Details";
import Showtimes from "@/components/movies/Showtimes";
import Videos from "@/components/movies/Videos";
import { icons } from "@/constants/index";
import { TheatreDataContext } from "@/context/theatreDataContext";
import {
  formatBackdrop,
  formatGenre,
  formatMPAA,
  formatReleaseDate,
  formatRuntime
} from "@/utils/formatMovieData";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";

const MovieDetail = () => {
  const { id } = useLocalSearchParams();

  const [contentReady, setContentReady] = useState(false);

  const slideButtonNames = ["SHOWTIMES", "DETAILS", "VIDEOS"];

  const { theatres, loading, error } = useContext(TheatreDataContext);
  if (loading) return <Text>Loading nearby showtimes...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!theatres || theatres.length === 0)
    return <Text>No theatres found nearby.</Text>;

  const movie = theatres
    .flatMap(theatre => theatre.screens.map(screen => screen.movie))
    .find(movie => movie.id.toString() === id.toString());

  console.log(movie);

  if (!movie) return <Text>Movie not found.</Text>;

  return (
    <View className="flex-1 flex-col bg-black">
      <View style={{ height: 275 }}>
        <ImageBackground
          source={{ uri: formatBackdrop(movie.backdropPath || "") }}
          resizeMode="cover"
          style={{ flex: 1 }}
        >
          <LinearGradient
            colors={[
              "transparent",
              "rgba(0,0,0,0.4)",
              "rgba(0,0,0,0.7)",
              "rgba(0,0,0,1)"
            ]}
            locations={[0, 0.35, 0.55, 1]}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 100
            }}
          />

          <View className="flex-1 justify-end px-4 pb-2">
            <View className="flex-row justify-between">
              <Text className="text-white font-gordita-bold text-3xl">
                {movie.title}
              </Text>
              <Image source={icons.upload} className="h-4 w-4" />
            </View>
          </View>
        </ImageBackground>
      </View>

      {contentReady && (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "rgba(0,0,0,0.8)",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10
          }}
        >
          <ActivityIndicator size="large" color="#00a8e1" />
        </View>
      )}

      {!contentReady && (
        <View className="flex-1">
          <View className="px-4 pt-2">
            <View className="flex-row pb-4">
              <Text className="text-white font-gordita-regular">
                {formatRuntime(movie.runtime || "")}
              </Text>
              <Pressable className="h-5 w-5">
                <Image
                  source={icons.info}
                  resizeMode="contain"
                  className="h-full w-full"
                />
              </Pressable>
              <Text className="text-white font-gordita-regular"> | </Text>
              <Text className="text-white font-gordita-regular">
                {formatMPAA(formatGenre(movie.genres ?? []))}{" "}
              </Text>

              {formatMPAA(formatGenre(movie.genres ?? [])) === "R" ? (
                <Pressable className="h-5 w-5">
                  <Image
                    source={icons.info}
                    resizeMode="contain"
                    className="h-full w-full"
                  />
                </Pressable>
              ) : (
                <View></View>
              )}
              <Text className="text-white font-gordita-regular"> | </Text>
              <Text className="text-white font-gordita-regular">
                {formatGenre(movie.genres ?? [])}
              </Text>
            </View>

            <Text className="text-white font-gordita-regular">
              {formatReleaseDate(movie?.release_date)}
            </Text>
          </View>

          <View className="flex bg-black border-bottom border-gray-300 h-full w-full">
            <SlidingLayout buttonNames={slideButtonNames}>
              <Showtimes
                movieId={movie.id}
                // onReady={() => setContentReady(true)}
              />
              <Details />
              <Videos />
            </SlidingLayout>
          </View>
        </View>
      )}
    </View>
  );
};

export default MovieDetail;
