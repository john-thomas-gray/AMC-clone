import React from 'react'
import { Image, Pressable, View } from 'react-native'

const XButton = () => {
  return (
    <View>
      <Pressable
        className="absolute top-4 right-4 z-50 p-2 bg-gray-800 rounded-full"
        onPress={() => console.log('X Button Pressed')}
      >
        <Image
          source={require('../../assets/icons/x.png')}
          className="w-6 h-6"
        />
      </Pressable>
    </View>
  )
}

export default XButton
