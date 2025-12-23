"use client";

import React from "react";
import Link from "next/link";
import { useScheduleModal } from "./ScheduleModalContext";

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
  const finalHeading = section?.heading || heading || "Ready to Get Started?";
  const finalContent =
    section?.content || content || "Let's discuss how we can help you achieve your goals.";
  const finalButtonText = section?.buttonText || buttonText || "Contact Us";
  const finalButtonLink = section?.buttonLink || buttonLink || "/contact";
  
  const scheduleModal = useScheduleModal();
  const isScheduleCTA = scheduleModal && SCHEDULE_CTA_TEXT.some(text => 
    finalButtonText.toLowerCase().includes(text.toLowerCase())
  );
  const isMessageCTA = scheduleModal && MESSAGE_CTA_TEXT.some(text => 
    finalButtonText.toLowerCase().includes(text.toLowerCase())
  );
  const shouldOpenModal = isScheduleCTA || isMessageCTA;

  const renderContent = (content: any) => {
    if (!content) return null;
    if (typeof content === "string") {
      return <p className="text-neutral-700 dark:text-neutral-300">{content}</p>;
    }
    if (Array.isArray(content)) {
      return content.map((block: any, i: number) => {
        if (!block) return null;
        if (block._type === "block" && Array.isArray(block.children)) {
          const text = block.children.map((c: any) => c.text || "").join("");
          return (
            <p key={block._key || i} className="mt-3 text-neutral-700 dark:text-neutral-300">
              {text}
            </p>
          );
        }
        return null;
      });
    }
    return <p className="text-neutral-700 dark:text-neutral-300">{String(content)}</p>;
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    if (shouldOpenModal && scheduleModal) {
      e.preventDefault();
      const mode = isScheduleCTA ? "schedule" : "message";
      scheduleModal.openModal(mode);
    }
  };

  const ButtonComponent = shouldOpenModal ? "button" : Link;
  const buttonProps = shouldOpenModal
    ? { onClick: handleButtonClick }
    : { href: finalButtonLink };

  return (
    <section className="px-6 py-20 sm:px-8 lg:px-12 bg-light">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">{finalHeading}</h2>
        <div>{renderContent(finalContent)}</div>
        <ButtonComponent
          {...buttonProps}
          className="mt-6 inline-block rounded-lg bg-highlight hover:bg-highlight/90 text-white px-6 py-3 font-semibold transition-colors"
        >
          {finalButtonText}
        </ButtonComponent>
      </div>
    </section>
  );
}
