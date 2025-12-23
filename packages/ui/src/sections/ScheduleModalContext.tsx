"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { ContactModal, ContactModalMode } from "./ContactModal";

interface ContactModalContextType {
  openModal: (mode: ContactModalMode, showQuestionnaire?: boolean) => void;
  closeModal: () => void;
  isOpen: boolean;
  mode: ContactModalMode | null;
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(undefined);

export function ScheduleModalProvider({
  children,
  email,
  phone,
}: {
  children: ReactNode;
  email?: string;
  phone?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<ContactModalMode>("schedule");
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);

  const openModal = (newMode: ContactModalMode, questionnaire = false) => {
    setMode(newMode);
    setShowQuestionnaire(questionnaire);
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);

  return (
    <ContactModalContext.Provider value={{ openModal, closeModal, isOpen, mode }}>
      {children}
      <ContactModal
        isOpen={isOpen}
        onClose={closeModal}
        mode={mode}
        email={email}
        phone={phone}
        showQuestionnaire={showQuestionnaire}
      />
    </ContactModalContext.Provider>
  );
}

export function useScheduleModal() {
  const context = useContext(ContactModalContext);
  if (!context) {
    return {
      openModal: () => {},
      closeModal: () => {},
      isOpen: false,
      mode: null,
    };
  }
  return context;
}

