import { RootProviders } from "@/context/RootProviders";
import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <RootProviders>
      <Stack screenOptions={{ headerShown: false }} />
    </RootProviders>
  );
}
