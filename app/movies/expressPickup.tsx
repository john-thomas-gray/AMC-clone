import ConcessionsCard from "@/components/cards/ConcessionsCard";
import ExpressPickupFooter from "@/components/purchaseTickets/ExpressPickupFooter";
import ExpressPickupHeader from "@/components/purchaseTickets/ExpressPickupHeader";
import SignInBanner from "@/components/purchaseTickets/SignInBanner";
import { concessionsCards } from "@/constants/ConcessionsData";
import { TheatreDataContext } from "@/context/theatreDataContext";
import { RelativePathString, useRouter } from "expo-router";
import React, { useContext } from "react";
import { ScrollView, Text, View } from "react-native";

const ExpressPickup = () => {
  const { selectedSession } = useContext(TheatreDataContext);
  const router = useRouter();
  return (
    <View className="flex-1 bg-black">
      <ExpressPickupHeader
        to={"/movies/ticketSelection" as RelativePathString}
      />
      <View className="flex-1">
        <ScrollView>
          <SignInBanner />
          <View className="flex-row w-full items-center justify-between pl-3 pr-5 pt-2 pb-3 bg-black">
            <Text className="flex-1 text-white font-gordita-reguler text-lg text-left pr-4 leading-snug ">
              Getting your favorite movie treats is now easier than ever. Just
              order them online, and we&apos;ll have them ready when you get
              here.
            </Text>
          </View>

          {concessionsCards.map((card, index) => (
            <View key={index} className="bg-black my-3">
              <ConcessionsCard
                key={index}
                title={card.title}
                imagePath={card.imagePath}
                onPress={() => {
                  console.log(`${card.title} pressed`);
                }}
              />
            </View>
          ))}
        </ScrollView>
      </View>
      <ExpressPickupFooter onPress={() => router.push("/movies/payment")} />
    </View>
  );
};

export default ExpressPickup;
