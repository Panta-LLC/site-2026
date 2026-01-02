"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useScheduleModal } from "./ScheduleModalContext";
import { PortableText } from "./PortableText";

interface HeroSection {
  heading?: string;
  content?: string | any;
  buttonText?: string;
  buttonLink?: string;
  image?: {
    asset?: {
      _id?: string;
      url?: string;
    };
    alt?: string;
  };
}

interface HeroProps {
  section?: HeroSection;
}

const SCHEDULE_CTA_TEXT = ["Schedule a Call", "schedule a call"];
const MESSAGE_CTA_TEXT = [
  "Start a Conversation",
  "Send a Message",
  "start a conversation",
  "send a message",
  "Get in Touch",
  "get in touch",
];

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
  const isScheduleCTA =
    scheduleModal &&
    section?.buttonText &&
    SCHEDULE_CTA_TEXT.some((text) => section.buttonText.toLowerCase().includes(text.toLowerCase()));
  const isMessageCTA =
    scheduleModal &&
    section?.buttonText &&
    MESSAGE_CTA_TEXT.some((text) => section.buttonText.toLowerCase().includes(text.toLowerCase()));
  const shouldOpenModal = isScheduleCTA || isMessageCTA;

  // Default to "schedule" mode for better conversion if button text suggests it
  const defaultModalMode = isScheduleCTA ? "schedule" : isMessageCTA ? "message" : null;

  const handleButtonClick = (e: React.MouseEvent) => {
    if (shouldOpenModal && scheduleModal && defaultModalMode) {
      e.preventDefault();
      scheduleModal.openModal(defaultModalMode);
    }
  };

  const backgroundImageUrl = section?.image?.asset?.url;
  const hasBackgroundImage = !!backgroundImageUrl;

  return (
    <section
      className={`relative p-6 py-24 text-white min-h-[85vh] flex content-center flex-col justify-center items-center pt-32 overflow-hidden ${
        hasBackgroundImage ? "" : "bg-gradient-to-b bg-highlight"
      }`}
    >
      {hasBackgroundImage && (
        <>
          <div className="absolute inset-0 z-0">
            <Image
              src={backgroundImageUrl}
              alt={section.image?.alt || "Hero background"}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 z-0 bg-black/50" />
        </>
      )}
      <div className="relative z-10 max-w-6xl sm:px-8 lg:px-12 mx-auto flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold max-w-4xl mb-6">{heading}</h1>
        <div className="text-lg md:text-xl lg:text-2xl prose dark:prose-invert mt-4 max-w-3xl mb-8">
          <PortableText content={content} />
        </div>
        {section?.buttonText &&
          section?.buttonLink &&
          (shouldOpenModal ? (
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
          ))}
      </div>
    </section>
  );
}
