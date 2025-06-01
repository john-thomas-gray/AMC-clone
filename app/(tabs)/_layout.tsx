import { Stack } from "expo-router";
import { Image, ImageSourcePropType, View } from "react-native";

const TabIcon = ({
  title,
  source,
  sourceFocused,
  focused,
}: {
  title: string,
  source: ImageSourcePropType;
  sourceFocused: ImageSourcePropType;
  focused: boolean;
}) => (
  <View>
    <Image
  </View>
)

export default function TabsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />
    </Stack>
  )
}
