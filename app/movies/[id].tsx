import SlidingLayout from '@/components/SlidingLayout'
import Details from '@/components/movies/details'
import Showtimes from '@/components/movies/showtimes'
import Videos from '@/components/movies/videos'
import { backgrounds } from '@/constants/index'
import React from 'react'
import { Image, Text, View } from 'react-native'

const MovieDetail = () => {

  const data = {
    buttonNames: ['SHOWTIMES', 'DETAILS', 'VIDEOS'],
  }

  return (
    <View className='flex-1 flex-col border border-red-500bg-black'>
      <Image
        source={{ uri: backgrounds.yellowGradient }}
        style={{ width: '100%', height: 200 }}
        className='mb-4'
        resizeMode='cover'
      />
      <Text>[id]</Text>
      <SlidingLayout
        buttonNames={data.buttonNames}
      >
        <Showtimes />
        <Details />
        <Videos />
      </SlidingLayout>
    </View>
  )
}

export default MovieDetail
