import SlidingLayout from '@/components/SlidingLayout'
import Details from '@/components/movies/details'
import Showtimes from '@/components/movies/showtimes'
import Videos from '@/components/movies/videos'
import { fetchMovieById } from '@/utils/TMDBapi'
import { formatBackdrop, formatGenre, formatRuntime } from "@/utils/formatMovieData"
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ImageBackground, Pressable, Text, View } from 'react-native'

type Movie = {
  id: number;
  title: string;
  runtime: number;
  overview: string;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
  genres?: { id: number; name: string }[];
};

const MovieDetail = () => {

  const { id } = useLocalSearchParams();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);


  const buttonNames = ['SHOWTIMES', 'DETAILS', 'VIDEOS']

  useEffect(() => {
    if (!id) return;
    fetchMovieById(id)
      .then((data) => setMovie(data))
      .catch((err) => console.error('Movie fetch error:', err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading || !movie) {
    return <ActivityIndicator/>;
  }

  return (
    <View className='flex-1 flex-col bg-black'>
      <ImageBackground
        source={{ uri: formatBackdrop(movie.backdrop_path) }}
        style={{ width: '100%', height: 250 }}
        className=''
        resizeMode='cover'
      >
        <View className="flex-1 justify-end mx-4">
          <Text className="text-white font-gordita-bold text-2xl">{movie.title}</Text>

          <View className="flex-row">
            <Text>{formatRuntime(movie.runtime)}</Text>
            <Pressable></Pressable>
            <Text> | </Text>
            <Text> R </Text>
            <Pressable></Pressable>
            <Text> | </Text>
            <Text>{formatGenre(movie.genres ?? [])}</Text>
          </View>

          <Text></Text>
        </View>

      </ImageBackground>
      <SlidingLayout
        buttonNames={buttonNames}
      >
        <Showtimes />
        <Details />
        <Videos />
      </SlidingLayout>
    </View>
  )
}

export default MovieDetail
