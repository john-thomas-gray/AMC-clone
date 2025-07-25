import { amcTheatresdummy } from "@/assets/dummyData/dummyData";
import { NearbyTheatre } from "@/types/type";

export const getUserLocation = async (
  apiKey: string
): Promise<{
  coords: { latitude: number; longitude: number };
  address: string;
  raw: any;
}> => {
  // 1. Get location from Google Geolocation API
  const geoResponse = await fetch(
    `https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`,
    {
      method: "POST"
    }
  );

  if (!geoResponse.ok) {
    const error = await geoResponse.json();
    throw new Error(`Geolocation API error: ${error.error.message}`);
  }

  const geoData = await geoResponse.json();
  const { lat: latitude, lng: longitude } = geoData.location;

  // 2. Get address from Google Geocoding API
  const addressResponse = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
  );

  if (!addressResponse.ok) {
    const error = await addressResponse.json();
    throw new Error(`Geocoding API error: ${error.error_message}`);
  }

  const addressData = await addressResponse.json();
  const formatted_address =
    addressData.results[0]?.formatted_address || "Unknown location";

  return {
    coords: { latitude, longitude },
    address: formatted_address,
    raw: addressData
  };
};

export const getNearbyTheatres = async (
  apiKey: string
): Promise<NearbyTheatre[]> => {
  try {
    // Get user's coordinates and address
    const { coords } = await getUserLocation(apiKey);
    const { latitude, longitude } = coords;

    // Fetch nearby theatres using Google Places API
    const radiusInMeters = 50000;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radiusInMeters}&keyword=AMC+Theatre&type=movie_theater&key=${apiKey}`
    );
    const data = await response.json();
    console.log("Nearby theatre data:", data.status);

    if (data.status !== "OK") {
      throw new Error(`Google Places API error: ${data.status}`);
    }

    let filteredResults = data.results.filter((place: any) =>
      place.name.toLowerCase().includes("amc")
    );

    if (filteredResults.length === 0) {
      console.warn(
        "No AMC theatres found. Returning all movie theatres instead."
      );
      filteredResults = data.results;
    }

    const theatres: NearbyTheatre[] = filteredResults.map((place: any) => ({
      place_id: place.place_id,
      name: place.name,
      vicinity: place.vicinity,
      plus_code: {
        compound_code: place.plus_code?.compound_code ?? "Unknown"
      },
      geometry: {
        location: {
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng
        }
      }
    }));

    return theatres;
  } catch (error) {
    console.log("getNearby using backup. Error:", error);
    return amcTheatresdummy;
  }
};

// const getCurrentCoordinates = (): Promise<GeolocationPosition> => {
//   return new Promise((resolve, reject) => {
//     if (!navigator.geolocation) {
//       reject(new Error("Geolocation not supported."));
//       return;
//     }
//     navigator.geolocation.getCurrentPosition(resolve, reject, {
//       enableHighAccuracy: true
//     });
//   });
// };

// const getAddressFromCoords = async (
//   lat: number,
//   lng: number,
//   apiKey: string
// ) => {
//   const response = await fetch(
//     `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
//   );
//   const data = await response.json();

//   if (data.status !== "OK") {
//     throw new Error("Failed to reverse geocode location");
//   }

//   return data.results[0];
// };
