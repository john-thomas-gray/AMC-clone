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
        'EBGaramond': require('../assets/fonts/EBGaramond/EBGaramond-VariableFont_wght.ttf'),
        'EBGaramond-Italic': require('../assets/fonts/EBGaramond/EBGaramond-Italic-VariableFont_wght.ttf'),
        'EBGaramond-Medium': require('../assets/fonts/EBGaramond/EBGaramond-VariableFont_wght.ttf'),
        'EBGaramond-MediumItalic': require('../assets/fonts/EBGaramond/EBGaramond-Italic-VariableFont_wght.ttf'),
        'EBGaramond-SemiBold': require('../assets/fonts/EBGaramond/EBGaramond-VariableFont_wght.ttf'),
        'EBGaramond-SemiBoldItalic': require('../assets/fonts/EBGaramond/EBGaramond-Italic-VariableFont_wght.ttf'),
        'EBGaramond-Bold': require('../assets/fonts/EBGaramond/EBGaramond-VariableFont_wght.ttf'),
        'EBGaramond-BoldItalic': require('../assets/fonts/EBGaramond/EBGaramond-Italic-VariableFont_wght.ttf'),
        'EBGaramond-ExtraBold': require('../assets/fonts/EBGaramond/EBGaramond-VariableFont_wght.ttf'),
        'EBGaramond-ExtraBoldItalic': require('../assets/fonts/EBGaramond/EBGaramond-Italic-VariableFont_wght.ttf'),
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
