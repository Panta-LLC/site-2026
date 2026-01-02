"use client";

import React from "react";
import Link from "next/link";
import { useScheduleModal } from "./ScheduleModalContext";
import { PortableText } from "./PortableText";

interface CTAProps {
  section?: {
    heading?: string;
    content?: string | any;
    buttonText?: string;
    buttonLink?: string;
  };
  heading?: string;
  content?: string;
  buttonText?: string;
  buttonLink?: string;
}

const SCHEDULE_CTA_TEXT = ["Schedule a Call", "schedule a call"];
const MESSAGE_CTA_TEXT = ["Start a Conversation", "Send a Message", "start a conversation", "send a message", "Get in Touch", "get in touch"];

export function CTA({ section, heading, content, buttonText, buttonLink }: CTAProps) {
  const finalHeading = section?.heading || heading || "Ready to Build Something Great?";
  const finalContent =
    section?.content || content || "Let's discuss how we can help you achieve your goals and strengthen your digital foundations.";
  const finalButtonText = section?.buttonText || buttonText || "Schedule a Call";
  const finalButtonLink = section?.buttonLink || buttonLink || "/contact";
  
  const scheduleModal = useScheduleModal();
  const isScheduleCTA = scheduleModal && SCHEDULE_CTA_TEXT.some(text => 
    finalButtonText.toLowerCase().includes(text.toLowerCase())
  );
  const isMessageCTA = scheduleModal && MESSAGE_CTA_TEXT.some(text => 
    finalButtonText.toLowerCase().includes(text.toLowerCase())
  );
  const shouldOpenModal = isScheduleCTA || isMessageCTA;


  const handleButtonClick = (e: React.MouseEvent) => {
    if (shouldOpenModal && scheduleModal) {
      e.preventDefault();
      // Default to schedule for better conversion
      const mode = isScheduleCTA ? "schedule" : isMessageCTA ? "message" : "schedule";
      scheduleModal.openModal(mode);
    }
  };

  return (
    <section className="px-6 py-24 sm:px-8 lg:px-12 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-800 dark:to-neutral-900">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900 dark:text-neutral-100">
          {finalHeading}
        </h2>
        <div className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 mb-8 max-w-2xl mx-auto">
          <PortableText content={finalContent} />
        </div>
        {shouldOpenModal ? (
          <button
            onClick={handleButtonClick}
            className="mt-4 inline-block rounded-lg bg-brand hover:bg-brand-dark text-white px-8 py-4 font-bold text-lg transition-all hover:shadow-xl hover:scale-105"
          >
            {finalButtonText}
          </button>
        ) : (
          <Link
            href={finalButtonLink}
            className="mt-4 inline-block rounded-lg bg-brand hover:bg-brand-dark text-white px-8 py-4 font-bold text-lg transition-all hover:shadow-xl hover:scale-105"
          >
            {finalButtonText}
          </Link>
        )}
      </div>
    </section>
  );
}
