import React from 'react'
import { Animated, Text, View } from 'react-native'

const HorizontalScrollContainer = ({data}) => {
  return (
    <Animated.ScrollView
              ref={data.scrollViewRef}
              horizontal
              pagingEnabled
              scrollEventThrottle={16}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: data.scrollX  } } }],
                { useNativeDriver: false }
              )}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ width: data.screenWidth * data.sectionNames.length }}
              className={`flex-row ${data.className}`}
            >
              {data.sectionNames.map((_, index) => (
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
)
}

export default HorizontalScrollContainer
