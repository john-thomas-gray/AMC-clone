import { backgrounds, images } from '@/constants'
import { StubsCardProps } from '@/types/type'
import { Link } from 'expo-router'
import React from 'react'
import { Image, ImageBackground, Text, View } from 'react-native'
import CustomButton from './buttons/CustomButton'

const StubsCard = ({
  backgroundImage,
  logoColor,
  membershipType,
  headline,
  textBody,
  textColor,
  buttonText,
  buttonLink,
  buttonVariant }: StubsCardProps) => {
  return (
    <View className='mx-3 rounded-xl overflow-hidden mb-3'>
      <ImageBackground
        source={backgroundImage || backgrounds.purpleGradient}
        resizeMode="cover"
        className="flex-1 h-full w-full p-3"
      >
        <View className="flex flex-col rounded-xl m-4">
          <View className="flex flex-row items-center justify-between mb-3">
            <View className="flex flex-row items-center justify-between ">
              <Image
                source={logoColor === 'white' ? images.stubsLogoWhite : images.stubsLogoBlack}
                resizeMode='contain'
                className="w-24 h-10 mr-2"
              />

              <View>
                {
                  membershipType === "A List" ?
                  <View className="flex flex-row items-center">
                    <Text className="text-white text-2xl font-ebgaramond uppercase">A</Text>
                    <Text className="text-white text-[6px] font-ebgaramond uppercase">★</Text>
                    <Text className="text-white text-2xl font-ebgaramond uppercase">LIST</Text>
                    <Text className="text-white text-[4px] font-ebgaramond uppercase pb-3">  ™</Text>
                  </View> :
                  <View className="flex flex-row items-center">
                    <Text className="text-black text-2xl font-ebgaramond uppercase">{membershipType}</Text>
                    <Text className="text-black text-[4px] font-ebgaramond uppercase pb-3">  ™</Text>
                  </View>
                }
              </View>
            </View>

            <CustomButton
              title={buttonText || ""}
              onPress={() => { console.log('Join Now Pressed') }}
              variant={buttonVariant || ""}
              className='text-sm'
            />
          </View>

          <View className="flex flex-col items-start">
            <Text className={`text-2xl font-gordita-bold ${textColor === 'black' ? 'text-black' : 'text-white'}`}>
              {headline}
            </Text>

            <Text className={`text-base font-gordita-medium pt-1 ${textColor === 'black' ? 'text-black' : 'text-white'}`}>
              {textBody}
            </Text>

            {
              membershipType === "A List" ? (
                <Link href={"/(tabs)/foodAndDrinks"}>
                  <Text className="text-blue-100 font-gordita-black">Learn More.</Text>
                </Link>
              ) : null
            }
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

export default StubsCard
