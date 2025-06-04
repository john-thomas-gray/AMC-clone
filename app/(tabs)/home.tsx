
import SlidingHeader from '@/components/SlidingHeader'
import React from 'react'
import { View } from 'react-native'

const Home = () => {

  const movieData = [{id: 1, title: 'Movie 1'}, {id: 2, title: 'Movie 2'}, {id: 3, title: 'Movie 3'}]

  return (
    <View className='flex-1 bg-black'>

      <SlidingHeader
        sectionNames={['NOW PLAYING', 'COMING SOON', 'ON DEMAND']}
      />


    </View>
  )
}

export default Home
