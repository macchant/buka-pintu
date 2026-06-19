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

// 3D Book SVG Component
const Book3DMockup = () => (
  <div className="relative w-64 h-80 perspective-1000">
    {/* Book Stack - 3D Effect */}
    <div className="absolute inset-0 animate-float" style={{ animationDelay: '0s' }}>
      {/* Bottom Book */}
      <div className="absolute bottom-0 left-4 w-48 h-64 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-lg shadow-2xl transform -rotate-6 translate-y-4"
           style={{ transform: 'rotateY(-15deg) rotateZ(-6deg) translateY(16px)' }}>
        <div className="absolute left-2 top-0 bottom-0 w-3 bg-gradient-to-r from-emerald-800 to-emerald-700 rounded-l" />
        <div className="p-4 pt-8">
          <div className="w-3/4 h-2 bg-white/30 rounded mb-2" />
          <div className="w-1/2 h-2 bg-white/20 rounded" />
        </div>
      </div>

      {/* Middle Book */}
      <div className="absolute bottom-0 left-2 w-48 h-64 bg-gradient-to-br from-violet-600 to-purple-700 rounded-lg shadow-2xl transform -rotate-3 translate-y-2"
           style={{ transform: 'rotateY(-10deg) rotateZ(-3deg) translateY(8px)' }}>
        <div className="absolute left-2 top-0 bottom-0 w-3 bg-gradient-to-r from-purple-800 to-purple-700 rounded-l" />
        <div className="p-4 pt-6">
          <div className="w-full h-4 bg-white/30 rounded mb-3" />
          <div className="w-2/3 h-2 bg-white/20 rounded mb-1" />
          <div className="w-3/4 h-2 bg-white/20 rounded" />
        </div>
      </div>

      {/* Top Book - Main */}
      <div className="absolute bottom-0 left-0 w-48 h-64 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg shadow-2xl transform"
           style={{ transform: 'rotateY(-5deg) rotateZ(2deg)' }}>
        <div className="absolute left-2 top-0 bottom-0 w-3 bg-gradient-to-r from-red-700 to-orange-600 rounded-l" />
        <div className="p-4 pt-5">
          {/* Book Icon */}
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-3">
            <i className="fas fa-door-open text-white text-xl"></i>
          </div>
          <div className="w-full h-3 bg-white/40 rounded mb-2" />
          <div className="w-full h-2 bg-white/30 rounded mb-1" />
          <div className="w-3/4 h-2 bg-white/30 rounded" />
        </div>
        {/* Shine Effect */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent rounded-r" />
      </div>
    </div>

    {/* Floating Elements */}
    <div className="absolute -top-4 -right-4 animate-float" style={{ animationDelay: '0.5s' }}>
      <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-xl flex items-center justify-center rotate-12">
        <i className="fas fa-book text-white text-2xl"></i>
      </div>
    </div>

    <div className="absolute -top-2 -left-6 animate-float" style={{ animationDelay: '1s' }}>
      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl shadow-lg flex items-center justify-center -rotate-6">
        <i className="fas fa-graduation-cap text-white text-lg"></i>
      </div>
    </div>

    {/* Glow Effect */}
    <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-emerald-500/20 rounded-3xl blur-xl -z-10" />
  </div>
);

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

      {/* Floating Book 3D Mockup - Desktop Only */}
      <div className="absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 hidden lg:block z-10">
        <Book3DMockup />
      </div>

      {/* Dots Indicator - Enhanced */}
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

      {/* Left Arrow - Enhanced */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/40 hover:scale-110 transition-all duration-300 z-20 opacity-0 hover:opacity-100 focus:opacity-100"
        aria-label="Previous image"
      >
        <i className="fas fa-chevron-left text-white"></i>
      </button>

      {/* Right Arrow - Enhanced */}
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
