import React from 'react'
import { Image, ImageBackground, Text, View } from 'react-native'
import { backgrounds, banners } from '../../constants/index'

const OrderAhead = () => {
  return (
    <ImageBackground
            source={backgrounds.redOrangeGradient}
            resizeMode="cover"
            className="flex-1 h-full w-full"
    >
      <View className="flex-1 items-center">
        <View className="flex w-full h-56 ">
          <Image source={banners.orderAhead} className="w-full h-full" />
        </View>

        <View className="flex-1 p-2">
          <Text className="text-white text-3xl font-bold mt-4">
            Order Ahead
          </Text>
          <Text className="text-white text-lg mt-2">
            Select your theatre to order your favorite food & drinks ahead of time.
          </Text>

          {/* DROPDOWN MENU */}
        </View>

        {/* BOTTOM BLACK BAR */}
      </View>
    </ImageBackground>
  )
}

export default OrderAhead
