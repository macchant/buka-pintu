import { useState, useEffect, useRef } from 'react';

const HERO_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1920&q=80',
    credit: 'Library',
  },
  {
    url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&q=80',
    credit: 'Books',
  },
  {
    url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1920&q=80',
    credit: 'Reading',
  },
  {
    url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1920&q=80',
    credit: 'Library Interior',
  },
];

export default function HeroBackground() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState(new Set([0]));
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.bottom > 0) {
          setScrollY(window.scrollY * 0.3);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Preload next images
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % HERO_IMAGES.length;
    const img = new Image();
    img.src = HERO_IMAGES[nextIndex].url;
    img.onload = () => {
      setLoadedImages(prev => new Set([...prev, nextIndex]));
    };
  }, [currentIndex]);

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
        setIsTransitioning(false);
      }, 500);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            HERO_IMAGES.forEach((image, index) => {
              const img = new Image();
              img.src = image.url;
              img.onload = () => {
                setLoadedImages(prev => new Set([...prev, index]));
              };
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const goToSlide = (index) => {
    if (index !== currentIndex) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const goToPrev = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);
      setIsTransitioning(false);
    }, 300);
  };

  const goToNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {HERO_IMAGES.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          } ${isTransitioning ? 'pointer-events-none' : ''}`}
          style={{
            backgroundImage: `url(${image.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${scrollY}px)`,
          }}
        >
          {/* Enhanced Overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-900/70 to-gray-900/90 dark:from-gray-950/85 dark:via-gray-900/75 dark:to-gray-950/95" />
        </div>
      ))}

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {HERO_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'w-8 bg-white shadow-lg shadow-white/30'
                : 'w-2 bg-white/50 hover:bg-white/80 hover:w-4'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/40 hover:scale-110 transition-all duration-300 z-20 opacity-0 hover:opacity-100 focus:opacity-100"
        aria-label="Previous image"
      >
        <i className="fas fa-chevron-left text-white"></i>
      </button>

      {/* Right Arrow */}
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/40 hover:scale-110 transition-all duration-300 z-20 opacity-0 hover:opacity-100 focus:opacity-100"
        aria-label="Next image"
      >
        <i className="fas fa-chevron-right text-white"></i>
      </button>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
        <div
          className="h-full bg-white/60 transition-all duration-300"
          style={{
            width: `${((currentIndex + 1) / HERO_IMAGES.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}
