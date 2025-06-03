import { SlidingHeaderProps } from '@/types/type';
import React from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const SlidingHeader = ({
  numberOfSections,
  sectionNames,
  currentSectionIndex = 0,
  onSectionChange = () => {},
  className = ''
}: SlidingHeaderProps) => {
  const sectionWidth = screenWidth / numberOfSections;

  return (
    <View className='flex-1'>
      <View className='flex-1 flex-row items-start justify-evenly'>
        {Array.from({ length: numberOfSections }, (_, index) => (
            <View
              key={index}
              className="flex flex-row justify-evenly items-center border border-red-100 bg-black"
              style={{ width: sectionWidth, height: 40 }}
            >
              <Text className="font-gordita-regular text-white items-center">{sectionNames[index]}</Text>
            </View>
          ))}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        // canCancelContentTouches={false}
        disableIntervalMomentum={true}
        directionalLockEnabled={true}
        indicatorStyle='white'
        pagingEnabled={true}
        decelerationRate={'fast'}
      >
        {Array.from ({ length: numberOfSections }, (_, index) => (
          <View
            key={index}
            className="rounded-full mx-1 bg-blue-100"
            style={{ width: sectionWidth, height: 4 }}
          />
          ))}
      </ScrollView>
    </View>
  )
}

export default SlidingHeader
