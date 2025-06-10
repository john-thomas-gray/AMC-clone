
import NowPlaying from '@/components/NowPlaying'
import OnDemand from '@/components/OnDemand'
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
        {/* <ComingSoon /> */}
        <NowPlaying />
        <OnDemand />

      </SlidingLayout>


    </View>
  )
}

export default Home
