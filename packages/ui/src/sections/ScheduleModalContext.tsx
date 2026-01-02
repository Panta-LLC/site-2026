"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { ContactModal, ContactModalMode } from "./ContactModal";

interface ContactModalContextType {
  openModal: (mode: ContactModalMode, showQuestionnaire?: boolean, showTemplateSelector?: boolean) => void;
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
  const [defaultMode, setDefaultMode] = useState<ContactModalMode | undefined>(undefined);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);

  const openModal = (
    newMode: ContactModalMode, 
    questionnaire = false,
    templateSelector = false
  ) => {
    setMode(newMode);
    setDefaultMode(newMode);
    setShowQuestionnaire(questionnaire);
    setShowTemplateSelector(templateSelector);
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
        defaultMode={defaultMode}
        email={email}
        phone={phone}
        showQuestionnaire={showQuestionnaire}
        showTemplateSelector={showTemplateSelector}
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

