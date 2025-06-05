import MovieCard from '@/components/MovieCard'
import { MovieCardProps } from '@/types/type'
import React from 'react'
import { FlatList, View } from 'react-native'

const NowPlaying = () => {

  const movieData: MovieCardProps[] = [
    { id: '1', title: 'Movie 1', poster: require('@/assets/poster1.jpg'), onPress: () => {} },
    { id: '2', title: 'Movie 2', poster: require('@/assets/poster2.jpg'), onPress: () => {} },
    { id: '3', title: 'Movie 3', poster: require('@/assets/poster3.jpg'), onPress: () => {} },

  ];

  return (
    <View>
      <FlatList
        data={movieData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MovieCard
            id={item.id}
            title={item.title}
            poster={item.poster}
            onPress={item.onPress}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default NowPlaying
