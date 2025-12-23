"use client";

import React, { useState, useEffect } from "react";

export type ContactModalMode = "schedule" | "message";

type SchedulingMode = "nextAvailable" | "anyTime" | "specificTimes";

interface TimeRange {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: ContactModalMode;
  email?: string;
  phone?: string;
  showQuestionnaire?: boolean;
}

// Scheduling form component
function SchedulingForm({
  schedulingMode,
  setSchedulingMode,
  timeRanges,
  setTimeRanges,
  anyTimeDates,
  setAnyTimeDates,
  getMinDate,
  addTimeRange,
  removeTimeRange,
  updateTimeRange,
  addAnyTimeDate,
  removeAnyTimeDate,
  updateAnyTimeDate,
}: {
  schedulingMode: SchedulingMode;
  setSchedulingMode: (mode: SchedulingMode) => void;
  timeRanges: TimeRange[];
  setTimeRanges: (ranges: TimeRange[]) => void;
  anyTimeDates: string[];
  setAnyTimeDates: (dates: string[]) => void;
  getMinDate: () => string;
  addTimeRange: () => void;
  removeTimeRange: (id: string) => void;
  updateTimeRange: (id: string, field: keyof TimeRange, value: string) => void;
  addAnyTimeDate: () => void;
  removeAnyTimeDate: (index: number) => void;
  updateAnyTimeDate: (index: number, value: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold mb-3">When are you available?</label>
        <div className="space-y-2">
          <label className="flex items-start gap-3 p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
            <input
              type="radio"
              name="schedulingMode"
              value="nextAvailable"
              checked={schedulingMode === "nextAvailable"}
              onChange={(e) => setSchedulingMode(e.target.value as SchedulingMode)}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="font-medium">Next available slot</div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                We'll find the next time that works for both of us
              </div>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
            <input
              type="radio"
              name="schedulingMode"
              value="anyTime"
              checked={schedulingMode === "anyTime"}
              onChange={(e) => setSchedulingMode(e.target.value as SchedulingMode)}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="font-medium">Available any time on selected days</div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                Pick dates, we'll schedule anytime that day
              </div>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
            <input
              type="radio"
              name="schedulingMode"
              value="specificTimes"
              checked={schedulingMode === "specificTimes"}
              onChange={(e) => setSchedulingMode(e.target.value as SchedulingMode)}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="font-medium">Specific time ranges</div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                Choose exact dates and times
              </div>
            </div>
          </label>
        </div>
      </div>

      {schedulingMode === "nextAvailable" && (
        <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            We'll contact you to find the next available time that works for both of us.
          </p>
        </div>
      )}

      {schedulingMode === "anyTime" && (
        <div className="space-y-4">
          {anyTimeDates.map((date, index) => (
            <div key={index} className="flex gap-2 items-end">
              <div className="flex-1">
                <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">
                  Available Date {index + 1}
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => updateAnyTimeDate(index, e.target.value)}
                  min={getMinDate()}
                  className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-brand"
                  required={schedulingMode === "anyTime"}
                />
              </div>
              {anyTimeDates.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeAnyTimeDate(index)}
                  className="px-3 py-2 text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addAnyTimeDate}
            className="w-full py-2 px-4 border-2 border-dashed border-neutral-300 dark:border-neutral-600 rounded-md text-neutral-600 dark:text-neutral-400 hover:border-brand hover:text-brand transition-colors text-sm"
          >
            + Add Another Date
          </button>
        </div>
      )}

      {schedulingMode === "specificTimes" && (
        <div className="space-y-4">
          {timeRanges.map((range, index) => (
            <div key={range.id} className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Time Range {index + 1}
                </span>
                {timeRanges.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTimeRange(range.id)}
                    className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={range.date}
                    onChange={(e) => updateTimeRange(range.id, "date", e.target.value)}
                    min={getMinDate()}
                    className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-brand"
                    required={schedulingMode === "specificTimes"}
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={range.startTime}
                    onChange={(e) => updateTimeRange(range.id, "startTime", e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-brand"
                    required={schedulingMode === "specificTimes"}
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={range.endTime}
                    onChange={(e) => updateTimeRange(range.id, "endTime", e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-brand"
                    required={schedulingMode === "specificTimes"}
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addTimeRange}
            className="w-full py-2 px-4 border-2 border-dashed border-neutral-300 dark:border-neutral-600 rounded-md text-neutral-600 dark:text-neutral-400 hover:border-brand hover:text-brand transition-colors text-sm"
          >
            + Add Another Time Range
          </button>
        </div>
      )}
    </div>
  );
}

// Questionnaire component (placeholder for future expansion)
function QuestionnaireForm({ showQuestionnaire }: { showQuestionnaire?: boolean }) {
  if (!showQuestionnaire) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Quick Questions</h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Questionnaire functionality coming soon...
      </p>
      {/* Future: Add questionnaire fields here */}
    </div>
  );
}

export function ContactModal({ isOpen, onClose, mode, email, phone, showQuestionnaire = false }: ContactModalProps) {
  // Shared state
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Scheduling-specific state
  const [schedulingMode, setSchedulingMode] = useState<SchedulingMode>("nextAvailable");
  const [timeRanges, setTimeRanges] = useState<TimeRange[]>([
    { id: "1", date: "", startTime: "", endTime: "" },
  ]);
  const [anyTimeDates, setAnyTimeDates] = useState<string[]>([""]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Reset form when modal opens
      setSchedulingMode("nextAvailable");
      setTimeRanges([{ id: "1", date: "", startTime: "", endTime: "" }]);
      setAnyTimeDates([""]);
      setMessage("");
      setSubmitStatus("idle");
      setErrorMessage("");
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const addTimeRange = () => {
    const newId = `${Date.now()}`;
    setTimeRanges([...timeRanges, { id: newId, date: "", startTime: "", endTime: "" }]);
  };

  const removeTimeRange = (id: string) => {
    if (timeRanges.length > 1) {
      setTimeRanges(timeRanges.filter((range) => range.id !== id));
    }
  };

  const updateTimeRange = (id: string, field: keyof TimeRange, value: string) => {
    setTimeRanges(
      timeRanges.map((range) => (range.id === id ? { ...range, [field]: value } : range))
    );
  };

  const addAnyTimeDate = () => {
    setAnyTimeDates([...anyTimeDates, ""]);
  };

  const removeAnyTimeDate = (index: number) => {
    if (anyTimeDates.length > 1) {
      setAnyTimeDates(anyTimeDates.filter((_, i) => i !== index));
    }
  };

  const updateAnyTimeDate = (index: number, value: string) => {
    setAnyTimeDates(anyTimeDates.map((date, i) => (i === index ? value : date)));
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const validateForm = (): boolean => {
    if (mode === "schedule") {
      if (schedulingMode === "anyTime") {
        const validDates = anyTimeDates.filter(Boolean);
        if (validDates.length === 0) {
          setErrorMessage("Please select at least one available date.");
          return false;
        }
      } else if (schedulingMode === "specificTimes") {
        const validRanges = timeRanges.filter(
          (r) => r.date && r.startTime && r.endTime
        );
        if (validRanges.length === 0) {
          setErrorMessage("Please fill in at least one complete time range.");
          return false;
        }
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const endpoint = mode === "schedule" ? "/api/schedule-call" : "/api/send-message";
      const payload =
        mode === "schedule"
          ? {
              schedulingMode,
              timeRanges:
                schedulingMode === "specificTimes"
                  ? timeRanges
                      .filter((r) => r.date && r.startTime && r.endTime)
                      .map(({ id, ...rest }) => rest)
                  : undefined,
              anyTimeDates:
                schedulingMode === "anyTime" ? anyTimeDates.filter(Boolean) : undefined,
              message: message.trim() || undefined,
            }
          : {
              message: message.trim(),
            };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit request");
      }

      setSubmitStatus("success");

      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error(`Error submitting ${mode} request:`, error);
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to submit request. Please try again or contact us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTitle = () => {
    return mode === "schedule" ? "Schedule a Call" : "Send a Message";
  };

  const getSubmitButtonText = () => {
    if (isSubmitting) return "Submitting...";
    if (submitStatus === "success") return "Submitted!";
    return mode === "schedule" ? "Submit Request" : "Send Message";
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white dark:bg-neutral-900 rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{getTitle()}</h2>
            <button
              onClick={onClose}
              className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Message */}
              <div className="lg:order-1">
                <label htmlFor="message" className="block text-sm font-semibold mb-2">
                  {mode === "schedule" ? "Message (Optional)" : "Your Message"}
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={12}
                  className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-brand resize-none"
                  placeholder={
                    mode === "schedule"
                      ? "Tell us about your project or what you'd like to discuss..."
                      : "Tell us about your project, questions, or how we can help..."
                  }
                  required={mode === "message"}
                />
              </div>

              {/* Right Column - Scheduling Options or Questionnaire */}
              <div className="lg:order-2">
                {mode === "schedule" ? (
                  <SchedulingForm
                    schedulingMode={schedulingMode}
                    setSchedulingMode={setSchedulingMode}
                    timeRanges={timeRanges}
                    setTimeRanges={setTimeRanges}
                    anyTimeDates={anyTimeDates}
                    setAnyTimeDates={setAnyTimeDates}
                    getMinDate={getMinDate}
                    addTimeRange={addTimeRange}
                    removeTimeRange={removeTimeRange}
                    updateTimeRange={updateTimeRange}
                    addAnyTimeDate={addAnyTimeDate}
                    removeAnyTimeDate={removeAnyTimeDate}
                    updateAnyTimeDate={updateAnyTimeDate}
                  />
                ) : (
                  <QuestionnaireForm showQuestionnaire={showQuestionnaire} />
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                Or contact us directly:
              </p>
              <div className="flex flex-wrap gap-4">
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-2 text-brand hover:text-brand-dark transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{email}</span>
                  </a>
                )}
                {phone && (
                  <a
                    href={`tel:${phone}`}
                    className="flex items-center gap-2 text-brand hover:text-brand-dark transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span>{phone}</span>
                  </a>
                )}
              </div>
            </div>

            {(submitStatus === "error" || errorMessage) && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-800 dark:text-red-200">
                  {errorMessage || "An error occurred. Please try again."}
                </p>
              </div>
            )}

            {submitStatus === "success" && (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-sm text-green-800 dark:text-green-200 font-medium">
                  ✓ Request submitted successfully! We'll be in touch soon.
                </p>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || submitStatus === "success"}
                className="flex-1 px-4 py-2 bg-brand text-white rounded-md hover:bg-brand-dark transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  getSubmitButtonText()
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

