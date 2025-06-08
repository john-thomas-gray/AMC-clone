
import NowPlaying from '@/components/NowPlaying'
import SlidingLayout from '@/components/SlidingLayout'
import React from 'react'
import { View } from 'react-native'

const Home = () => {

  const data = {
    buttonNames: ['NOW PLAYING', 'COMING SOON', 'ON DEMAND'],
  }

  return (
    <View className='flex-1 bg-black'>

      <SlidingLayout
        buttonNames={data.buttonNames}
      >
        <NowPlaying />
        <NowPlaying />
        <NowPlaying />

      </SlidingLayout>


    </View>
  )
}

export default Home
