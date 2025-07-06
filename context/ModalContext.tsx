import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState
} from "react";

import AlertModal from "@/components/modals/AlertModal";
import YesNoModal from "@/components/modals/YesNoModal";

type YesNoModalProps = {
  visible?: boolean;
  onYes?: () => void;
  onNo?: () => void;
  title?: string;
  body?: string;
};

type AlertModalProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  body?: string;
};

type ModalType = "alert" | "yesno";

type ModalEntry = {
  id: string;
  type: ModalType;
  props: AlertModalProps | YesNoModalProps;
};

type ModalContextType = {
  modals: ModalEntry[];
  showModal: (
    type: ModalType,
    props: AlertModalProps | YesNoModalProps
  ) => string; // returns modal id
  hideModal: (id: string) => void;
};

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<ModalEntry[]>([]);

  // Generate unique IDs (simple example, you can use uuid or nanoid)
  const generateId = () => Math.random().toString(36).substr(2, 9);

  const showModal = useCallback(
    (type: ModalType, props: AlertModalProps | YesNoModalProps) => {
      const id = generateId();
      setModals(current => [...current, { id, type, props }]);
      return id;
    },
    []
  );

  const hideModal = useCallback((id: string) => {
    setModals(current => current.filter(modal => modal.id !== id));
  }, []);

  return (
    <ModalContext.Provider value={{ modals, showModal, hideModal }}>
      {children}

      {/* Render all modals */}
      {modals.map(({ id, type, props }) => {
        if (type === "alert") {
          // Type assertion for AlertModalProps
          const alertProps = props as AlertModalProps;

          return (
            <AlertModal
              key={id}
              {...alertProps}
              visible={true}
              onClose={() => {
                alertProps.onClose?.();
                hideModal(id);
              }}
            />
          );
        }

        if (type === "yesno") {
          // Type assertion for YesNoModalProps
          const yesNoProps = props as YesNoModalProps;

          return (
            <YesNoModal
              key={id}
              {...yesNoProps}
              visible={true}
              onYes={() => {
                yesNoProps.onYes?.();
                hideModal(id);
              }}
              onNo={() => {
                yesNoProps.onNo?.();
                hideModal(id);
              }}
            />
          );
        }

        return null;
      })}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
