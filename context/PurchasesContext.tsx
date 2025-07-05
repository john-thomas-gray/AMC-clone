import React, { createContext, ReactNode, useState } from "react";

export interface TicketCounts {
  adult: number;
  child: number;
  senior: number;
  adultImax: number;
  childImax: number;
  seniorImax: number;
}

export interface PurchasesContextValue {
  selectedSeats: string[];
  setSelectedSeats: React.Dispatch<React.SetStateAction<string[]>>;

  selectedConcessions: { [key: string]: number };
  setSelectedConcessions: React.Dispatch<
    React.SetStateAction<{ [key: string]: number }>
  >;

  ticketCounts: TicketCounts;
  setTicketCounts: React.Dispatch<React.SetStateAction<TicketCounts>>;
}

export const PurchasesContext = createContext<
  PurchasesContextValue | undefined
>(undefined);

export const PurchasesProvider = ({ children }: { children: ReactNode }) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedConcessions, setSelectedConcessions] = useState<{
    [key: string]: number;
  }>({});
  const [ticketCounts, setTicketCounts] = useState<TicketCounts>({
    adult: 0,
    child: 0,
    senior: 0,
    adultImax: 0,
    childImax: 0,
    seniorImax: 0
  });

  return (
    <PurchasesContext.Provider
      value={{
        selectedSeats,
        setSelectedSeats,
        selectedConcessions,
        setSelectedConcessions,
        ticketCounts,
        setTicketCounts
      }}
    >
      {children}
    </PurchasesContext.Provider>
  );
};
