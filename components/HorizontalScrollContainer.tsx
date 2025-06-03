import React from 'react'
import { Text, View } from 'react-native'

const HorizontalScrollContainer = ({children}: {children: React.ReactNode}) => {
  return (
    <View>
      <Text>HorizontalScrollContainer</Text>
      {children}
    </View>
  )
}

export default HorizontalScrollContainer
