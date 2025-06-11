import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, Text, View } from "react-native";

import CustomHeader from "../../components/CustomHeader";
import { icons } from "../../constants";


const TabIcon = ({
  source,
  sourceFocused,
  focused,
  label,
}: {
  source: ImageSourcePropType;
  sourceFocused: ImageSourcePropType;
  focused: boolean;
  label: string;
}) => (
  <View className="flex flex-col items-center justify-center w-32">
    { focused ?
      <Image
        source={sourceFocused}
        resizeMode="contain"
        className="w-8 h-8"
      /> :
      <Image
      source={source}
      resizeMode="contain"
      className="w-8 h-8"
      />
    }
    <Text
    className={`text-xs mt-1 font-gordita ${focused ? "text-white" : "text-gray-100"}`}
    numberOfLines={1}
    >
      {label}

    </Text>
  </View>
)

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#000",
        tabBarStyle: {
          height: 90,
          backgroundColor: "black",
          borderTopWidth: 1,
          borderTopColor: "#2B2B2B",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
          overflow: "hidden",
          paddingBottom: 65,
        },
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "SEE A MOVIE",
          header: () => <CustomHeader
            title="See a Movie"
            showSettings={true}
          />,
          tabBarIcon: ({ focused }) => (
            <TabIcon
            source={icons.ticketTab}
            sourceFocused={icons.ticketTabFocused}
            focused={focused}
            label="SEE A MOVIE"
            />
          )

        }}
      />

      <Tabs.Screen
        name="ourTheatres"
        options={{
          title: "OUR THEATRES",
          header: () => <CustomHeader
            title="Our Theatres"
            showSettings={true}
          />,
          tabBarIcon: ({ focused }) => (
            <TabIcon
            source={icons.locationTab}
            sourceFocused={icons.locationTabFocused}
            focused={focused}
            label="OUR THEATRES"
            />
          )

        }}
      />

      <Tabs.Screen
        name="foodAndDrinks"
        options={{
          title: "FOOD & DRINKS",
          header: () => <CustomHeader
            title="Food & Drinks"
            showSettings={false}
          />,
          tabBarIcon: ({ focused }) => (
            <TabIcon
            source={icons.foodTab}
            sourceFocused={icons.foodTabFocused}
            focused={focused}
            label="FOOD & DRINKS"
            />
          )

        }}
      />
      <Tabs.Screen
        name="myAmc"
        options={{
          title: "MY AMC",
          header: () => <CustomHeader
            title="My AMC"
            showSettings={false}
          />,
          tabBarIcon: ({ focused }) => (
            <TabIcon
            source={icons.amcTab}
            sourceFocused={icons.amcTabFocused}
            focused={focused}
            label="MY AMC"
            />
          )

        }}
      />

    </Tabs>
  )
}
