"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";

interface Slide {
  id: string;
  subheading?: string;
  title: string;
  linkTitle: string;
  description?: string;
  link?: string;
}

interface ContentReference {
  _type: string;
  _id: string;
  title?: string;
  slug?: { current?: string };
  slugValue?: string;
  value?: string;
}

interface HeroCarouselSlide {
  _key?: string;
  subheading?: string;
  title: string;
  description?: string;
  linkTitle?: string;
  customLink?: string;
  order?: number;
  contentReference?: ContentReference | null;
}

interface HeroCarouselProps {
  slides?: HeroCarouselSlide[];
}

function buildLinkFromReference(slide: HeroCarouselSlide): string | undefined {
  if (slide.customLink) {
    return slide.customLink;
  }

  const ref = slide.contentReference;
  if (!ref) {
    return undefined;
  }

  switch (ref._type) {
    case "page":
      return ref.slugValue ? `/${ref.slugValue}` : undefined;
    case "serviceCategory":
      return ref.value ? `/categories/${ref.value}` : undefined;
    case "service":
      return ref.slugValue ? `/services/${ref.slugValue}` : undefined;
    default:
      return undefined;
  }
}

export function HeroCarousel({ slides: sanitySlides = [] }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  const slides: Slide[] = useMemo(() => {
    if (!sanitySlides || sanitySlides.length === 0) {
      return [];
    }

    const validSlides = sanitySlides.filter((slide) => slide.title);

    if (validSlides.length === 0) {
      return [];
    }

    const sortedSlides = [...validSlides].sort((a, b) => {
      const orderA = a.order ?? 999;
      const orderB = b.order ?? 999;
      return orderA - orderB;
    });

    return sortedSlides.map((slide, index) => {
      const link = buildLinkFromReference(slide);
      return {
        id: slide._key || `slide-${index}`,
        subheading: slide.subheading || "",
        title: slide.title,
        linkTitle: slide.linkTitle || slide.title,
        description: slide.description,
        link,
      };
    });
  }, [sanitySlides]);

  const SLIDE_DURATION = 5000;

  if (slides.length === 0) {
    return null;
  }

  useEffect(() => {
    if (!isPlaying || slides.length === 0) {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      return;
    }

    setProgress(0);
    startTimeRef.current = Date.now();

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }, 16);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    };
  }, [isPlaying, currentSlide, slides.length]);

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
    <section className="relative h-screen px-6 py-24 sm:px-8 lg:px-12 text-white bg-gradient-to-b bg-highlight min-h-[85vh] flex content-center flex-col justify-center items-center overflow-hidden pb-24">
      <div className="relative w-full px-6 max-w-7xl min-h-[450px] md:min-h-[400px]">
        <div className="relative flex items-center justify-center">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              {slide.subheading && (
                <p className="text-sm font-bold md:text-base text-black mb-2 uppercase">
                  {slide.subheading}
                </p>
              )}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl max-w-4xl font-bold tracking-tight mb-4">
                {slide.title}
              </h1>
              {slide.description && (
                <p className="text-lg md:text-xl lg:text-2xl mt-6 mb-10 text-white max-w-3xl leading-relaxed">
                  {slide.description}
                </p>
              )}
              {slide.link && (
                <div className="mt-8">
                  <Link
                    href={slide.link}
                    className="inline-block px-8 py-4 bg-white text-black rounded-lg font-semibold text-lg hover:bg-neutral-100 transition-colors hover:shadow-xl"
                  >
                    Learn More
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-1 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
          <div className="hidden md:flex flex-1 justify-center gap-6">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`px-4 py-6 text-sm font-bold transition-all duration-300 relative ${
                  index === currentSlide ? "text-black" : "text-neutral-600 hover:text-neutral-900"
                }`}
                aria-label={`Go to ${slide.linkTitle} slide`}
              >
                {slide.linkTitle}
                {index === currentSlide && (
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-black"></span>
                )}
              </button>
            ))}
          </div>

          <div className="md:hidden flex-1 flex items-center justify-center gap-4">
            <button
              onClick={goToPrevious}
              className="p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
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

            <button
              onClick={() => goToSlide(currentSlide)}
              className="px-4 py-6 text-md font-bold text-black relative"
              aria-label={`Current slide: ${slides[currentSlide]?.linkTitle}`}
            >
              {slides[currentSlide]?.linkTitle}
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-black"></span>
            </button>

            <button
              onClick={goToNext}
              className="p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
              aria-label="Next slide"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={togglePlayPause}
              className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-neutral-900 hover:text-black transition-colors"
              aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
            >
              <svg
                className="absolute inset-0 w-10 h-10 md:w-12 md:h-12 transform -rotate-90"
                viewBox="0 0 48 48"
              >
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke="rgba(0, 0, 0, 0.1)"
                  strokeWidth="2"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 20}`}
                  strokeDashoffset={`${2 * Math.PI * 20 * (1 - progress / 100)}`}
                  className="transition-all duration-75 ease-linear"
                />
              </svg>
              {isPlaying ? (
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 relative z-10"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 relative z-10 ml-0.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
