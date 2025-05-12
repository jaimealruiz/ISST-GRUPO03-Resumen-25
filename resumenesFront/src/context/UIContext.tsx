// context/UIContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type ModalType = 'subir' | 'retirar' | null;

type UIContextType = {
  loading: boolean;
  modal: ModalType;
  setLoading: (value: boolean) => void;
  showModal: (modal: ModalType) => void;
  closeModal: () => void;
};

const UIContext = createContext<UIContextType | null>(null);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [modal, setModal] = useState<ModalType>(null);

  const showModal = (modalName: ModalType) => setModal(modalName);
  const closeModal = () => setModal(null);

  return (
    <UIContext.Provider value={{ loading, modal, setLoading, showModal, closeModal }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) throw new Error('useUI must be used within a UIProvider');
  return context;
};
