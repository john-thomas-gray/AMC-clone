import { icons } from '@/constants'
import { HeaderProps } from '@/types/type'
import React from 'react'
import { Text, View } from 'react-native'
import HeaderButton from './buttons/HeaderButton'

const CustomHeader = ({ title, showSettings = true }: HeaderProps) => {
  return (
    <View className="flex bg-black pt-14 pb-3 px-3">
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
