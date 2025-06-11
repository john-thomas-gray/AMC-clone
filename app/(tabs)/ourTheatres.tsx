import MyFavoriteTheatres from '@/components/ourTheatres/MyFavoriteTheatres'
import TheatresNearYou from '@/components/ourTheatres/TheatresNearYou'
import SlidingLayout from '@/components/SlidingLayout'
import React from 'react'
import { View } from 'react-native'



const OurTheatres = () => {
  return (
    <View className="flex-1 bg-black">
      <SlidingLayout buttonNames= {['THEATRES NEAR YOU', 'MY FAVORITE THEATRES']}>
        <TheatresNearYou />
        <MyFavoriteTheatres />
      </SlidingLayout>
    </View>
  )
}

export default OurTheatres
