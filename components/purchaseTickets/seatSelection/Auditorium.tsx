import Seat from "@/components/purchaseTickets/seatSelection/Seat";
import { icons, images } from "@/constants";
import React, { JSX, useState } from "react";
import { Image, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

type AuditoriumProps = {
  seatNum: number;
  onSeatToggle: (seatID: string) => void;
};

const Auditorium = ({ seatNum, onSeatToggle }: AuditoriumProps) => {
  const pairs = [
    {
      icon: icons.seat,
      text: "Traditional Seat"
    },
    {
      icon: icons.wheelchair,
      text: "Wheelchair"
    },
    {
      icon: icons.companion,
      text: "Companion"
    },
    {
      icon: icons.available,
      text: "Available"
    },
    {
      icon: icons.selected,
      text: "Selected"
    },
    {
      icon: icons.occupied,
      text: "Occupied"
    }
  ];

  const handleSeatToggle = (seatID: string) => {
    onSeatToggle(seatID);
  };

  const selectedSeats: string[] = [];

  const seatTypes = pairs.map((pair, index) => (
    <View key={index} className="flex-row items-center">
      <View className="h-5 w-5">
        <Image source={pair.icon} className="h-5 w-5" resizeMode="contain" />
      </View>
      <Text className="text-white font-gordita-regular pl-1">{pair.text}</Text>
    </View>
  ));

  const firstRow = seatTypes.slice(0, 3);
  const secondRow = seatTypes.slice(3, 6);

  const renderSeatRow = (
    rowLetter: string,
    seatsInRow: number,
    selectedSeats: string[]
  ) => {
    return (
      <View
        key={rowLetter}
        className="flex-row-reverse justify-center flex-wrap mb-1"
      >
        {Array.from({ length: seatsInRow }, (_, i) => {
          const num = i + 1;
          const seatID = `${rowLetter}${num}`;
          const isSelected = selectedSeats.includes(seatID);

          return (
            <View key={seatID} className="mx-[2px]">
              <Seat
                state={isSelected ? "Selected" : "Available"} // set state dynamically
                row={rowLetter}
                num={num}
                onToggle={handleSeatToggle}
              />
            </View>
          );
        })}
      </View>
    );
  };

  const renderAuditorium = (seatNum: number, selectedSeats: string[]) => {
    const seatsPerRow = 19;
    const rows: JSX.Element[] = [];
    const totalRows = Math.ceil(seatNum / seatsPerRow);
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let seatsLeft = seatNum;

    for (let i = 0; i < totalRows; i++) {
      const rowLetter = alphabet[i] || `Row${i + 1}`;
      const seatsInThisRow = Math.min(seatsLeft, seatsPerRow);

      rows.push(renderSeatRow(rowLetter, seatsInThisRow, selectedSeats));

      seatsLeft -= seatsInThisRow;
    }

    return <View>{rows}</View>;
  };
  const [auditoriumWidth, setAuditoriumWidth] = useState(0);
  return (
    <View className="flex-1">
      <ScrollView
        horizontal
        zoomScale={0.9}
        minimumZoomScale={0.9}
        maximumZoomScale={3}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "flex-start"
        }}
      >
        <ScrollView
          zoomScale={0.9}
          minimumZoomScale={0.9}
          maximumZoomScale={3}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center"
          }}
        >
          <View
            style={{
              minWidth: "100%",
              alignItems: "center",
              paddingHorizontal: 16
            }}
          >
            {auditoriumWidth > 0 && (
              <Image
                source={images.screen}
                resizeMode="contain"
                style={{
                  width: auditoriumWidth * 0.95,
                  marginVertical: 24
                }}
              />
            )}

            <View
              onLayout={event => {
                const width = event.nativeEvent.layout.width;
                setAuditoriumWidth(width);
              }}
            >
              <View className="">
                {renderAuditorium(seatNum, selectedSeats)}
              </View>
            </View>
          </View>
        </ScrollView>
      </ScrollView>

      <View className="items-center mx-4">
        <View className="w-full bg-black border-t border-gray-300">
          <View className="flex-row justify-between px-4 pb-4 pt-4">
            {firstRow}
          </View>
          <View className="flex-row justify-between px-8 pb-4">
            {secondRow}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Auditorium;
