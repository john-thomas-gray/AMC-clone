import { backgrounds } from '@/constants'
import React from 'react'
import { FlatList, ImageBackground, ScrollView, Text, View } from 'react-native'

const MyAmc = () => {
  return (

      <View className="flex-1">
        <ImageBackground
          source={backgrounds.purpleGradient}
          resizeMode="cover"
          className="flex-1 h-full w-full"
        >
          <ScrollView className="flex-1">
            <View className="flex flex-col w-full p-3">
              <View className="flex flex-row my-3 items-right space-between border-b-2 border-gray-300">
                <Text className="text-white text-3xl font-gordita-bold mb-6">
                  Already a member?
                </Text>
                {/* <CustomButton /> */}
              </View>

              <Text className="text-white text-3xl font-gordita-bold">
                Not a member? Join Now!
              </Text>

              <FlatList>

              </FlatList>
            </View>
          </ScrollView>
        </ImageBackground>
      </ View>

  )
}

export default MyAmc
