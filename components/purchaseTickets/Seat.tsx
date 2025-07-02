import { icons } from "@/constants";
import React, { JSX, useState } from "react";
import { Image, ImageSourcePropType, Pressable, Text } from "react-native";

type SeatState = "Available" | "Selected" | "Occupied";
type SpecialSeat = "Companion" | "Wheelchair";

type SeatProps = {
  state: SeatState;
  row: string;
  num: number;
  special?: SpecialSeat;
  onToggle: (seatID: string) => void;
};

const Seat = ({ state, row, num, onToggle }: SeatProps): JSX.Element => {
  const seatID = row + num.toString();
  const [seatState, setSeatState] = useState<SeatState>(state);

  const toggleSeat = () => {
    const newState = seatState === "Selected" ? "Available" : "Selected";
    setSeatState(newState);
    onToggle(seatID);
  };

  const seatIconMap: Record<SeatState, ImageSourcePropType> = {
    Available: icons.seat,
    Selected: icons.seatSelected,
    Occupied: icons.seatOccupied
  };

  const handlePress = () => {
    if (seatState === "Occupied") return;
    toggleSeat();
  };

  return (
    <Pressable
      className="relative w-5 h-7 items-center justify-center"
      onPress={handlePress}
    >
      <Image
        source={seatIconMap[seatState]}
        className="w-5 h-7"
        resizeMode="contain"
      />
      {seatState !== "Occupied" && (
        <Text
          className={`absolute text-[5px] mb-1 text-white font-gordita-regular ${
            seatState === "Selected" ? "underline" : ""
          }`}
        >
          {seatID}
        </Text>
      )}
    </Pressable>
  );
};

export default Seat;
