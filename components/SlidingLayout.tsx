import { icons } from '@/constants';
import { SlidingLayoutProps } from '@/types/type';
import { getCurrentDate } from '@/utils/date';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, GestureResponderEvent, LayoutChangeEvent, Pressable, ScrollView, View } from 'react-native';
import { IconButton } from './buttons/IconButton';

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
  const buttonHeight = 56
  const [selectedButton, setSelectedButton] = useState<number>(0);

  // Button animations
  const [isButtonAnimating, setIsButtonAnimating] = useState<boolean>(false);
  const rippleScale = useRef(new Animated.Value(0)).current;
  const [initialTouchPos, setInitialTouchPos] = useState<{ x: number; y: number }>({ x: 10, y: 0 });


  const handlePressIn = (event: GestureResponderEvent, index: number) => {
    const { locationX, locationY } = event.nativeEvent;
    // console.log("locx: ", locationX, "locy: ", locationY)
    setInitialTouchPos({ x: locationX, y: locationY });
    setSelectedButton(index);
    setIsButtonAnimating(true);
    // console.log('Press in at index:', selectedButton);
    // console.log('Initial touch position:', initialTouchPos);
    // console.log('buttonIsAnimating:', isButtonAnimating);

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
    // console.log('Ripple animation started');
    rippleScale.setValue(0);
    Animated.timing(rippleScale, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setIsButtonAnimating(false);
      rippleScale.setValue(0);
      setInitialTouchPos({
      x: 0,
      y: 0,
    });
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

  useEffect(() => {
    // console.log('Updated initialTouchPos:', initialTouchPos);
  }, [initialTouchPos]);

  return (
    <View className="flex-1 bg-black">
      {/* Buttons */}
      <View className="flex relative bg-black">
        <View className={`flex flex-row justify-between`}>
          {Array.from({ length: numberOfButtons }).map((_, index) => (
            <Pressable
              key={index}
              onPressIn={(event) => handlePressIn(event, index)}
              onPressOut={() => handlePressOut(index)}
              // onTouchMove={() => {}}
              className={`flex items-center justify-center
              ${selectedButton === index && isButtonAnimating ? 'bg-scrollButton-pressed' : 'bg-scrollButton-default'}`}
              style={[
                { width: buttonWidth, height: buttonHeight },
              ]}
            >
              {/* Ripple Container */}
              <View
                className="overflow-hidden relative justify-center items-center"
                style={{ width: buttonWidth, height: buttonHeight }}
              >
                {/* {Ripple Effect} */}
                {selectedButton === index && isButtonAnimating && (
                  <Animated.View
                    style={{
                      width: buttonWidth * 2,
                      height: buttonWidth * 2,
                      borderRadius: buttonWidth,
                      position: 'absolute',
                      top: initialTouchPos.y - buttonWidth,
                      left: initialTouchPos.x - buttonWidth,
                      transform: [{ scale: rippleScale }],
                      backgroundColor: 'rgba(0, 168, 225, 0.1)',
                      // backgroundColor: 'rgb(255, 0, 234)',
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

      {buttonNames[selectedButton] === 'SHOWTIMES' && (
        <View className="flex-row justify-between items-center bg-black p-10">
          <IconButton title="LOCATION" icon={icons.calendar} />
          <IconButton title={getCurrentDate()} icon={icons.targetWhite} />
          <IconButton title="Premium Offerings" icon={icons.settings} />
        </View>
      )}

      {/* Scrollable Content */}
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
        onMomentumScrollEnd={(event) => {
          const offsetX = event.nativeEvent.contentOffset.x;
          const newIndex = Math.round(offsetX / screenWidth);
          setSelectedButton(newIndex);
        }}
      >
        {React.Children.map(children, (child, index) => (
          <View key={index} style={{ width: screenWidth }}>
            {child}
          </View>
        ))}
      </Animated.ScrollView>

    </View>
  )
}

export default SlidingLayout
