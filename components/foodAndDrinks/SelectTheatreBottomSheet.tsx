import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import React, { useContext } from 'react'
import { FlatList, Image, Keyboard, Pressable, Text, View } from 'react-native'
import { icons } from '../../constants'
import { useBottomSheet } from '../../context/BottomSheetContext'
import { TheatreDataContext } from '../../context/theatreDataContext'
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
  snapPoints = ['1%', '56%'],
  initialSnapIndex=0
  }: SelectTheatreBottomSheetProps) => {

  const { setIsSheetOpen, setSelectedTheatre, selectedTheatre } = useBottomSheet();
  const { theatres } = useContext(TheatreDataContext);

  const handleSheetChange = (index: number) => {
    const isOpen = index > 0;
    setIsSheetOpen(isOpen);

    if (index === 0) {
      Keyboard.dismiss();
    }
  };

  // Extract theatre names from context data
  const theatreNames = theatres.map(theatre => theatre.name);

  const handleTheatreSelection = (theatre: string) => {
    setSelectedTheatre(theatre);
    setIsSheetOpen(false);
    bottomSheetRef?.current?.close();
  }

  return (
    <>
      {children}
      <BottomSheet
        index={initialSnapIndex}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        ref={bottomSheetRef}
        enableOverDrag={false}
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
        <BottomSheetView className="flex-1 bg-gray-400">
          <View className="flex-row justify-between px-4 ">
            <View className="w-[80%]">
              <Text className="text-white font-gordita-bold text-3xl">
                Select a Participating Theatre
              </Text>
            </View>
            <XButton onPress={onPressX} />
          </View>

          <FlatList
            className="flex-1 pb-10"
            ListHeaderComponent={
              <View className="px-4">
                <Text className="text-gray-200 uppercase font-gordita-bold text-lg pt-10 pb-6">
                  NEARBY THEATRES
                </Text>
              </View>
            }
            data={theatreNames.slice(0, 5)}
            keyExtractor={(item, index) => `theatre-${item}-${index}`}
            renderItem={({ item }) => (
              <Pressable
                className="w-full"
                onPress={() => handleTheatreSelection(item)}
              >
                <View className="flex-row justify-between items-center h-12 bg-gray-400 px-4">
                  <Text className={`text-white ${item === selectedTheatre ? 'font-gordita-bold' : 'font-gordita-regular' } text-lg`}>
                    {item}
                  </Text>
                  {selectedTheatre === item && (
                    <Image
                      source={icons.checkmark}
                      className="h-5 w-5 "
                      resizeMode="contain"
                    />
                  )}
                </View>
              </Pressable>
            )}
            ListFooterComponent={
              <Pressable
                className="px-4 py-6"
                onPress={() => {
                  console.log("Change Location Pressed");
                }}
              >
                <Text className="text-blue-100 font-gordita-regular text-lg">
                  Change Location...
                </Text>
              </Pressable>
            }
          />

        </BottomSheetView>
      </BottomSheet>
    </>
  )
}

export default SelectTheatreBottomSheet
