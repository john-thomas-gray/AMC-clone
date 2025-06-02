import { icons } from '@/constants'
import React from 'react'
import { Text, View } from 'react-native'
import HeaderButton from './HeaderButton'

const CustomHeader = ({ title, showSettings = true }: { title: string; showSettings: boolean }) => {
  return (
    <View className="flex bg-black pt-14 pb-3 px-3 border-red-500 border-5">
      <View className="flex flex-row items-center justify-between pt-8">
        <Text className="flex justify-start text-white text-3xl font-bold font-gordita-bold">{title}</Text>
        <View className="flex flex-row ">
          {showSettings &&
          <HeaderButton
            icon={icons.settings}
            link="someLink"
            additionalStyles="ml-5"
          />
          }
          <HeaderButton
            icon={icons.search}
            link="someLink"
            additionalStyles="ml-5"
          />
          <HeaderButton
            icon={icons.mail}
            link="someLink"
            additionalStyles="ml-5"
          />
          <HeaderButton
            icon={icons.profile}
            link="someLink"
            additionalStyles="ml-5"
          />
        </View>
      </View>
    </View>
  )
}

export default CustomHeader
