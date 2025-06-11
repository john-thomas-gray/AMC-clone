import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import React from 'react'
import { View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

type SelectTheatreBottomSheetProps = {
  style: 'grey' | 'black',
  children?: React.ReactNode,
  snapPoints?: number[] | string[],
  initialSnapIndex: string | number | 0,
  bottomSheetRef?: React.RefObject<any>,
}

const SelectTheatreBottomSheet = ({ style, children, bottomSheetRef, snapPoints, initialSnapIndex }: SelectTheatreBottomSheetProps) => {
  return (
    <GestureHandlerRootView>
      <View className="flex-1 bg-grey-100">
        <View className={`flex-1 ${style === 'black' ? 'bg-black' : 'bg-grey-100'}`}>
          <BottomSheet
            snapPoints={snapPoints || ['25%', '50%', '75%']}
            initialSnapIndex={initialSnapIndex || 0}
            index={0}
            ref={bottomSheetRef}
          >
            <BottomSheetView>
              <View className="flex-1">
                {children}

              </View>
            </BottomSheetView>
          </BottomSheet>
        </View>
      </View>
    </GestureHandlerRootView>
  )
}

export default SelectTheatreBottomSheet
