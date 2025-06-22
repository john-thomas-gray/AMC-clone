
import { MovieCardProps } from '@/types/type';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import React from 'react';
import { ImageBackground, Pressable, Text, View } from 'react-native';


const MovieCard = ({ id, poster_path, title }: MovieCardProps) => {
  return (
    <Link
      href={{
        pathname: '/movies/[id]',
        params: { id: id.toString() },
      }}
      asChild
    >
      <Pressable className="w-[50%] h-[341px] bg-black">
        <ImageBackground
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : 'https://placehold.co/600x400/1a1a1a/ffffff.png'
          }}
          resizeMode='contain'
          className="flex-1 justify-end"
        >
          <LinearGradient
            colors={[
              'transparent',
              'rgba(0,0,0,0.4)',
              'rgba(0,0,0,0.8)',
              'rgba(0,0,0,1)'
            ]}
            locations={[0, 0.4, 0.65, 1]}
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 100 }}
          />
          <View className="flex-1 justify-end items-center">
            <Text className="text-lg font-gordita-bold text-white">{title}</Text>
          </View>
        </ImageBackground>
      </Pressable>
    </Link>
  )
}

export default MovieCard
