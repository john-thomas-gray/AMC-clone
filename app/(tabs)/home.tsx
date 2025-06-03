import HorizontalScrollContainer from '@/components/HorizontalScrollContainer'
import SlidingHeader from '@/components/SlidingHeader'
import React from 'react'
import { FlatList, Text, View } from 'react-native'

const Home = () => {

  const movieData = [{id: 1, title: 'Movie 1'}, {id: 2, title: 'Movie 2'}, {id: 3, title: 'Movie 3'}]

  return (
    <View className='flex-1 bg-black'>

      <SlidingHeader
        numberOfSections={3}
        sectionNames={['NOW PLAYING', 'COMING SOON', 'ON DEMAND']}
        />

      <HorizontalScrollContainer>
        <FlatList
          data={movieData}
          renderItem={({ item }) => (
            <Text className="font-gordita-regular text-white">{item.title}</Text>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </HorizontalScrollContainer>

    </View>
  )
}

export default Home
