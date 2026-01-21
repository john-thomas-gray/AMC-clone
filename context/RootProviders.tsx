import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PurchasesProvider } from "./PurchasesContext";
import { TheatreDataContextProvider } from "./theatreDataContext";

type RootProvidersProps = {
  children: React.ReactNode;
};

const apiKey = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY || "";
const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export const RootProviders = ({ children }: RootProvidersProps) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ClerkProvider tokenCache={tokenCache} publishableKey="pk_test_cmljaC1hbGllbi0yMS5jbGVyay5hY2NvdW50cy5kZXYk">
        <PurchasesProvider>
          <TheatreDataContextProvider apiKey={apiKey}>
            <StatusBar style="light" />
            {children}
          </TheatreDataContextProvider>
        </PurchasesProvider>
      </ClerkProvider>
    </GestureHandlerRootView>
  );
};
