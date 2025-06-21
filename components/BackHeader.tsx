import { icons } from '@/constants/index'
import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'

const BackHeader = ({title, subtitle} : {title: string, subtitle: string}) => {
  return (
    <View className='flex-row bg-black flex-row'>
      <Pressable>
        <Image
          source={icons.backArrow}
          className='w-6 h-6'
          />
      </Pressable>

      <View>
        <Text className='text-white text-lg font-semibold ml-2'>
          {title}
        </Text>
        <Text className='text-white text-lg font-semibold ml-2'>
          {subtitle}
        </Text>
      </View>

      <Text className='text-white text-lg font-semibold ml-2'>
        TIMER
      </Text>
    </View>
  )
}

export default BackHeader
