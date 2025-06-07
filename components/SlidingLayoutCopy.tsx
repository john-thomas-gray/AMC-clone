import { SlidingLayoutProps } from '@/types/type';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  GestureResponderEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const SlidingLayout = ({
  sectionNames,
  currentSectionIndex = 0,
  onSectionChange = () => {},
  className = '',
  children = [],
}: SlidingLayoutProps) => {
  const numberOfSections = sectionNames.length;
  const sectionWidth = screenWidth / numberOfSections;
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(currentSectionIndex * sectionWidth)).current;
  const underlineTranslateX = scrollX;
  const [currentIndex, setCurrentIndex] = useState(currentSectionIndex);
  const [pressedIndex, setPressedIndex] = useState<number | null>(null);
  const [initialTouchPos, setInitialTouchPos] = useState<{ x: number; y: number } | null>(null);

  const wasCanceledRef = useRef(false);

  // Initialize text animation values for each section to 1 or 0 based on the current section index
  const [textAnimValues, setTextAnimValues] = useState<number[]>(() =>
  sectionNames.map((_, i) => (i === currentSectionIndex ? 1 : 0))
  );
  // Initialize color animations for each section
  const colorAnimations = useRef(
      sectionNames.map((_, i) => new Animated.Value(i === currentSectionIndex ? 1 : 0))
    ).current;

  const rippleScale = useRef(new Animated.Value(0)).current;
  const [pressIn, setPressIn] = useState(false);
  const [ripplePos, setRipplePos] = useState({ x: 0, y: 0 });



  const handlePressIn = (event: GestureResponderEvent, index: number) => {
    console.log('Press in at index:', index);
    wasCanceledRef.current = false;
    setInitialTouchPos({
      x: event.nativeEvent.pageX,
      y: event.nativeEvent.pageY,
    });

    const { locationX, locationY } = event.nativeEvent;
    setRipplePos({ x: locationX, y: locationY });

    rippleScale.setValue(0);

    Animated.timing(rippleScale, {
      toValue: 2.5,
      duration: 3000,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const handleTouchMove = (event: GestureResponderEvent) => {

    if (!wasCanceledRef.current) {
      console.log('Touch move detected');
      if (initialTouchPos == null || pressedIndex == null) return;

      const { pageX, pageY } = event.nativeEvent;
      const dx = pageX - initialTouchPos.x;
      const dy = pageY - initialTouchPos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 10) {
        wasCanceledRef.current = true;
        cancelPress();
      }
    }
  };

  const cancelPress = () => {
    console.log('Press canceled');
    setPressedIndex(null);
    setInitialTouchPos(null);
    setPressIn(false);
  };

  const handlePressOut = (index: number) => {
    console.log('Press out at index:', index);
    if (wasCanceledRef.current) {
      wasCanceledRef.current = false;
      return;
    }

    setTimeout(() => setPressedIndex(null), 200);
    setPressIn(false);

    if (index === currentIndex) return;

    Animated.timing(colorAnimations[currentIndex], {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();

    Animated.timing(colorAnimations[index], {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();

    Animated.timing(underlineTranslateX[currentIndex], {
      toValue: index * sectionWidth,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setCurrentIndex(index);
    onSectionChange(index);

    scrollViewRef.current?.scrollTo({
      x: index * sectionWidth,
      animated: true,
    });
  };


  useEffect(() => {

    const listenerId = scrollX.addListener(({ value }) => {
      const newAnimValues = sectionNames.map((_, i) => {
        const distance = Math.abs(value - i * sectionWidth);
        const progress = Math.max(0, 1 - distance / sectionWidth);
        return progress;
      });
      setTextAnimValues(newAnimValues);

      // Update currentIndex when scrolling nears a new section
      const newIndex = Math.round(value / sectionWidth);
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    });

  return () => {
    scrollX.removeListener(listenerId);
  };
}, [scrollX, sectionNames, sectionWidth, currentIndex]);


  return (
    <View className="flex-1">
      <View className="relative">
        <View className="flex-row">
          {Array.from({ length: numberOfSections }, (_, index) => (
            <Pressable
              key={index}
              onPressIn={(e) => handlePressIn(e, index)}
              onPressOut={() => handlePressOut(index)}
              onTouchMove={handleTouchMove}
              className="flex items-center justify-center"
              style={[
                { width: sectionWidth, height: 40 },
                pressedIndex === index && styles.buttonPressed,
              ]}
            >
              <View
                style={[
                  styles.rippleContainer,
                  { width: sectionWidth, height: 40 }
                ]}
              >
                {/* Ripple effect */}
                {pressedIndex === index && (
                  <Animated.View
                    pointerEvents="none"
                    style={[
                      styles.ripple,
                      {
                        top: ripplePos.y - 150,
                        left: ripplePos.x - 150,
                        transform: [{ rippleScale }]
                      },
                    ]}
                  />
                )}
                <View style={styles.contentContainer}>
                  <Text
                    style={{
                      color: `rgba(
                        ${Math.round(255 * (1 - textAnimValues[index]))},
                        ${Math.round(255 * (1 - textAnimValues[index]) + 168 * textAnimValues[index])},
                        ${Math.round(255 * (1 - textAnimValues[index]) + 225 * textAnimValues[index])},
                        1
                      )`,
                      fontFamily: 'gordita-regular',
                    }}
                  >
                    {sectionNames[index]}
                  </Text>
                </View>
              </View>
            </Pressable>

          ))}
        </View>

        {/* Blue bar */}
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: 3,
            width: sectionWidth,
            transform: [{ translateX: underlineTranslateX }],
          }}
          className="bg-blue-100 rounded-full"
        />
      </View>

      {/* Content box */}
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
            listener: (event) => {
              const x = event.nativeEvent.contentOffset.x;
              const newIndex = Math.round(x / screenWidth);

              if (newIndex !== currentIndex) {
                setCurrentIndex(newIndex);
                onSectionChange(newIndex);
              }
            },
          }
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ width: screenWidth * numberOfSections }}
        className={`flex-row ${className}`}

      >
        {React.Children.map(children, (child, index) => (
          <View
            key={index}
            style={{
              width: screenWidth,
              height: '100%',
            }}
          >
            {child}
          </View>
        ))}
      </Animated.ScrollView>


    </View>
  );
};

const styles = StyleSheet.create({
  buttonPressed: {
    backgroundColor: 'rgba(0, 168, 225, 0.1)',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ripple: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(0, 168, 225, 0.3)',
  },
  rippleContainer: {
  overflow: 'hidden',
  position: 'relative',
  justifyContent: 'center',
  alignItems: 'center',
  }
});

export default SlidingLayout;
