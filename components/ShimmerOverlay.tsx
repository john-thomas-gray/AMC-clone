import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  ImageProps,
  ImageSourcePropType,
  StyleSheet,
  View
} from "react-native";

type ShimmerOverlayProps = {
  source: ImageSourcePropType;
  imageSource: ImageSourcePropType;
  className?: string;
} & Omit<ImageProps, "source">;

const ShimmerOverlay = ({
  source,
  imageSource,
  className = "",
  ...props
}: ShimmerOverlayProps) => {
  const translateX = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    translateX.setValue(-1);
    Animated.loop(
      Animated.timing(translateX, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true
      })
    ).start();
  }, []);

  const shimmerTranslate = translateX.interpolate({
    inputRange: [-1, 1],
    outputRange: [-550, 550]
  });

  return (
    <View className={`${className}`}>
      <Image
        source={imageSource}
        className="h-[100%] w-[100%]"
        resizeMode="cover"
      />
      <MaskedView
        style={[StyleSheet.absoluteFill]}
        maskElement={
          <Image
            source={source}
            {...props}
            className="w-[100%] h-[100%]"
            resizeMode="cover"
          />
        }
      >
        <View style={{ flex: 1, backgroundColor: "white/0" }}>
          <Animated.View
            pointerEvents="none"
            style={[
              StyleSheet.absoluteFillObject,
              {
                transform: [{ translateX: shimmerTranslate }]
              }
            ]}
          >
            <LinearGradient
              colors={["transparent", "rgba(255,255,255,0.1)", "transparent"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.gradient}
            />
          </Animated.View>
        </View>
      </MaskedView>
    </View>
  );
};

const styles = StyleSheet.create({
  gradient: {
    width: 600,
    height: "100%"
  }
});

export default ShimmerOverlay;
