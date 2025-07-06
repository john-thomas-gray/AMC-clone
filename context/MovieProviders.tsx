import { ModalProvider } from "./ModalContext";
import { TimerProvider } from "./TimerContext";

type MovieProvidersProps = {
  children: React.ReactNode;
};

export const MovieProviders = ({ children }: MovieProvidersProps) => {
  return (
    <ModalProvider>
      <TimerProvider>{children}</TimerProvider>
    </ModalProvider>
  );
};
