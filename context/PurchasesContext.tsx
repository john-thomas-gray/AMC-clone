import { fees, movieTicketPrice } from "@/constants/PriceConstants";
import React, { createContext, ReactNode, useEffect, useState } from "react";

export interface ConcessionItem {
  title: string;
  description: string;
  cost: number;
  image?: string;
  count: number;
}

export interface TicketDetail {
  cost: number;
  count: number;
}

export interface TicketGroup {
  date: string;
  seats: string[];
  tickets: {
    [projectorType: string]: TicketDetail;
  };
}

export interface SelectedTicketsByAge {
  adult: TicketGroup;
  child: TicketGroup;
  senior: TicketGroup;
}

export type PaymentMethod =
  | "default"
  | "applePay"
  | "bitPay"
  | "payPal"
  | "venmo";

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

  setPaymentMethod: React.Dispatch<React.SetStateAction<PaymentMethod>>;
  paymentMethod: PaymentMethod;
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
  resetSelectedSeats: () => {},
  setPaymentMethod: () => {},
  paymentMethod: "default"
};

export const PurchasesContext = createContext<PurchasesContextValue>(
  defaultPurchasesContextValue
);

export const PurchasesProvider = ({ children }: { children: ReactNode }) => {
  const today = new Date().toISOString().split("T")[0];
  ``;
  const [selectedConcessions, setSelectedConcessions] = useState<
    ConcessionItem[]
  >([]);

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartCostTotal, setCartCostTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("default");

  const [selectedTickets, setSelectedTickets] =
    React.useState<SelectedTicketsByAge>({
      adult: {
        date: today,
        seats: [],
        tickets: {
          standard: {
            cost: movieTicketPrice.adult + fees.convenienceFee,
            count: 0
          },
          iMax: {
            cost: movieTicketPrice.adultImax + fees.convenienceFeeImax,
            count: 0
          }
        }
      },
      child: {
        date: today,
        seats: [],
        tickets: {
          standard: {
            cost: movieTicketPrice.child + fees.convenienceFee,
            count: 0
          },
          iMax: {
            cost: movieTicketPrice.childImax + fees.convenienceFeeImax,
            count: 0
          }
        }
      },
      senior: {
        date: today,
        seats: [],
        tickets: {
          standard: {
            cost: movieTicketPrice.senior + fees.convenienceFee,
            count: 0
          },
          iMax: {
            cost: movieTicketPrice.seniorImax + fees.convenienceFeeImax,
            count: 0
          }
        }
      }
    });

  useEffect(() => {
    const ticketCount =
      selectedTickets.adult.tickets.standard.count +
      selectedTickets.adult.tickets.iMax.count +
      selectedTickets.child.tickets.standard.count +
      selectedTickets.child.tickets.iMax.count +
      selectedTickets.senior.tickets.standard.count +
      selectedTickets.senior.tickets.iMax.count;

    const concessionCount = selectedConcessions.reduce(
      (sum, { count }) => sum + count,
      0
    );

    setCartItemCount(ticketCount + concessionCount);

    const ticketTotal =
      selectedTickets.adult.tickets.standard.cost *
        selectedTickets.adult.tickets.standard.count +
      selectedTickets.adult.tickets.iMax.cost *
        selectedTickets.adult.tickets.iMax.count +
      selectedTickets.child.tickets.standard.cost *
        selectedTickets.child.tickets.standard.count +
      selectedTickets.child.tickets.iMax.cost *
        selectedTickets.child.tickets.iMax.count +
      selectedTickets.senior.tickets.standard.cost *
        selectedTickets.senior.tickets.standard.count +
      selectedTickets.senior.tickets.iMax.cost *
        selectedTickets.senior.tickets.iMax.count;

    const concessionTotal = selectedConcessions.reduce(
      (sum, item) => sum + item.cost * item.count,
      0
    );

    setCartCostTotal(Number((ticketTotal + concessionTotal).toFixed(2)));
    console.log("Cart Cost Total:", cartCostTotal);
    console.log("Cart Item Count:", cartItemCount);
    console.log("Selected Tickets:", selectedTickets);
    console.log("Ticket Total:", ticketTotal);
  }, [selectedTickets, selectedConcessions]);

  const resetSelectedTickets = () => {
    setSelectedTickets({
      adult: {
        date: today,
        seats: [],
        tickets: {
          standard: {
            cost: movieTicketPrice.adult + fees.convenienceFee,
            count: 0
          },
          iMax: {
            cost: movieTicketPrice.adultImax + fees.convenienceFeeImax,
            count: 0
          }
        }
      },
      child: {
        date: today,
        seats: [],
        tickets: {
          standard: {
            cost: movieTicketPrice.child + fees.convenienceFee,
            count: 0
          },
          iMax: {
            cost: movieTicketPrice.childImax + fees.convenienceFeeImax,
            count: 0
          }
        }
      },
      senior: {
        date: today,
        seats: [],
        tickets: {
          standard: {
            cost: movieTicketPrice.senior + fees.convenienceFee,
            count: 0
          },
          iMax: {
            cost: movieTicketPrice.seniorImax + fees.convenienceFeeImax,
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
        resetSelectedSeats,
        setPaymentMethod,
        paymentMethod
      }}
    >
      {children}
    </PurchasesContext.Provider>
  );
};
