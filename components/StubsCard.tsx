import { StubsCardProps } from '@/types/type'
import React from 'react'
import { View } from 'react-native'
import CustomButton from './CustomButton'

const StubsCard = ({
  backgroundImage,
  logoColor,
  membershipType,
  headline,
  textBody,
  buttonText,
  buttonLink,
  buttonVariant }: StubsCardProps) => {
  return (
    <View className=
      "flex flex-col items-center justify-center w-full h-full rounded-xl padding-40"
    >
      <View>
        <View>

        </View>
        <CustomButton
          title={buttonText || ""}
          onPress={() => { console.log('Join Now Pressed') }}
          variant={buttonVariant || "transparent"}
        />
      </View>

    </View>
  )
}

export default StubsCard
