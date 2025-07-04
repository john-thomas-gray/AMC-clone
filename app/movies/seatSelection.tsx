import PurchaseTicketsFooter from "@/components/purchaseTickets/PurchaseTicketsFooter";
import PurchaseTicketsHeader from "@/components/purchaseTickets/PurchaseTicketsHeader";
import SignInBanner from "@/components/purchaseTickets/SignInBanner";
import { PurchasesContext } from "@/context/PurchasesContext";
import { TheatreDataContext } from "@/context/theatreDataContext";
import { getCurrentDate } from "@/utils/dateAndTime";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { View } from "react-native";
import Auditorium from "../../components/purchaseTickets/Auditorium";

const SeatSelection = () => {
  const { selectedSession } = useContext(TheatreDataContext);
  const { selectedSeats, setSelectedSeats } = useContext(PurchasesContext);

  const router = useRouter();

  const { theatre, screen, showtime } = selectedSession;

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
        to={`/movies/${normalizedId}`}
      />
      <SignInBanner />
      <View className="flex-1 pt-4">
        <Auditorium seatNum={seatNum} onSeatToggle={handleSeatToggle} />
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
