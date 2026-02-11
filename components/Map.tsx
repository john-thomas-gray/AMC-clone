import React, { useContext, useMemo } from "react";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { TheatreDataContext } from "@/context/theatreDataContext";

const Map = () => {
  const { theatres } = useContext(TheatreDataContext);

  // Calculate the center of all theatres to position the map
  const region = useMemo(() => {
    if (!theatres || theatres.length === 0) {
      // Fallback to New York if no theatres loaded
      return {
        latitude: 40.7580,
        longitude: -73.9855,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
      };
    }

    // Calculate average lat/lng from all theatres
    const avgLat = theatres.reduce((sum, t) => sum + t.location.lat, 0) / theatres.length;
    const avgLng = theatres.reduce((sum, t) => sum + t.location.lng, 0) / theatres.length;

    // Calculate bounds to fit all theatres
    const lats = theatres.map(t => t.location.lat);
    const lngs = theatres.map(t => t.location.lng);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    return {
      latitude: avgLat,
      longitude: avgLng,
      latitudeDelta: (maxLat - minLat) * 1.5 || 0.1,
      longitudeDelta: (maxLng - minLng) * 1.5 || 0.1
    };
  }, [theatres]);

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
    >
      {theatres?.map((theatre) => (
        <Marker
          key={theatre.id}
          coordinate={{
            latitude: theatre.location.lat,
            longitude: theatre.location.lng
          }}
          title={theatre.name}
          description={theatre.vicinity}
        />
      ))}
    </MapView>
  );
};

export default Map;
