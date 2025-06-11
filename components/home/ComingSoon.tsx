import { fetchComingSoon } from '@/utils/api';
import { tailwindColors } from '@/utils/tailwindColors';
import useFetch from '@/utils/useFetch';
import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import MovieCard from '../MovieCard';


const ComingSoon = () => {
  const {
    data: movies = [],
    loading: moviesLoading,
    error: moviesError
  } = useFetch(() => fetchComingSoon({ query: '' }));

  // console.log('ComingSoon movies:', movies);
  return (
    <View className="flex-1 bg-black">
      {moviesLoading ? (
          <ActivityIndicator
            size="large"
            color={tailwindColors.blue?.[100]}
            className="mt-10 self-center"
          />
        ) : moviesError ? (
          <Text>Error: {moviesError?.message}</Text>
        ) : (
          <View className="flex-1">
            <>

              <FlatList
                data={movies}
                renderItem={({ item }) => (
                  <MovieCard
                    {...item}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={{
                  justifyContent: 'flex-start',
                  padding: 0,
                  margin: 0,

                }}
                className="h-full"
                scrollEnabled={true}
                contentContainerStyle={{
                  padding: 0,
                  margin: 0,
                  paddingBottom: 90,
                }}
              />
            </>
          </View>
        )

        }

    </View>
  );
};

export default ComingSoon;
