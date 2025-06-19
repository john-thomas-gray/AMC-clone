import { icons } from '@/constants/index'
import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'

const BackHeader = () => {
  return (
    <View>
      <Pressable>
        <Image source={icons.backArrow} />
      </Pressable>
      <Text>BackHeader</Text>
    </View>
  )
}

export default BackHeader
