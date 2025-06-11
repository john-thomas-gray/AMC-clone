import React from 'react'
import { Image, ImageBackground, Text, View } from 'react-native'
import { backgrounds, banners } from '../../constants/index'
import BottomSheetButton from '../buttons/BottomSheetButton'

const OrderAhead = () => {
  return (
    <ImageBackground
      source={backgrounds.redOrangeGradient}
      resizeMode="cover"
      className="flex-1 h-full w-full"
    >
      <View className="flex-1 items-center">
        <View className="flex w-full h-56">
          <Image source={banners.orderAhead} className="w-full h-full" />
        </View>

        <View className="flex-1 p-3">
          <Text className="text-white text-3xl font-bold">
            Order Ahead
          </Text>
          <Text className="text-white text-lg mt-1 mb-2">
            Select your theatre to order your favorite food & drinks ahead of time.
          </Text>

          <BottomSheetButton
            title="Select a Participating Theatre"
            onPress={() => console.log('Select a Participating Theatre pressed')}
          />

        </View>

        <View
          className="flex-row justify-end items-center bg-black mt-4
          h-[15.5%] w-full border-t border-gray-300"/>
      </View>
    </ImageBackground>
  )
}

export default OrderAhead
