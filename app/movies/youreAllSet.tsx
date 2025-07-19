import YoureAllSetHeader from "@/components/purchaseTickets/YoureAllSetHeader";
import React from "react";
import { Text, View } from "react-native";

const YoureAllSet = () => {
  return (
    <View>
      <YoureAllSetHeader
        movieTitle="Movie Title"
        details="Details about the movie"
        id="12345"
      />
      <Text>YoureAllSet</Text>
    </View>
  );
};

export default YoureAllSet;
