import { movieTicketPrice } from "@/constants/PriceConstants";
import React, { createContext, ReactNode, useEffect, useState } from "react";

export interface Ticket {
  projector: string;
  age: string;
  cost: number;
  count: number;
}

export interface ConcessionItem {
  title: string;
  description: string;
  cost: number;
  image?: string;
  count: number;
}

export interface PurchasesContextValue {
  selectedSeats: string[];
  setSelectedSeats: React.Dispatch<React.SetStateAction<string[]>>;

  selectedConcessions: ConcessionItem[];
  setSelectedConcessions: React.Dispatch<
    React.SetStateAction<ConcessionItem[]>
  >;

  selectedTickets: Ticket[];
  setSelectedTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;

  cartItemCount: number;
  setCartItemCount: React.Dispatch<React.SetStateAction<number>>;

  cartCostTotal: number;
  setCartCostTotal: React.Dispatch<React.SetStateAction<number>>;

  resetSelectedTickets: () => void;
  resetSelectedSeats: () => void;
}

export const PurchasesContext = createContext<
  PurchasesContextValue | undefined
>(undefined);

export const PurchasesProvider = ({ children }: { children: ReactNode }) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedConcessions, setSelectedConcessions] = useState<
    ConcessionItem[]
  >([]);
  const [selectedTickets, setSelectedTickets] = useState<Ticket[]>([
    {
      projector: "Standard",
      age: "Adult",
      cost: movieTicketPrice.adult + movieTicketPrice.fee,
      count: 0
    },
    {
      projector: "Standard",
      age: "Child",
      cost: movieTicketPrice.child + movieTicketPrice.fee,
      count: 0
    },
    {
      projector: "Standard",
      age: "Senior",
      cost: movieTicketPrice.senior + movieTicketPrice.fee,
      count: 0
    },
    {
      projector: "IMax",
      age: "Adult",
      cost: movieTicketPrice.adultImax + movieTicketPrice.feeImax,
      count: 0
    },
    {
      projector: "IMax",
      age: "Child",
      cost: movieTicketPrice.childImax + movieTicketPrice.feeImax,
      count: 0
    },
    {
      projector: "IMax",
      age: "Senior",
      cost: movieTicketPrice.seniorImax + movieTicketPrice.feeImax,
      count: 0
    }
  ]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartCostTotal, setCartCostTotal] = useState(0);

  useEffect(() => {
    const ticketCount = Object.values(selectedTickets).reduce(
      (sum, { count }) => sum + count,
      0
    );

    const concessionCount = selectedConcessions.length;

    setCartItemCount(ticketCount + concessionCount);
  }, [selectedTickets, selectedConcessions]);

  const resetSelectedTickets = () => {
    setSelectedTickets([]);
  };

  const resetSelectedSeats = () => {
    setSelectedSeats([]);
  };

  return (
    <PurchasesContext.Provider
      value={{
        selectedSeats,
        setSelectedSeats,
        selectedConcessions,
        setSelectedConcessions,
        selectedTickets,
        setSelectedTickets,
        cartItemCount,
        setCartItemCount,
        cartCostTotal,
        setCartCostTotal,
        resetSelectedTickets,
        resetSelectedSeats
      }}
    >
      {children}
    </PurchasesContext.Provider>
  );
};
