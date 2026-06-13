import { useState, useEffect } from 'react';

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {HERO_IMAGES.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${image.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-gray-900/60 to-gray-900/80 dark:from-gray-950/80 dark:via-gray-900/70 dark:to-gray-950/90"></div>
        </div>
      ))}

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {HERO_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'w-8 bg-white'
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={() => setCurrentIndex((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/40 transition-colors z-20"
        aria-label="Previous image"
      >
        <i className="fas fa-chevron-left text-white"></i>
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/40 transition-colors z-20"
        aria-label="Next image"
      >
        <i className="fas fa-chevron-right text-white"></i>
      </button>
    </div>
  );
}
