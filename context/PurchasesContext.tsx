import { movieTicketPrice } from "@/constants/PriceConstants";
import React, { createContext, ReactNode, useEffect, useState } from "react";

export interface ConcessionItem {
  title: string;
  description: string;
  cost: number;
  image?: string;
  count: number;
}

interface TicketDetail {
  cost: number;
  count: number;
}

interface TicketGroup {
  date: string;
  seats: string[];
  tickets: {
    [projectorType: string]: TicketDetail;
  };
}

interface SelectedTicketsByAge {
  adult: TicketGroup;
  child: TicketGroup;
  senior: TicketGroup;
}

export interface PurchasesContextValue {
  selectedConcessions: ConcessionItem[];
  setSelectedConcessions: React.Dispatch<
    React.SetStateAction<ConcessionItem[]>
  >;

  selectedTickets: SelectedTicketsByAge;
  setSelectedTickets: React.Dispatch<
    React.SetStateAction<SelectedTicketsByAge>
  >;

  cartItemCount: number;
  setCartItemCount: React.Dispatch<React.SetStateAction<number>>;

  cartCostTotal: number;
  setCartCostTotal: React.Dispatch<React.SetStateAction<number>>;

  resetSelectedTickets: () => void;

  selectedSeats: string[];
  setSelectedSeats: React.Dispatch<React.SetStateAction<string[]>>;

  resetSelectedSeats: () => void;
}

const defaultPurchasesContextValue: PurchasesContextValue = {
  selectedConcessions: [],
  setSelectedConcessions: () => {},
  selectedTickets: {
    adult: { date: "", seats: [], tickets: {} },
    child: { date: "", seats: [], tickets: {} },
    senior: { date: "", seats: [], tickets: {} }
  },
  setSelectedTickets: () => {},
  cartItemCount: 0,
  setCartItemCount: () => {},
  cartCostTotal: 0,
  setCartCostTotal: () => {},
  resetSelectedTickets: () => {},
  selectedSeats: [],
  setSelectedSeats: () => {},
  resetSelectedSeats: () => {}
};

export const PurchasesContext = createContext<PurchasesContextValue>(
  defaultPurchasesContextValue
);

export const PurchasesProvider = ({ children }: { children: ReactNode }) => {
  const today = new Date().toISOString().split("T")[0];

  const [selectedConcessions, setSelectedConcessions] = useState<
    ConcessionItem[]
  >([]);

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const [selectedTickets, setSelectedTickets] =
    React.useState<SelectedTicketsByAge>({
      adult: {
        date: today,
        seats: [],
        tickets: {
          Standard: {
            cost: movieTicketPrice.adult + movieTicketPrice.fee,
            count: 0
          },
          IMax: {
            cost: movieTicketPrice.adultImax + movieTicketPrice.feeImax,
            count: 0
          }
        }
      },
      child: {
        date: today,
        seats: [],
        tickets: {
          Standard: {
            cost: movieTicketPrice.child + movieTicketPrice.fee,
            count: 0
          },
          IMax: {
            cost: movieTicketPrice.childImax + movieTicketPrice.feeImax,
            count: 0
          }
        }
      },
      senior: {
        date: today,
        seats: [],
        tickets: {
          Standard: {
            cost: movieTicketPrice.senior + movieTicketPrice.fee,
            count: 0
          },
          IMax: {
            cost: movieTicketPrice.seniorImax + movieTicketPrice.feeImax,
            count: 0
          }
        }
      }
    });

  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartCostTotal, setCartCostTotal] = useState(0);

  useEffect(() => {
    const ticketCount =
      selectedTickets.adult.tickets.Standard.count +
      selectedTickets.adult.tickets.IMax.count +
      selectedTickets.child.tickets.Standard.count +
      selectedTickets.child.tickets.IMax.count +
      selectedTickets.senior.tickets.Standard.count +
      selectedTickets.senior.tickets.IMax.count;

    const concessionCount = selectedConcessions.reduce(
      (sum, { count }) => sum + count,
      0
    );

    setCartItemCount(ticketCount + concessionCount);

    const ticketTotal =
      selectedTickets.adult.tickets.Standard.cost *
        selectedTickets.adult.tickets.Standard.count +
      selectedTickets.adult.tickets.IMax.cost *
        selectedTickets.adult.tickets.IMax.count +
      selectedTickets.child.tickets.Standard.cost *
        selectedTickets.child.tickets.Standard.count +
      selectedTickets.child.tickets.IMax.cost *
        selectedTickets.child.tickets.IMax.count +
      selectedTickets.senior.tickets.Standard.cost *
        selectedTickets.senior.tickets.Standard.count +
      selectedTickets.senior.tickets.IMax.cost *
        selectedTickets.senior.tickets.IMax.count;

    const concessionTotal = selectedConcessions.reduce(
      (sum, item) => sum + item.cost * item.count,
      0
    );

    setCartCostTotal(Number((ticketTotal + concessionTotal).toFixed(2)));
  }, [selectedTickets, selectedConcessions]);

  const resetSelectedTickets = () => {
    setSelectedTickets({
      adult: {
        date: today,
        seats: [],
        tickets: {
          Standard: {
            cost: movieTicketPrice.adult + movieTicketPrice.fee,
            count: 0
          },
          IMax: {
            cost: movieTicketPrice.adultImax + movieTicketPrice.feeImax,
            count: 0
          }
        }
      },
      child: {
        date: today,
        seats: [],
        tickets: {
          Standard: {
            cost: movieTicketPrice.child + movieTicketPrice.fee,
            count: 0
          },
          IMax: {
            cost: movieTicketPrice.childImax + movieTicketPrice.feeImax,
            count: 0
          }
        }
      },
      senior: {
        date: today,
        seats: [],
        tickets: {
          Standard: {
            cost: movieTicketPrice.senior + movieTicketPrice.fee,
            count: 0
          },
          IMax: {
            cost: movieTicketPrice.seniorImax + movieTicketPrice.feeImax,
            count: 0
          }
        }
      }
    });
  };

  const resetSelectedSeats = () => {
    setSelectedSeats([]);
  };

  return (
    <PurchasesContext.Provider
      value={{
        selectedConcessions,
        setSelectedConcessions,
        selectedTickets,
        setSelectedTickets,
        cartItemCount,
        setCartItemCount,
        cartCostTotal,
        setCartCostTotal,
        resetSelectedTickets,
        selectedSeats,
        setSelectedSeats,
        resetSelectedSeats
      }}
    >
      {children}
    </PurchasesContext.Provider>
  );
};
