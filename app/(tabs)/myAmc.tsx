import CustomButton from '@/components/CustomButton'
import { backgrounds } from '@/constants'
import React from 'react'
import { ImageBackground, ScrollView, Text, View } from 'react-native'

const MyAmc = () => {
  return (

      <View className="flex-1">
        <ImageBackground
          source={backgrounds.purpleGradient}
          resizeMode="cover"
          className="flex-1 h-full w-full"
        >
          <ScrollView className="flex-1">
            <View className="flex flex-col w-full">
              <View className="flex flex-row items-center mt-3 mb-5 px-3 justify-between">
                <Text className="text-white text-3xl font-gordita-bold">
                  Already a member?
                </Text>
                <CustomButton
                  title="Sign In"
                  onPress={() => { console.log('Sign In Pressed') }}
                  variant="transparent"
                  IconLeft={undefined}
                  IconRight={undefined}
                />
              </View>

              <Text className="text-white text-3xl font-gordita-bold px-3 py-5
              border-t border-gray-300">
                Not a member? Join Now!
              </Text>

              {/* <StubsCard backgroundStyle="bg-red-500" /> */}

              {/* <FlatList>

              </FlatList> */}
            </View>
          </ScrollView>
        </ImageBackground>
      </ View>

  )
}

export default MyAmc
