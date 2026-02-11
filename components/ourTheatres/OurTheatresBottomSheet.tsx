import { icons } from "@/constants";
import { TheatreDataContext } from "@/context/theatreDataContext";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView
} from "@gorhom/bottom-sheet";
import React, { useContext } from "react";
import { Image, Keyboard, Pressable, Text, View } from "react-native";
import CustomButton from "../buttons/CustomButton";

type OurTheatresBottomSheetProps = {
  children?: React.ReactNode;
  snapPoints?: number[] | string[];
  initialSnapIndex: number | 0;
  bottomSheetRef?: React.RefObject<any>;
};

type TheatreListItem = {
  name: string;
  address1: string;
  address2: string;
  distance: string;
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

  const { theatres, loading } = useContext(TheatreDataContext);

  // Transform theatres from context into the shape expected by the UI
  const theatreList: TheatreListItem[] = theatres.map((theatre) => {
    // Extract city/state from compound_code (e.g., "X6Q6+QV Ocean City, Maryland")
    const addressParts = theatre.compound_code.split(" ");
    const cityState = addressParts.slice(1).join(" ");
    
    return {
      name: theatre.name,
      address1: theatre.vicinity,
      address2: cityState || theatre.compound_code,
      distance: "" // Distance calculation would require user location
    };
  });

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
            <BottomSheetFlatList<TheatreListItem>
              contentContainerStyle={{ paddingBottom: 100 }}
              data={theatreList}
              keyExtractor={(item: TheatreListItem, index: number) => `theatre-${item.name}-${index}`}
              renderItem={({ item, index }: { item: TheatreListItem; index: number }) => (
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
                    {item.distance && (
                      <Text className="text-gray-100 font-gordita-regular text-sm mr-4">
                        {item.distance} mi
                      </Text>
                    )}
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
