import { TheatreDataContextProvider } from "@/context/theatreDataContext";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function AppLayout() {
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY || "";
  return (
    <TheatreDataContextProvider apiKey={apiKey}>
      <ClerkProvider tokenCache={tokenCache}>
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false }} />
      </ClerkProvider>
    </TheatreDataContextProvider>
  );
}
