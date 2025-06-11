import CustomButton from '@/components/CustomButton'
import StubsCard from '@/components/StubsCard'
import { backgrounds } from '@/constants'
import { stubsCardData } from '@/constants/stubsCardContent'
import { Link } from 'expo-router'
import React from 'react'
import { FlatList, ImageBackground, Text, View } from 'react-native'

const stubCards = [
  stubsCardData.aList,
  stubsCardData.premiere,
  stubsCardData.insider,
];

const MyAmc = () => {
  return (
    <View className="flex-1">
      <ImageBackground
        source={backgrounds.purpleGradient}
        resizeMode="cover"
        className="flex-1 h-full w-full"
      >
        <FlatList
          data={stubCards}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 67 }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View className="flex flex-col w-full">
              <View className="flex flex-row items-center mt-3 mb-5 px-3 justify-between">
                <Text className="text-white text-3xl font-gordita-bold">
                  Already a member?
                </Text>
                <CustomButton
                  title="Sign In"
                  onPress={() => { console.log('Sign In Pressed') }}
                  variant="transparent"
                  IconLeft={undefined}
                  IconRight={undefined}
                  textClassName="text-lg"
                />
            </View>

            <Text className="text-white text-3xl font-gordita-bold px-3 py-5
            border-t border-gray-300">
              Not a member? Join Now!
            </Text>
          </View>
          }
          renderItem={({ item }) => (
            <StubsCard
              {...item}
            />
          )}
          ListFooterComponent={
            <Link href="/(tabs)/foodAndDrinks" asChild>
              <Text className="text-blue-100 text-center text-lg font-gordita-bold mt-6 mb-10">
                Compare All Levels of AMC Stubs
              </Text>
            </Link>
          }
        />

      </ImageBackground>
    </View>

  )
}

export default MyAmc
