import { icons } from "@/constants";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView
} from "@gorhom/bottom-sheet";
import React from "react";
import { Image, Keyboard, Pressable, Text, View } from "react-native";
import CustomButton from "../buttons/CustomButton";

type OurTheatresBottomSheetProps = {
  children?: React.ReactNode;
  snapPoints?: number[] | string[];
  initialSnapIndex: number | 0;
  bottomSheetRef?: React.RefObject<any>;
};

const OurTheatresBottomSheet = ({
  children,
  bottomSheetRef,
  snapPoints = ["30%", "85%"],
  initialSnapIndex = 0
}: OurTheatresBottomSheetProps) => {
  const handleSheetChange = (index: number) => {
    if (index === 0) {
      Keyboard.dismiss();
    }
  };

  const DummyData = {
    theatres: [
      {
        name: "AMC Kabuki 8",
        address1: "1881 Post St",
        address2: "San Francisco, CA 94115",
        distance: "0.7"
      },
      {
        name: "AMC Metreon 16",
        address1: "135 4th St #3000",
        address2: "San Francisco, CA 94103",
        distance: "1.2"
      },
      {
        name: "AMC Bay Street 16",
        address1: "5614 Bay St",
        address2: "Emeryville, CA 94608",
        distance: "8.5"
      },
      {
        name: "AMC DINE-IN Sunnyvale 12",
        address1: "150 W McKinley Ave",
        address2: "Sunnyvale, CA 94086",
        distance: "42.0"
      },
      {
        name: "AMC Mercado 20",
        address1: "3111 Mission College Blvd",
        address2: "Santa Clara, CA 95054",
        distance: "45.3"
      }
    ]
  };

  const handleTheatreSelection = (theatre: string) => {
    console.log("handleTheatreSelection pressed");
  };

  return (
    <>
      {children}
      <BottomSheet
        index={initialSnapIndex}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        ref={bottomSheetRef}
        enablePanDownToClose={false}
        enableOverDrag={false}
        bottomInset={0}
        backgroundStyle={{
          backgroundColor: "#000000"
        }}
        handleStyle={{
          backgroundColor: "#000000"
        }}
        handleIndicatorStyle={{
          backgroundColor: "#ffffff",
          width: 50
        }}
      >
        <BottomSheetView className="flex-1 bg-black">
          <View className="flex-1">
            <BottomSheetFlatList
              contentContainerStyle={{ paddingBottom: 100 }}
              data={DummyData.theatres}
              keyExtractor={(item, index) => `theatre-${index}`}
              renderItem={({ item, index }) => (
                <View className="w-full mb-4">
                  <View className="flex-row items-center h-12 bg-black px-4">
                    <Text className={`text-white font-gordita-regular text-xl`}>
                      {index + 1}.
                    </Text>
                    <Image
                      source={icons.favouriteOff}
                      className="h-6 w-6 mx-2"
                    />
                    <Text className={`text-white font-gordita-bold text-2xl`}>
                      {item.name}
                    </Text>
                  </View>

                  <View className="flex-row items-center justify-between">
                    <Pressable
                      className="flex-col ml-[15.5%]"
                      onPress={() => {
                        console.log(item, "pressed");
                      }}
                    >
                      <Text className="text-blue-100 font-gordita-regular text-sm">
                        {item.address1}
                      </Text>
                      <Text className="text-blue-100 font-gordita-regular text-sm">
                        {item.address2}
                      </Text>
                    </Pressable>
                    <Text className="text-gray-100 font-gordita-regular text-sm mr-4">
                      {item.distance} mi
                    </Text>
                  </View>
                  <View className="flex-row ml-[15.5%] my-4">
                    <CustomButton
                      title="Theatre Info"
                      variant="black"
                      bold={true}
                      onPress={() => {
                        console.log("Theatre info pressed");
                      }}
                      className="mr-2"
                    />
                    <CustomButton
                      title="Showtimes"
                      variant="white"
                      bold={true}
                      onPress={() => {
                        console.log("Showtimes pressed");
                      }}
                    />
                  </View>
                </View>
              )}
            />
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default OurTheatresBottomSheet;
