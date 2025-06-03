import { MovieCardProps } from '@/types/type'
import React from 'react'
import { ImageBackground, Text, TouchableOpacity } from 'react-native'

const MovieCard = ({ title, poster, onPress }: MovieCardProps) => {
  return (
    <TouchableOpacity className="w-full" onPress={onPress}>
      <ImageBackground
        source={poster}
        className="w-full h-full overflow-hidden"
        resizeMode="cover"
      />
      <Text
        className="font-gordita-regular text-white"
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default MovieCard
