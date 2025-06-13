import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import React from 'react'
import { FlatList, Image, Keyboard, Pressable, Text, View } from 'react-native'
import { icons } from '../../constants'
import { useBottomSheet } from '../../context/BottomSheetContext'
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

  const { setIsSheetOpen } = useBottomSheet();

  const handleSheetChange = (index: number) => {
    const isOpen = index > 0;
    setIsSheetOpen(isOpen);

    if (index === 0) {
      Keyboard.dismiss();
    }
  };

  const DummyData = {
    theatres: ["AMC Bay Street 16", "AMC Burbank 16", "AMC Century City 15", "AMC Downtown Disney 12", "AMC Empire 25", "AMC Garden State Plaza 16", "AMC Lincoln Square 13", "AMC Loews Boston Common 19", "AMC Loews Cherry Hill 24", "AMC Loews Jersey Gardens 20", "AMC Loews Lincoln Square 13", "AMC Loews Newport Centre 11", "AMC Loews Oak Tree 6", "AMC Loews Palisades Center 21", "AMC Loews Rockaway 16", "AMC Loews Stony Brook 17"]
  }

  const [selectedTheatre, setSelectedTheatre] = React.useState<string | null>(null);

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
            data={DummyData.theatres.slice(0, 5)}
            keyExtractor={(item, index) => `theatre-${index}`}
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
