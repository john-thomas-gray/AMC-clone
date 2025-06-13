import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';
import { useBottomSheet } from '../context/BottomSheetContext';

const GlobalOverlay = () => {
  const { isSheetOpen, setIsSheetOpen, bottomSheetRef } = useBottomSheet();
  const opacity = useRef(new Animated.Value(0)).current;
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isSheetOpen) {
      setShouldRender(true);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start(() => {
        setShouldRender(false);
      });
    }
  }, [isSheetOpen]);

  if (!shouldRender) return null;

  const handleOverlayPress = () => {
    setIsSheetOpen(false);
    bottomSheetRef.current?.close();
  };

  return (
    <Pressable style={StyleSheet.absoluteFill} onPress={handleOverlayPress}>
      <Animated.View style={[styles.overlay, { opacity }]} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default GlobalOverlay;
