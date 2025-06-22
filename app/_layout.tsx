import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';

export default function AppLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <StatusBar style="light"/>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="movies/[id]"
          options={{ headerShown: false }}
        />
      </Stack>
    </ClerkProvider>
  )
}
