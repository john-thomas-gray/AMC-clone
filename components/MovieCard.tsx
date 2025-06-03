import React from 'react'
import { ImageBackground, TouchableOpacity } from 'react-native'

const MovieCard = () => {
  return (
    <TouchableOpacity className="w-full">
      <ImageBackground
        source={require('../assets/images/movie-card-background.png')}
        className="w-full h-fulloverflow-hidden"
        resizeMode="cover"
      />
    </TouchableOpacity>
  )
}

export default MovieCard
