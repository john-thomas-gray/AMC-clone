import React from 'react'
import { Image, ImageBackground, Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { backgrounds, banners } from '../../constants/index'
import { useBottomSheet } from '../../context/BottomSheetContext'
import BottomSheetButton from '../buttons/BottomSheetButton'
import CustomButton from '../buttons/CustomButton'


const OrderAhead = () => {
  const { bottomSheetRef: bottomSheetRef } = useBottomSheet();
  const { selectedTheatre } = useBottomSheet();
  const isTheatreSelected = selectedTheatre.length > 0 ? true : false;

  return (
    <GestureHandlerRootView>
      <ImageBackground
        source={backgrounds.redOrangeGradient}
        resizeMode="cover"
        className="flex-1 h-full w-full"
      >
        <View className="flex-1 items-center">
          <View className="flex w-full h-56">
            <Image source={!isTheatreSelected ? banners.orderAhead : banners.orderAhead2} className="w-full h-full" />
          </View>

          <View className="flex-1 p-3">
            <Text className="text-white font-gordita-bold text-3xl">
              Order Ahead
            </Text>
            <Text className="text-white font-gordita-regular text-lg mt-1 mb-2">
              Select your theatre to order your favorite food & drinks ahead of time.
            </Text>

            <BottomSheetButton
              title={selectedTheatre.length > 0 ? selectedTheatre :"Select a Participating Theatre"}
              onPress={() => {bottomSheetRef.current?.snapToIndex(1)
              }}
            />
          </View>

          {!isTheatreSelected ? (
            <>
              <View
                  className="flex-row justify-end items-center bg-black mt-4
                  h-[15.5%] w-full border-t border-gray-300"/>
            </>
          ) :
          (
            <>
              <View
                  className="px-3 pt-0 pb-1 rounded-lg w-[95%] mb-4"
                  style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
                >
                <Text className="uppercase font-gordita-regular text-md text-gray-100 mt-2">AT THIS THEATRE</Text>
                <View className="flex-row mt-1">
                  <Text className="text-white text-3xl font-gordita-bold">Express Pickup</Text>
                </View>
                <Text className="text-white font-gordita-regular text-[16px] leading-snug mt-2 mb-1">
                  When you arrive, look for our Express Pick-Up kiosk located near concessions.
                  We&apos;ll have your order ready at the time you choose.
                </Text>
              </View>

              <View
                className="flex-row justify-end bg-black mt-4 pt-5 pr-4
                h-[23.8%] w-full border-t border-gray-300"
              >
                <CustomButton
                  title="Order Now"
                  variant="white"
                  onPress={() => {console.log("Order Now pressed.")}}
                  className="items-end w-[28%]"
                />
              </View>
            </>
          )
          }
          </View>

      </ImageBackground>
    </GestureHandlerRootView>
  )
}

export default OrderAhead
