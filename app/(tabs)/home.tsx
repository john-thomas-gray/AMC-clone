import HorizontalScrollContainer from '@/components/HorizontalScrollContainer'
import MovieCard from '@/components/MovieCard'
import SlidingHeader from '@/components/SlidingHeader'
import { backgrounds } from '@/constants'
import React from 'react'
import { View } from 'react-native'

const Home = () => {

  const movieData = [{id: 1, title: 'Movie 1'}, {id: 2, title: 'Movie 2'}, {id: 3, title: 'Movie 3'}]

  return (
    <View className='flex-1 bg-black'>

      <SlidingHeader
        numberOfSections={3}
        sectionNames={['NOW PLAYING', 'COMING SOON', 'ON DEMAND']}
        />

      <HorizontalScrollContainer>
        {movieData.map(movie => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            poster={backgrounds.purpleGradient}
            onPress={() => console.log(`Pressed ${movie.title}`)}
          />
        ))}
      </HorizontalScrollContainer>


    </View>
  )
}

export default Home
