"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export interface CarouselItem {
  src: string;
  alt?: string;
  caption?: string;
}

interface CarouselProps {
  images?: (string | CarouselItem)[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

const defaultItems: CarouselItem[] = [
  {
    src: "/profile_polaroid.jpg",
    alt: "Troy Profile",
  },
  {
    src: "/workspace_polaroid.jpg",
    alt: "Workspace Setup",
  },
  {
    src: "/tandem_preview.jpg",
    alt: "Featured Work",
  },
];

export default function Carousel({
  images = defaultItems,
  autoPlay = true,
  interval = 5000,
  className = "",
}: CarouselProps) {
  const normalizedItems: CarouselItem[] = images.map((item) =>
    typeof item === "string" ? { src: item, alt: "Slide" } : item
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const total = normalizedItems.length;

  const nextSlide = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Autoplay to cycle left-to-right
  useEffect(() => {
    if (!autoPlay || isPaused || total <= 1) return;
    const timer = setInterval(() => {
      nextSlide();
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, isPaused, interval, nextSlide, total]);

  // Touch Swipe for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const distance = touchStartX - touchEndX;

    if (distance > 40) {
      nextSlide();
    } else if (distance < -40) {
      prevSlide();
    }
    setTouchStartX(null);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  };

  if (total === 0) return null;

  return (
    <div
      tabIndex={0}
      role="region"
      aria-label="Image Carousel"
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`flex flex-col items-center gap-4 outline-none select-none w-full ${className}`}
    >
      {/* Main Image Area with hover expand and rounded corners */}
      <div className="group/image relative aspect-4/5 sm:aspect-square w-full max-w-md overflow-hidden rounded-xl transition-transform duration-500 ease-in-out hover:scale-[1.04] cursor-pointer">
        {normalizedItems.map((item, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={index}
              aria-hidden={!isActive}
              className={`absolute inset-0 h-full w-full transition-opacity duration-[1500ms] ease-in-out ${isActive
                ? "opacity-100 pointer-events-auto z-10"
                : "opacity-0 pointer-events-none z-0"
                }`}
            >
              <Image
                src={item.src}
                alt={item.alt || `Slide ${index + 1}`}
                fill
                sizes="(max-width: 768px) 85vw, 450px"
                priority={index === 0}
                className="object-cover object-center transition-transform duration-700 ease-in-out group-hover/image:scale-105"
              />
            </div>
          );
        })}
      </div>

      {/* Progress Circles Below Carousel for Navigation */}
      {total > 1 && (
        <div className="flex items-center justify-center gap-2 pt-1">
          {normalizedItems.map((_, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={index}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Go to picture ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-700 ease-out cursor-pointer ${isActive
                  ? "w-6 bg-black"
                  : "w-2 bg-black/25 hover:bg-black/50"
                  }`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export { Carousel as CarouselWithContent };