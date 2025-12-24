"use client";

import React from "react";
import Link from "next/link";
import { useScheduleModal } from "./ScheduleModalContext";
import { PortableText } from "./PortableText";

interface HeroSection {
  heading?: string;
  content?: string | any;
  buttonText?: string;
  buttonLink?: string;
}

interface HeroProps {
  section?: HeroSection;
}

const SCHEDULE_CTA_TEXT = ["Schedule a Call", "schedule a call"];
const MESSAGE_CTA_TEXT = ["Start a Conversation", "Send a Message", "start a conversation", "send a message", "Get in Touch", "get in touch"];

export function Hero({ section }: HeroProps) {

  const heading = section?.heading ?? "Welcome to Panta";

  const content = section?.content ?? [
    {
      _key: "default",
      _type: "block",
      children: [{ text: "Build delightful websites powered by Sanity and Next.js." }],
      style: "normal",
    },
  ];

  const scheduleModal = useScheduleModal();
  const isScheduleCTA = scheduleModal && section?.buttonText && SCHEDULE_CTA_TEXT.some(text => 
    section.buttonText.toLowerCase().includes(text.toLowerCase())
  );
  const isMessageCTA = scheduleModal && section?.buttonText && MESSAGE_CTA_TEXT.some(text => 
    section.buttonText.toLowerCase().includes(text.toLowerCase())
  );
  const shouldOpenModal = isScheduleCTA || isMessageCTA;

  const handleButtonClick = (e: React.MouseEvent) => {
    if (shouldOpenModal && scheduleModal) {
      e.preventDefault();
      const mode = isScheduleCTA ? "schedule" : "message";
      scheduleModal.openModal(mode);
    }
  };

  return (
    <section className="py-24 text-white bg-gradient-to-b bg-highlight min-h-[85vh] flex content-center flex-col justify-center items-center pt-32">
      <div className="max-w-6xl sm:px-8 lg:px-12 mx-auto flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl mb-6">
          {heading}
        </h1>
        <div className="text-lg md:text-xl lg:text-2xl prose dark:prose-invert mt-4 max-w-3xl mb-8">
          <PortableText content={content} />
        </div>
        {section?.buttonText && section?.buttonLink && (
          shouldOpenModal ? (
            <button
              onClick={handleButtonClick}
              className="inline-block px-8 py-4 bg-white text-black rounded-lg font-semibold text-lg hover:bg-neutral-100 transition-colors hover:shadow-xl"
            >
              {section.buttonText}
            </button>
          ) : (
            <Link
              href={section.buttonLink}
              className="inline-block px-8 py-4 bg-white text-black rounded-lg font-semibold text-lg hover:bg-neutral-100 transition-colors hover:shadow-xl"
            >
              {section.buttonText}
            </Link>
          )
        )}
      </div>
    </section>
  );
}
