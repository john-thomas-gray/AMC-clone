import { icons } from '@/constants'
import React from 'react'
import { Text, View } from 'react-native'
import HeaderButton from './HeaderButton'

const CustomHeader = ({ title }: { title: string }) => {
  return (
    <View className="flex bg-black pt-14 pb-3 px-5">
      <View className="flex flex-row items-center justify-between pt-8">
        <Text className="flex justify-start text-white text-3xl font-bold">{title}</Text>
        <View className="flex flex-row">
          <HeaderButton
            icon={icons.amcTab}
            link="someLink"
          />
          <HeaderButton
            icon={icons.amcTab}
            link="someLink"
          />
          <HeaderButton
            icon={icons.amcTab}
            link="someLink"
          />
          <HeaderButton
            icon={icons.amcTab}
            link="someLink"
          />

        </View>
      </View>
    </View>
  )
}

export default CustomHeader
