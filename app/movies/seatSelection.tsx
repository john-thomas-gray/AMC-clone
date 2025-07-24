import SignInBanner from "@/components/banners/SignInBanner";
import PurchaseTicketsFooter from "@/components/purchaseTickets/PurchaseTicketsFooter";
import PurchaseTicketsHeader from "@/components/purchaseTickets/PurchaseTicketsHeader";
import { PurchasesContext } from "@/context/PurchasesContext";
import { TheatreDataContext } from "@/context/theatreDataContext";
import { getCurrentDate } from "@/utils/dateAndTime";
import { RelativePathString, useRouter } from "expo-router";
import React, { useContext } from "react";
import { View } from "react-native";
import Auditorium from "../../components/purchaseTickets/seatSelection/Auditorium";

const SeatSelection = () => {
  const { selectedSession } = useContext(TheatreDataContext);
  const { selectedSeats, setSelectedSeats, resetSelectedSeats } =
    useContext(PurchasesContext)!;

  const router = useRouter();

  const { theatre, screen, showtime } = selectedSession!;

  const normalizedMovieTitle = screen.movie.title ?? "Untitled";
  const normalizedId = screen.movie.id.toString();

  const details = [
    theatre.name,
    getCurrentDate(),
    showtime,
    screen.type.projector
  ]
    .filter(Boolean)
    .join(" | ");

  const seatNum = screen.type.seatCount || 100;

  const handleSeatToggle = (seatID: string) => {
    setSelectedSeats(prev =>
      prev.includes(seatID)
        ? prev.filter(id => id !== seatID)
        : [...prev, seatID]
    );
  };

  return (
    <View className="flex-1 bg-black">
      <PurchaseTicketsHeader
        movieTitle={normalizedMovieTitle}
        details={details}
        id={normalizedId}
        to={`/movies/${normalizedId}` as RelativePathString}
      />
      <SignInBanner />
      <View className="flex-1 pt-4">
        <Auditorium
          seatNum={seatNum}
          onSeatToggle={handleSeatToggle}
          selectedSeats={selectedSeats}
        />
      </View>
      <PurchaseTicketsFooter
        disabled={selectedSeats.length === 0}
        onPress={() => {
          router.push({
            pathname: "/movies/ticketSelection"
          });
        }}
      />
    </View>
  );
};

export default SeatSelection;
