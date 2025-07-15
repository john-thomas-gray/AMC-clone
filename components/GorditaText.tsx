import React from "react";
import { StyleSheet, Text } from "react-native";

const GorditaText = props => {
  return (
    <Text style={{ ...styles.defaultText, ...props.style }}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: "gordita-regular",
    color: "red-100"
  }
});

export default GorditaText;
