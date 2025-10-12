import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Play, Pause } from 'lucide-react';

const UniqueCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const collections = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=600&fit=crop",
      title: "Mountain Serenity",
      subtitle: "Where silence speaks louder than words"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop",
      title: "Urban Reflections",
      subtitle: "Glass and steel painted by golden hour"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop",
      title: "Forest Whispers",
      subtitle: "Ancient paths through emerald shadows"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop",
      title: "Ocean Dreams",
      subtitle: "Endless blues meeting infinite sky"
    }
  ];

  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      handleNext();
    }, 4500);
    
    return () => clearInterval(interval);
  }, [isAutoPlay, currentIndex]);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => (prev + 1) % collections.length);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => (prev - 1 + collections.length) % collections.length);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Subtle outer glow */}
      <div className="absolute -inset-3 bg-gradient-to-r from-white/5 to-transparent rounded-2xl blur-xl opacity-60"></div>
      
      <div className="relative bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
        
        {/* Header with minimalist design */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div className="flex items-center space-x-3">
            <div className="w-1.5 h-1.5 bg-white rounded-full opacity-60"></div>
            <h3 className="text-white font-light tracking-wider text-sm uppercase opacity-80">
              Showcase
            </h3>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="p-2 text-white/60 hover:text-white/90 transition-colors duration-300 rounded-lg hover:bg-white/5"
            >
              {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrev}
                disabled={isTransitioning}
                className="p-2 text-white/60 hover:text-white/90 transition-all duration-300 rounded-lg hover:bg-white/5 disabled:opacity-30"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              
              <button
                onClick={handleNext}
                disabled={isTransitioning}
                className="p-2 text-white/60 hover:text-white/90 transition-all duration-300 rounded-lg hover:bg-white/5 disabled:opacity-30"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main image area with stacked layout */}
        <div className="relative h-96">
          {collections.map((item, index) => {
            const offset = index - currentIndex;
            const isActive = index === currentIndex;
            const isPrev = index === (currentIndex - 1 + collections.length) % collections.length;
            const isNext = index === (currentIndex + 1) % collections.length;
            
            let transform = 'translateX(100%) scale(0.8)';
            let opacity = 0;
            let zIndex = 1;
            
            if (isActive) {
              transform = 'translateX(0%) scale(1)';
              opacity = 1;
              zIndex = 3;
            } else if (isPrev) {
              transform = 'translateX(-100%) scale(0.8)';
              opacity = 0.3;
              zIndex = 2;
            } else if (isNext) {
              transform = 'translateX(100%) scale(0.8)';
              opacity = 0.3;
              zIndex = 2;
            }
            
            return (
              <div
                key={item.id}
                className="absolute inset-0 transition-all duration-600 ease-out"
                style={{
                  transform,
                  opacity,
                  zIndex
                }}
              >
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Simple gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  
                  {/* Content overlay */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="max-w-lg">
                        <h4 className="text-white font-light text-2xl mb-2 tracking-wide opacity-0 animate-[fadeInUp_0.8s_ease-out_0.3s_forwards]">
                          {item.title}
                        </h4>
                        <p className="text-white/80 text-base font-light leading-relaxed opacity-0 animate-[fadeInUp_0.8s_ease-out_0.5s_forwards]">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Minimalist footer */}
        <div className="flex items-center justify-between p-6 border-t border-white/5">
          {/* Slide counter */}
          <div className="flex items-center space-x-4">
            <span className="text-white/50 text-sm font-light">
              {String(currentIndex + 1).padStart(2, '0')} — {String(collections.length).padStart(2, '0')}
            </span>
          </div>
          
          {/* Simple dot indicators */}
          <div className="flex items-center space-x-3">
            {collections.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "bg-white" 
                    : "bg-white/30 hover:bg-white/50"
                } disabled:cursor-not-allowed`}
              />
            ))}
          </div>
          
          {/* Progress bar */}
          <div className="w-24 h-px bg-white/20 relative overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-white transition-all duration-600 ease-out"
              style={{ width: `${((currentIndex + 1) / collections.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniqueCarousel;