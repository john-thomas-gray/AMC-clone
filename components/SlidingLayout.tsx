import { SlidingLayoutProps } from '@/types/type';
import React, { useRef, useState } from 'react';
import { Animated, Dimensions, LayoutChangeEvent, Pressable, ScrollView, View } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const SlidingLayout = ({
  buttonNames,
  children = [],
}: SlidingLayoutProps) => {
  const [textWidths, setTextWidths] = useState<number[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  // Buttons
  const numberOfButtons = children.length;
  const buttonWidth = screenWidth / numberOfButtons;
  const [selectedButton, setSelectedButton] = useState<number>(0);

  // Button animations
  const [isButtonAnimating, setIsButtonAnimating] = useState<boolean>(false);
  const rippleScale = useRef(new Animated.Value(0)).current;
  const [initialTouchPos, setInitialTouchPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });


  const handlePressIn = (index: number) => {
    setSelectedButton(index);
    setIsButtonAnimating(true);
    console.log('Press in at index:', selectedButton);
    console.log('Initial touch position:', initialTouchPos);
    console.log('buttonIsAnimating:', isButtonAnimating);

    handleAnimation();
  };

  const handlePressOut = (index:number) => {
     Animated.timing(scrollX, {
      toValue: index * screenWidth,
      duration: 300,
      useNativeDriver: false,
    }).start();

    scrollViewRef.current?.scrollTo({
      x: index * screenWidth,
      animated: true,
    });
  }

  const handleAnimation = () => {
    console.log('Ripple animation started');
    rippleScale.setValue(0);
    Animated.timing(rippleScale, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // setIsButtonAnimating(false);
    });
  }


  // Underline Animation
  const underlineTranslateX = scrollX.interpolate({
    inputRange: buttonNames.map((_, i) => i * screenWidth),
    outputRange: buttonNames.map(
      (_, i) =>
        i * buttonWidth + (buttonWidth - (textWidths[i] || 0)) / 2
    ),
    extrapolate: 'clamp',
  });
  const underlineWidth = scrollX.interpolate({
    inputRange: buttonNames.map((_, i) => i * screenWidth),
    outputRange: buttonNames.map((_, i) => textWidths[i] || 0),
    extrapolate: 'clamp',
  });
  const allTextWidthsMeasured = textWidths.length === numberOfButtons && textWidths.every((w) => w > 0);

  // Text Color and Layout
  const animateTextColor = buttonNames.map((_, i) =>
  scrollX.interpolate({
    inputRange: buttonNames.map((_, j) => j * screenWidth),
    outputRange: buttonNames.map((_, j) =>
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
          {Array.from({ length: numberOfButtons }).map((_, index) => (
            <Pressable
              key={index}
              onPressIn={() => handlePressIn(index)}
              onPressOut={() => handlePressOut(index)}
              // onTouchMove={() => {}}
              className={`flex items-center justify-center
              ${selectedButton === index && isButtonAnimating ? 'bg-scrollButton-pressed' : 'bg-scrollButton-default'}`}
              style={[
                { width: buttonWidth, height: 60 },
              ]}
            >
              {/* Ripple Container */}
              <View className="overflow-hidden relative justify-center items-center">
                {/* {Ripple Effect} */}
                {selectedButton === index && isButtonAnimating && (
                  <Animated.View
                      style={{
                        width: 300,
                        height: 300,
                        borderRadius: 150,
                        position: 'absolute',
                        top: initialTouchPos.y - 150,
                        left: initialTouchPos.x - 150,
                        transform: [{ scale: rippleScale }],
                      }}
                    />
                )}
                {/* Content Container */}
                <View
                  className={`flex-1 justify-center items-center`}

                  >
                  <Animated.Text
                    onLayout={(event) => handleTextLayout(event, index)}
                    style={{
                      color: animateTextColor[index],
                    }}
                    className="gordita-regular text-lg text-white"
                  >
                    {buttonNames[index]}
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
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ width: screenWidth * numberOfButtons }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { x: scrollX },
              },
            },
          ],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {children}
      </Animated.ScrollView>
    </View>
  )
}

export default SlidingLayout
