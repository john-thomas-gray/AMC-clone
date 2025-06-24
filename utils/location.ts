import { NearbyTheatre } from "@/types/type";

const getCurrentCoordinates = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation not supported."));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true
    });
  });
};

const getAddressFromCoords = async (
  lat: number,
  lng: number,
  apiKey: string
) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
  );
  const data = await response.json();

  if (data.status !== "OK") {
    throw new Error("Failed to reverse geocode location");
  }

  return data.results[0];
};

export const getUserLocation = async (
  apiKey: string
): Promise<{
  coords: { latitude: number; longitude: number };
  address: string;
  raw: any;
}> => {
  const position = await getCurrentCoordinates();
  const { latitude, longitude } = position.coords;

  const addressData = await getAddressFromCoords(latitude, longitude, apiKey);

  return {
    coords: { latitude, longitude },
    address: addressData.formatted_address,
    raw: addressData
  };
};

export const getNearbyTheatres = async (
  apiKey: string
): Promise<NearbyTheatre[]> => {
  try {
    // Step 1: Get user's coordinates and address
    const { coords } = await getUserLocation(apiKey);
    const { latitude, longitude } = coords;

    // Step 2: Fetch nearby theatres using Google Places API
    const radiusInMeters = 50000; // Google Places API max radius is 50,000 meters (~31 miles)
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radiusInMeters}&keyword=movie+theater&type=movie_theater&key=${apiKey}`
    );

    const data = await response.json();

    if (data.status !== "OK") {
      throw new Error(`Google Places API error: ${data.status}`);
    }

    // Step 3: Format results
    const theatres: NearbyTheatre[] = data.results.map((place: any) => ({
      place_id: place.place_id,
      name: place.name,
      geometry: {
        location: {
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng
        }
      }
    }));

    return theatres;
  } catch (error) {
    console.error("Error fetching nearby theatres:", error);
    throw error;
  }
};
