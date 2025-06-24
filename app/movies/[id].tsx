import SlidingLayout from '@/components/SlidingLayout'
import Details from '@/components/movies/details'
import Showtimes from '@/components/movies/showtimes'
import Videos from '@/components/movies/videos'
import { icons } from '@/constants/index'
import { fetchMovieById } from '@/utils/TMDBapi'
import { formatBackdrop, formatGenre, formatMPAA, formatReleaseDate, formatRuntime } from "@/utils/formatMovieData"
import { LinearGradient } from 'expo-linear-gradient'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, ImageBackground, Pressable, Text, View } from 'react-native'

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

  const slideButtonNames = ['SHOWTIMES', 'DETAILS', 'VIDEOS']



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
        <LinearGradient
          colors={[
            'transparent',
            'rgba(0,0,0,0.4)',
            'rgba(0,0,0,0.7)',
            'rgba(0,0,0,1)'
          ]}
          locations={[0, 0.4, 0.65, 1]}
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 100 }}
        />

        <View className="flex-1 justify-end mx-4">
          <View className="flex-row justify-between pb-6">
            <Text className="text-white font-gordita-bold text-2xl">{movie.title}</Text>
            <Image source={icons.upload} className="h-4 w-4"/>
          </View>

          <View className="flex-row pb-4">
            <Text className="text-white font-gordita-regular">{formatRuntime(movie.runtime)}</Text>
            <Pressable className="h-5 w-5">
              <Image
                source={icons.info}
                resizeMode='contain'
                className="h-full w-full"
              />
            </Pressable>
            <Text className="text-white font-gordita-regular"> | </Text>
            <Text className="text-white font-gordita-regular">{formatMPAA(formatGenre(movie.genres ?? []))} </Text>

            {
            formatMPAA(formatGenre(movie.genres ?? [])) === "R" ?
              <Pressable className="h-5 w-5">
                <Image
                  source={icons.info}
                  resizeMode='contain'
                  className="h-full w-full"
                />
              </Pressable>
              :
              <View></View>
            }
            <Text className="text-white font-gordita-regular"> | </Text>
            <Text className="text-white font-gordita-regular">{formatGenre(movie.genres ?? [])}</Text>
          </View>

          <Text className="text-white font-gordita-regular">
            {formatReleaseDate(movie?.release_date)}
          </Text>
        </View>


      </ImageBackground>

      <View className="flex bg-black border-bottom border-red-300 h-full w-full">
        <SlidingLayout
          buttonNames={slideButtonNames}
        >
          <Showtimes />
          <Details />
          <Videos />
        </SlidingLayout>
      </View>
    </View>
  )
}

export default MovieDetail
