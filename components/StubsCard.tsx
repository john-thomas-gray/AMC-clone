import { backgrounds, images } from '@/constants'
import { StubsCardProps } from '@/types/type'
import React from 'react'
import { Image, ImageBackground, Text, View } from 'react-native'
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

    <ImageBackground
      source={backgroundImage || backgrounds.purpleGradient}
      resizeMode="cover"
      className="flex-1 h-full w-full"
    >
      <View className=
        "flex flex-col h-full rounded-xl padding-40"
      >
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center justify-between">
            <Image
              source={logoColor === 'white' ? images.stubsLogoWhite : images.stubsLogoBlack}
              resizeMode='contain'
              className="w-24 h-24 mb-3"
            />
            <View>
              {
                membershipType === "A LIST" ?
                <Text className="text-white text-3xl font-ebgaramond uppercase">{membershipType}</Text>
                : <Text className="text-white text-3xl font-ebgaramond uppercase">{membershipType}</Text>
              }
            </View>
          </View>
          <CustomButton
            title={buttonText || ""}
            onPress={() => { console.log('Join Now Pressed') }}
            variant={buttonVariant || "transparent"}
          />
        </View>

      </View>

    </ImageBackground>
  )
}

export default StubsCard
