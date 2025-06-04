import { SlidingHeaderProps } from '@/types/type';
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

const SlidingHeader = ({
  sectionNames,
  currentSectionIndex = 0,
  onSectionChange = () => {},
  className = '',
}: SlidingHeaderProps) => {
  const numberOfSections = sectionNames.length;
  const sectionWidth = screenWidth / numberOfSections;
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(currentSectionIndex * sectionWidth)).current;
  const underlineTranslateX = scrollX;
  const [currentIndex, setCurrentIndex] = useState(currentSectionIndex);
  const [pressedIndex, setPressedIndex] = useState<number | null>(null);
  const [initialTouchPos, setInitialTouchPos] = useState<{ x: number; y: number } | null>(null);

  const fillTimerRef = useRef<NodeJS.Timeout | null>(null);
  const wasCanceledRef = useRef(false);

  const [textAnimValues, setTextAnimValues] = useState<number[]>(() =>
  sectionNames.map((_, i) => (i === currentSectionIndex ? 1 : 0))
  );

  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const [pressIn, setPressIn] = useState(false);
  const [ripplePos, setRipplePos] = useState({ x: 0, y: 0 });

  const colorAnimations = useRef(
      sectionNames.map((_, i) => new Animated.Value(i === currentSectionIndex ? 1 : 0))
    ).current;

  const handlePressIn = (event: GestureResponderEvent, index: number) => {
    wasCanceledRef.current = false;
    setInitialTouchPos({
      x: event.nativeEvent.pageX,
      y: event.nativeEvent.pageY,
    });

    const { locationX, locationY } = event.nativeEvent;
    setRipplePos({ x: locationX, y: locationY });

    opacity.setValue(0.4);
    scale.setValue(0);

    Animated.timing(scale, {
      toValue: 2.5,
      duration: 3000,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };


  const cancelPress = () => {
    setPressedIndex(null);
    setInitialTouchPos(null);
    setPressIn(false);

    if (fillTimerRef.current) {
      clearTimeout(fillTimerRef.current);
      fillTimerRef.current = null;
    }

    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };


  const handleTouchMove = (event: GestureResponderEvent) => {
    if (initialTouchPos == null || pressedIndex == null) return;

    const { pageX, pageY } = event.nativeEvent;
    const dx = pageX - initialTouchPos.x;
    const dy = pageY - initialTouchPos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 10) {
      cancelPress();
    }
  };


  const handlePressOut = (index: number) => {
  if (wasCanceledRef.current) {
    wasCanceledRef.current = false;
    return;
  }

  setPressedIndex(null);
  setPressIn(false);

  if (fillTimerRef.current) {
    clearTimeout(fillTimerRef.current);
    fillTimerRef.current = null;
  }

  Animated.timing(opacity, {
    toValue: 0,
    duration: 200,
    useNativeDriver: true,
  }).start();

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

  setCurrentIndex(index);
  onSectionChange(index);

  scrollViewRef.current?.scrollTo({
    x: index * sectionWidth,
    animated: true,
  });
};


  useEffect(() => {

    Animated.spring(underlineTranslateX, {
      toValue: currentIndex * sectionWidth,
      useNativeDriver: true,
    }).start();
  }, [currentIndex]);

  useEffect(() => {
  const listenerId = scrollX.addListener(({ value }) => {
    const newAnimValues = sectionNames.map((_, i) => {
      const distance = Math.abs(value - i * sectionWidth);
      const progress = Math.max(0, 1 - distance / sectionWidth);
      return progress;
    });
    setTextAnimValues(newAnimValues);
  });

  return () => {
    scrollX.removeListener(listenerId);
  };
}, []);

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
                {pressedIndex === index && (
                  <Animated.View
                    pointerEvents="none"
                    style={[
                      styles.ripple,
                      {
                        top: ripplePos.y - 150,
                        left: ripplePos.x - 150,
                        transform: [{ scale }],
                        opacity,
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

        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: 3,
            width: sectionWidth,
            transform: [
              {
                translateX: underlineTranslateX,
              },
            ],
          }}
          className="bg-blue-100 rounded-full"
        />
      </View>

      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX  } } }],
          { useNativeDriver: false }
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ width: sectionWidth * numberOfSections }}
        className={`flex-row ${className}`}
      >
        {sectionNames.map((_, index) => (
          <View
            key={index}
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white' }}>Section {index + 1}</Text>
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

export default SlidingHeader;
