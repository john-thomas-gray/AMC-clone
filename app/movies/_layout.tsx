import BackButton from '@/components/buttons/BackButton';
import { Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function MoviesLayout() {

  console.log('[MoviesLayout] mounted');

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View className="absolute top-5 left-5 z-10">
        <BackButton/>
      </View>
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}
