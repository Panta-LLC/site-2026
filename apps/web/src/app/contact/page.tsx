"use client";

import { Footer } from "@panta/ui/src/sections/Footer";
import { useScheduleModal } from "@panta/ui/src/sections/ScheduleModalContext";
import { useEffect } from "react";

export default function ContactPage() {
  const scheduleModal = useScheduleModal();

  useEffect(() => {
    // Open modal when page loads if modal context is available
    if (scheduleModal && !scheduleModal.isOpen) {
      // Small delay to ensure page is rendered
      const timer = setTimeout(() => {
        scheduleModal.openModal("message", false, true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [scheduleModal]);

  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16 sm:px-8 lg:px-12">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p className="mb-6 text-lg text-neutral-700 dark:text-neutral-300">
            We&apos;d love to hear from you. Use the contact form below to get in touch, or reach out
            directly via email or phone.
          </p>
          {scheduleModal && (
            <div className="mb-8">
              <button
                onClick={() => scheduleModal.openModal("message", false, true)}
                className="px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors font-semibold"
              >
                Open Contact Form
              </button>
            </div>
          )}
          <div className="mt-8 p-6 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Other Ways to Reach Us</h2>
            <p className="mb-4">
              If you prefer to contact us directly, you can reach out via email or phone. We typically
              respond within 1-2 business days.
            </p>
            <p className="text-neutral-600 dark:text-neutral-400">
              Please use the contact form above for the fastest response.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

