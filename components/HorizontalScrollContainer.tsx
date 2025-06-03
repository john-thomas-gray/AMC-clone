import React from 'react'
import { ScrollView, Text, View } from 'react-native'

const HorizontalScrollContainer = ({children}: {children: React.ReactNode}) => {
  return (
    <View className="flex-1 bg-black">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        directionalLockEnabled={true}
        pagingEnabled={true}
        decelerationRate={'fast'}
        contentContainerStyle={{
          borderWidth: 10,
          borderColor: 'rgb(255, 0, 0)',
          backgroundColor: 'rgb(38, 0, 255)',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}
      >
        {children}
      </ScrollView>
    <View>
      <Text className="font-gordita-regular text-white text-3xl">Additional Content</Text>
    </View>
  </View>
)
}

export default HorizontalScrollContainer
