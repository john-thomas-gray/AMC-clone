import React from "react";
import { View } from "react-native";
import QRCode from "react-native-qrcode-svg";

const TicketQR = () => {
  const valueToEncode = "https://fourdognight.com";

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <QRCode
        value={valueToEncode}
        size={106}
        color="black"
        backgroundColor="white"
      />
    </View>
  );
};

export default TicketQR;
