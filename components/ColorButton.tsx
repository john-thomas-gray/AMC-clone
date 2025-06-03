import React from 'react';
import { Pressable } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const ColorButton = ({ label, isSelected, onPress }: {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}) => {
  const progress = useSharedValue(isSelected ? 1 : 0);

  React.useEffect(() => {
    progress.value = withTiming(isSelected ? 1 : 0, { duration: 300 });
  }, [isSelected]);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      ['#ffffff', '#bfdbfe']
    );
    const textColor = interpolateColor(
      progress.value,
      [0, 1],
      ['#000000', '#000000']
    );
    return {
      backgroundColor,
      color: textColor,
    };
  });

  return (
    <AnimatedPressable
      onPress={onPress}
      style={[{ padding: 12, borderRadius: 8, margin: 4 }, animatedStyle]}
    >
      <Animated.Text style={[{ fontWeight: '600', fontSize: 16 }, animatedStyle]}>
        {label}
      </Animated.Text>
    </AnimatedPressable>
  );
};

export default ColorButton;
