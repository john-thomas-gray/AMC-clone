import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import "../global.css";

export default function Home() {
  const { isLoaded } = useAuth();

  return (
    <Redirect href="/(tabs)/home" />
  );

}
