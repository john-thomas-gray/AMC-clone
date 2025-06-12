import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import React from 'react'
import { Keyboard, Text, View } from 'react-native'
import XButton from '../buttons/XButton'

type SelectTheatreBottomSheetProps = {
  children?: React.ReactNode,
  onPressX: () => void,
  snapPoints?: number[] | string[],
  initialSnapIndex: number | 0,
  bottomSheetRef?: React.RefObject<any>,
}

const SelectTheatreBottomSheet = ({
  children,
  onPressX,
  bottomSheetRef,
  snapPoints = ['25%', '50%', '75%'],
  initialSnapIndex=0
  }: SelectTheatreBottomSheetProps) => {

  const handleSheetChange = (index: number) => {
  if (index === 0) {
    Keyboard.dismiss();
  }
  };

  return (
    <>
      {children}
      <BottomSheet
        index={initialSnapIndex}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        ref={bottomSheetRef}
        // animateOnMount={true}
        enablePanDownToClose={true}
        backgroundStyle={{
          backgroundColor: '#141414',
        }}
        handleStyle={{
          backgroundColor: '#141414',
        }}
        handleIndicatorStyle={{
          backgroundColor: '#141414',
        }}
      >
        <BottomSheetView className="flex-1 bg-gray-400 ">
          <View className="flex-1 flex-row items-center justify-between bg-gray-400 px-4 ">
            <View className="flex w-[80%]">
              <Text className="text-white font-gordita-bold text-3xl">
                Select a Participating Theatre
              </Text>
            </View>
            <XButton onPress={onPressX} />
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  )
}

export default SelectTheatreBottomSheet
