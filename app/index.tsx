import { useAuth } from "@clerk/clerk-expo";
import * as Font from 'expo-font';
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import "../global.css";

export default function Home() {
  const { isLoaded } = useAuth();

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Gordita-Regular': require('../assets/fonts/Gordita-Font/Gordita-Regular.otf'),
        'Gordita-Italic': require('../assets/fonts/Gordita-Font/Gordita-RegularItalic.otf'),
        'Gordita-Bold': require('../assets/fonts/Gordita-Font/Gordita-Bold.otf'),
        'Gordita-BoldItalic': require('../assets/fonts/Gordita-Font/Gordita-BoldItalic.otf'),
        'Gordita-Medium': require('../assets/fonts/Gordita-Font/Gordita-Medium.otf'),
        'Gordita-MediumItalic': require('../assets/fonts/Gordita-Font/Gordita-MediumItalic.otf'),
        'Gordita-Light': require('../assets/fonts/Gordita-Font/Gordita-Light.otf'),
        'Gordita-LightItalic': require('../assets/fonts/Gordita-Font/Gordita-LightItalic.otf'),
        'Gordita-Black': require('../assets/fonts/Gordita-Font/Gordita-Black.otf'),
        'Gordita-BlackItalic': require('../assets/fonts/Gordita-Font/Gordita-BlackItalic.otf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);
  if (!isLoaded) return null;

  if (!fontsLoaded) return <View />;

  return (
    <Redirect href="/(tabs)/home" />
  );

}
