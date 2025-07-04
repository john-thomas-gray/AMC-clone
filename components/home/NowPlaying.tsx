import { TheatreDataContext } from "@/context/theatreDataContext";
import { tailwindColors } from "@/utils/tailwindColors";
import React, { useContext } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import MovieCard from "../cards/MovieCard";

const NowPlaying = () => {
  const { theatres, loading, error } = useContext(TheatreDataContext);
  if (loading) return <Text>Loading nearby showtimes...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!theatres || theatres.length === 0)
    return <Text>No theatres found nearby.</Text>;

  const movies = [
    ...new Map(
      theatres
        .flatMap(theatre => theatre.screens.map(screen => screen.movie))
        .map(movie => [movie.id, movie])
    ).values()
  ];

  console.log(movies);

  return (
    <View className="flex-1 bg-black">
      {loading ? (
        <ActivityIndicator
          size="large"
          color={tailwindColors.blue?.[100]}
          className="mt-10 self-center"
        />
      ) : (
        <View className="flex-1">
          <>
            <FlatList
              data={movies}
              renderItem={({ item }) => <MovieCard {...item} />}
              keyExtractor={item => item.id.toString()}
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                padding: 0,
                margin: 0
              }}
              className="h-full"
              scrollEnabled={true}
              contentContainerStyle={{
                padding: 0,
                margin: 0,
                paddingBottom: 90
              }}
            />
          </>
        </View>
      )}
    </View>
  );
};

export default NowPlaying;
