import React from 'react'
import { View } from 'react-native'
import CustomButton from './CustomButton'

const OnDemand = () => {
  return (
    <View className="flex-1 bg-black">
      <View>
      </View>
      <View>
      </View>
      <View>
      </View>
      <View>
        <CustomButton
          title="Learn More"
          onPress={() => {console.log("Learn More button pressed")}}
          variant='black'
        />
      </View>
    </View>
  )
}

export default OnDemand
