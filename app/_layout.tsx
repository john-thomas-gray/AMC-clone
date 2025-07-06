import { PurchasesProvider } from "@/context/PurchasesContext";
import { TheatreDataContextProvider } from "@/context/theatreDataContext";
import { TimerProvider } from "@/context/TimerContext";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function AppLayout() {
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY || "";
  return (
    <TimerProvider>
      <PurchasesProvider>
        <TheatreDataContextProvider apiKey={apiKey}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <ClerkProvider tokenCache={tokenCache}>
              <StatusBar style="light" />
              <Stack screenOptions={{ headerShown: false }} />
            </ClerkProvider>
          </GestureHandlerRootView>
        </TheatreDataContextProvider>
      </PurchasesProvider>
    </TimerProvider>
  );
}
