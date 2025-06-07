import { SlidingLayoutProps } from '@/types/type';
import React, { useRef, useState } from 'react';
import { Animated, Dimensions, LayoutChangeEvent, Pressable, View } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const SlidingLayout = ({
  sectionNames,
  children = [],
}: SlidingLayoutProps) => {
  const [textWidths, setTextWidths] = useState<number[]>([]);

  const numberOfSections = children.length;
  const sectionWidth = screenWidth / numberOfSections;
  const scrollX = useRef(new Animated.Value(0)).current;

  // Underline Animation
  const underlineTranslateX = scrollX.interpolate({
    inputRange: sectionNames.map((_, i) => i * screenWidth),
    outputRange: sectionNames.map(
      (_, i) =>
        i * sectionWidth + (sectionWidth - (textWidths[i] || 0)) / 2
    ),
    extrapolate: 'clamp',
  });
  const underlineWidth = scrollX.interpolate({
    inputRange: sectionNames.map((_, i) => i * screenWidth),
    outputRange: sectionNames.map((_, i) => textWidths[i] || 0),
    extrapolate: 'clamp',
  });
  const allTextWidthsMeasured = textWidths.length === numberOfSections && textWidths.every((w) => w > 0);

  // Text Color and Layout
  const animateTextColor = sectionNames.map((_, i) =>
  scrollX.interpolate({
    inputRange: sectionNames.map((_, j) => j * screenWidth),
    outputRange: sectionNames.map((_, j) =>
      i === j ? 'rgba(0, 168, 225, 1)' : 'rgba(255, 255, 255, 1)'
    ),
    extrapolate: 'clamp',
  })
);

  const handleTextLayout = (event: LayoutChangeEvent, index: number) => {
    const { width } = event.nativeEvent.layout;
    setTextWidths((prev) => {
      const updated = [...prev];
      updated[index] = width;
      return updated;
    });
  };

  return (
    <View className="flex-1 bg-black">
      <View className="flex relative">
        <View className={`flex flex-row justify-between`}>
          {Array.from({ length: numberOfSections }).map((_, index) => (
            <Pressable
              key={index}
              onPressIn={(e) => {}}
              onPressOut={(e) => {}}
              onTouchMove={() => {}}
              className="flex items-center justify-center"
              style={[
                { width: sectionWidth, height: 40 },
              ]}
            >
              {/* Ripple Container */}
              <View className="overflow-hidden relative justify-center items-center">
                {/* {Ripple Effect} */}
                {/* Content Container */}
                <View className="flex-1 justify-center items-center">
                  <Animated.Text
                    onLayout={(event) => handleTextLayout(event, index)}
                    style={{
                      color: animateTextColor[index],
                    }}
                    className="gordita-regular text-lg text-white"
                  >
                    {sectionNames[index]}
                  </Animated.Text>
                </View>
              </View>


            </Pressable>

          ))}
        </View>

        {/* Blue underline */}
          {allTextWidthsMeasured && (
            <Animated.View
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                height: 3,
                width: underlineWidth || 0,
                transform: [{ translateX: underlineTranslateX }],
              }}
              className="bg-blue-100 rounded-full"
            />
          )}
      </View>

      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ width: screenWidth * numberOfSections }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { x: scrollX },
              },
            },
          ]
        )}
        scrollEventThrottle={16}
      >
        {children}
      </Animated.ScrollView>
    </View>
  )
}

export default SlidingLayout
