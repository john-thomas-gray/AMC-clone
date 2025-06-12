import { icons } from '@/constants'
import React from 'react'
import { Image, Pressable, View } from 'react-native'

const XButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <View>
      <Pressable
        className="w-full items-center justify-center"
        onPress={onPress}
      >
        <Image
          source={icons.xIcon}
          className="w-9 h-9"
        />
      </Pressable>
    </View>
  )
}

export default XButton
