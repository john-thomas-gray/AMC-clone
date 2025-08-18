import React from "react";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

const laoding = {};

const Map = () => {
  // if (loading) {
  //   return (
  //     <View>
  //       <ActivityIndicator size="small" color="#000"/>
  //     </View>
  //   )
  // }
  const region = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      style={{
        flex: 1,
        width: "100%",
        height: "100%"
      }}
      tintColor="black"
      mapType="mutedStandard"
      showsPointsOfInterest={false}
      initialRegion={region}
      showsUserLocation={false}
      userInterfaceStyle="light"
    ></MapView>
  );
};

export default Map;
