import { MovieProviders } from "@/context/MovieProviders";
import { Slot } from "expo-router";

export default function MoviesLayout() {
  return (
    <MovieProviders>
      <Slot />
    </MovieProviders>
  );
}
