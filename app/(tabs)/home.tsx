
import NowPlaying from '@/components/NowPlaying'
import SlidingLayout from '@/components/SlidingLayout'
import React, { useRef } from 'react'
import { Dimensions, ScrollView, View } from 'react-native'

const Home = () => {

  const scrollViewRef = useRef<ScrollView>(null);
  const { width: screenWidth } = Dimensions.get('window');

  const data = {
    sectionNames: ['NOW PLAYING', 'COMING SOON', 'ON DEMAND'],
    scrollViewRef: scrollViewRef,
    screenWidth: screenWidth,


  }

  return (
    <View className='flex-1 bg-black'>

      <SlidingLayout
        sectionNames={data.sectionNames}
      >
        <NowPlaying />
        <NowPlaying />
        <NowPlaying />

      </SlidingLayout>


    </View>
  )
}

export default Home
