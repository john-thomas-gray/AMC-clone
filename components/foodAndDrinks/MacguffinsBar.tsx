import React from 'react'
import { Image, ImageBackground, Text, View } from 'react-native'
import { backgrounds, banners } from '../../constants/index'
import BottomSheetButton from '../buttons/BottomSheetButton'
import CustomButton from '../buttons/CustomButton'

const MacguffinsBar = () => {
  return (
    <ImageBackground
            source={backgrounds.redOrangeGradient}
            resizeMode="cover"
            className="flex-1 h-full w-full"
    >
      <View className="flex-1 items-center ">
        {/* Top Banner */}
        <View className="flex w-full h-36 ">
          <Image source={banners.macguffinsBar} className="w-full h-full" />
        </View>

        {/* Select Theatre Button */}
        <View className="flex-row  items-center w-full px-3 mt-2">
          <BottomSheetButton
            title="Select a Participating Theatre"
            onPress={() => console.log('Select a Participating Theatre pressed')}
          />
        </View>

        {/* Content Box */}
        <View
          className="px-3 pt-0 pb-1 rounded-lg w-[95%] mt-6"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
        >
          <View className="font-bold flex-row">
            <Text className="text-white text-3xl font-bold">MacGuffins</Text>
            <Text className="text-2xl text-white relative leading-none pt-2">®</Text>
            <Text className="text-white text-3xl font-bold"> Bar</Text>
          </View>
          <Text className="text-white text-lg mt-2">
            Grown-ups need movie treats, too. At MacGuffins Bar, beer and wine are always ready to be poured, and select theatres even offer premium had-crafted beverages you can&apos;t find anywhere else. For guests 21+ only.
          </Text>
        </View>

        {/* Bottom Bar */}
        <View className="flex-row bg-black justify-start items-center w-full h-[11%]
          border-t border-gray-300 px-4 mt-[160px]">
          <CustomButton
            title="Featured Drinks"
            onPress={() => (console.log("Featured Drinks Pressed"))}
            variant="black"
          />
        </View>
      </View>
    </ImageBackground>
  )
}

export default MacguffinsBar
