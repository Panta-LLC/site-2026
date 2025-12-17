"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface Slide {
  id: string;
  subheading: string;
  title: string;
  linkTitle: string;
  description: string;
  link?: string;
}

interface HeroCarouselProps {
  services?: Array<{ _id: string; title: string; value: string; description?: string }>;
  missionPage?: { title?: string; description?: string; slug?: { current?: string } };
}

export function HeroCarousel({ services, missionPage }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Find specific services for the carousel
  const consultingService = services?.find((s) => s.value === "consulting");
  const productWebService = services?.find((s) => s.value === "product-web");

  // Define slides with exact titles as requested
  const slides: Slide[] = [
    {
      id: "mission",
      subheading: "Our Mission",
      title: missionPage?.title || "Our Mission",
      linkTitle: "Our Mission",
      description: missionPage?.description,

      link: missionPage?.slug?.current ? `/${missionPage.slug.current}` : undefined,
    },
    {
      id: "consulting",
      subheading: "Service",
      title: consultingService?.title || "Business Technology Consulting",
      linkTitle: "Business Technology Consulting",
      description:
        consultingService?.description ||
        "Strategic technology guidance that transforms your business operations. From initial strategy development to ongoing support, we help you navigate complex technology decisions.",
      link: consultingService ? `/categories/${consultingService.value}` : "/categories/consulting",
    },
    {
      id: "product-web",
      subheading: "Service",
      title: productWebService?.title || "Product and Web Development",
      linkTitle: "Product and Web Development",
      description:
        productWebService?.description ||
        "Turn your vision into market-ready products and powerful web applications. We create solutions that engage users and drive business results.",
      link: productWebService
        ? `/categories/${productWebService.value}`
        : "/categories/product-web",
    },
  ];

  const SLIDE_DURATION = 5000; // 5 seconds

  // Progress timer animation
  useEffect(() => {
    if (!isPlaying) {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      return;
    }

    // Reset progress and start time when slide changes
    setProgress(0);
    startTimeRef.current = Date.now();

    // Update progress smoothly
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(newProgress);

      // Auto-advance when progress reaches 100%
      if (newProgress >= 100) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }, 16); // ~60fps updates

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    };
  }, [isPlaying, currentSlide, slides.length]);

  // Reset progress when slide changes
  useEffect(() => {
    if (isPlaying) {
      setProgress(0);
      startTimeRef.current = Date.now();
    }
  }, [currentSlide, isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    // Pause timer when manually navigating
    setIsPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsPlaying(false);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsPlaying(false);
  };

  return (
    <section className="relative px-6 py-24 sm:px-8 lg:px-12 text-white bg-gradient-to-b from-gray-900 to-gray-800 min-h-[85vh] flex content-center flex-col justify-center items-center overflow-hidden">
      {/* Slides Container */}
      <div className="relative w-full px-6 max-w-5xl min-h-[450px] md:min-h-[400px]">
        <div className="relative flex items-center justify-center">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <p className="text-sm font-medium md:text-base text-neutral-400 mb-2 uppercase">
                {slide.subheading}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl max-w-3xlfont-bold tracking-tight mb-4">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl mt-6 mb-10 text-neutral-200 max-w-3xl leading-relaxed">
                {slide.description}
              </p>
              {slide.link && (
                <div className="mt-8">
                  <Link
                    href={slide.link}
                    className="inline-block px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold text-lg hover:bg-neutral-100 transition-colors shadow-lg hover:shadow-xl"
                  >
                    Learn More
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation - Bottom Center */}
      <div className="absolute bottom-8 left-0 right-0 flex items-center">
        {/* Desktop Navigation - All Buttons */}
        <div className="hidden md:flex flex-1 justify-center gap-4">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                index === currentSlide
                  ? "text-white border-b-2 border-white"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
              aria-label={`Go to ${slide.linkTitle} slide`}
            >
              {slide.linkTitle}
            </button>
          ))}
        </div>

        {/* Mobile Navigation - Prev, Active Button, Next */}
        <div className="md:hidden flex-1 flex items-center justify-center gap-4">
          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            className="p-2 text-white hover:text-neutral-200 transition-colors"
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Active Slide Button */}
          <button
            onClick={() => goToSlide(currentSlide)}
            className="px-4 py-2 text-sm font-medium text-white border-b-2 border-white"
            aria-label={`Current slide: ${slides[currentSlide]?.linkTitle}`}
          >
            {slides[currentSlide]?.linkTitle}
          </button>

          {/* Next Button */}
          <button
            onClick={goToNext}
            className="p-2 text-white hover:text-neutral-200 transition-colors"
            aria-label="Next slide"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Play/Pause Button - Fixed to Right with Timer */}
        <div className="absolute right-4 md:right-8">
          <button
            onClick={togglePlayPause}
            className="relative w-8 h-8 md:w-12 md:h-12 flex items-center justify-center text-white hover:text-neutral-200 transition-colors"
            aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
          >
            {/* Circular Progress Indicator */}
            <svg
              className="absolute inset-0 w-8 h-8 md:w-12 md:h-12 transform -rotate-90"
              viewBox="0 0 48 48"
            >
              {/* Background circle */}
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="2"
              />
              {/* Progress circle */}
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 20}`}
                strokeDashoffset={`${2 * Math.PI * 20 * (1 - progress / 100)}`}
                className="transition-all duration-75 ease-linear"
              />
            </svg>
            {/* Play/Pause Icon */}
            {isPlaying ? (
              // Pause icon (two vertical bars)
              <svg
                className="w-4 h-4 md:w-5 md:h-5 relative z-10"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              // Play icon (triangle)
              <svg
                className="w-4 h-4 md:w-5 md:h-5 relative z-10 ml-0.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
