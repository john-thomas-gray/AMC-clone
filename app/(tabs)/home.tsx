
import HorizontalScrollContainer from '@/components/HorizontalScrollContainer'
import SlidingHeader from '@/components/SlidingHeader'
import React, { useRef } from 'react'
import { Dimensions, ScrollView, View } from 'react-native'

const Home = () => {

  const movieData = [{id: 1, title: 'Movie 1'}, {id: 2, title: 'Movie 2'}, {id: 3, title: 'Movie 3'}]
  const scrollViewRef = useRef<ScrollView>(null);
  const { width: screenWidth } = Dimensions.get('window');

  const data = {
    sectionNames: ['NOW PLAYING', 'COMING SOON', 'ON DEMAND'],
    scrollViewRef: scrollViewRef,
    screenWidth: screenWidth,


  }

  return (
    <View className='flex-1 bg-black'>

      <SlidingHeader
        sectionNames={data.sectionNames}
      />

      <HorizontalScrollContainer
        data={data}
      />
    </View>
  )
}

export default Home
