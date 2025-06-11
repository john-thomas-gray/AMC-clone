
import ComingSoon from '@/components/home/ComingSoon'
import NowPlaying from '@/components/home/NowPlaying'
import OnDemand from '@/components/home/OnDemand'
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
        <ComingSoon />
        <OnDemand />

      </SlidingLayout>


    </View>
  )
}

export default Home
