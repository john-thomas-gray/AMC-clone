// hooks/useNearbyShowtimes.js
import { fetchMovies } from "@/utils/TMDBapi";
import axios from "axios";
import * as Location from "expo-location";
import { useEffect, useMemo, useState } from "react";

// Haversine distance calculation in miles
const calculateDistanceInMiles = (lat1, lon1, lat2, lon2) => {
  const toRad = angle => (angle * Math.PI) / 180;
  const R = 3958.8; // Earth radius in miles

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const getRandomShowtimes = () => {
  const showtimes = [];
  const count = Math.floor(Math.random() * 4) + 2;
  for (let i = 0; i < count; i++) {
    const hour = Math.floor(Math.random() * 12) + 1;
    const minute = Math.random() < 0.5 ? "00" : "30";
    const period = Math.random() < 0.5 ? "AM" : "PM";
    showtimes.push(`${hour}:${minute} ${period}`);
  }
  return showtimes;
};

const useNearbyShowtimes = () => {
  const [theatres, setTheatres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const getNearbyTheatres = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setError("Permission to access location was denied");
          setLoading(false);
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = loc.coords;
        setUserLocation({ latitude, longitude });

        const placeRes = await axios.get(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
          {
            params: {
              location: `${latitude},${longitude}`,
              radius: 80000,
              keyword: "AMC Theatre",
              type: "movie_theater",
              key: process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY
            }
          }
        );

        const filteredTheatres = (placeRes.data.results || []).filter(t =>
          t.name.toLowerCase().includes("amc")
        );
        setTheatres(filteredTheatres);
        console.log(filteredTheatres);

        const movieRes = await fetchMovies({ query: "" });
        setMovies(movieRes || []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    getNearbyTheatres();
  }, []);

  const showtimesData = useMemo(() => {
    if (!movies.length || !theatres.length || !userLocation) return [];

    return theatres.map(theatre => {
      const theatreLat = theatre.geometry?.location?.lat;
      const theatreLng = theatre.geometry?.location?.lng;
      console.log(userLocation);

      const distance =
        theatreLat && theatreLng
          ? calculateDistanceInMiles(
              userLocation.latitude,
              userLocation.longitude,
              theatreLat,
              theatreLng
            ).toFixed(1)
          : null;

      return {
        theatre: theatre.name,
        address: theatre.vicinity,
        distance,
        showtimes: movies.map(movie => ({
          id: movie.id,
          title: movie.title,
          runtime: movie.runtime,
          overview: movie.overview,
          release_date: movie.release_date,
          poster_path: movie.poster_path,
          backdrop_path: movie.backdrop_path,
          genres: movie.genres || [],
          times: getRandomShowtimes()
        }))
      };
    });
  }, [movies, theatres, userLocation]);

  return { showtimesData, loading, error };
};

export default useNearbyShowtimes;
