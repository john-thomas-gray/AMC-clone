import { icons } from '@/constants';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type BackButtonProps = {
  className?: string;
};


const BackButton = ({ className }: BackButtonProps) => {
  const router = useRouter();

  return (
  <SafeAreaView className="flex-1">
    <Pressable
      onPress={router.back}
      className= {`h-6 w-6 ${className}`}
      accessibilityLabel="Back"
    >
      <Image
        source={icons.backArrowWhite}
        style={{ height: '100%', width: '100%', resizeMode: 'contain' }}
        className=""
      />
    </Pressable>
  </SafeAreaView>
  );
};

export default BackButton;
