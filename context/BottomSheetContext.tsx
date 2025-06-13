import BottomSheet from '@gorhom/bottom-sheet';
import React, { createContext, useContext, useRef, useState } from 'react';

type BottomSheetContextType = {
  bottomSheetRef: React.RefObject<BottomSheet | null>;
  isSheetOpen: boolean;
  setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTheatre: string;
  setSelectedTheatre: React.Dispatch<React.SetStateAction<string>>;
};

const BottomSheetContext = createContext<BottomSheetContextType | null>(null);

export const BottomSheetProvider = ({ children }: { children: React.ReactNode }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedTheatre, setSelectedTheatre] = useState('');
  console.log('layoutbsr',bottomSheetRef.current);

  return (
    <BottomSheetContext.Provider
      value={{
        bottomSheetRef,
        isSheetOpen,
        setIsSheetOpen,
        selectedTheatre,
        setSelectedTheatre,
      }}
    >
      {children}
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  if (!context) throw new Error('useBottomSheet must be used within BottomSheetProvider');
  return context;
};
