///RATINGS 8/10
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, MoreHorizontal } from 'lucide-react';
const UniqueCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [direction, setDirection] = useState('next');

  const slides = [
    {
      id: 'slide-01',
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=600&fit=crop",
      title: "Alpine Majesty",
      description: "Where earth touches heaven in crystalline silence",
      number: "01"
    },
    {
      id: 'slide-02',
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop",
      title: "Glass Cathedral",
      description: "Reflections of ambition in steel and light",
      number: "02"
    },
    {
      id: 'slide-03',
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop",
      title: "Verdant Sanctuary",
      description: "Ancient wisdom whispered through leaves",
      number: "03"
    },
    {
      id: 'slide-04',
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop",
      title: "Boundless Horizon",
      description: "Where sea meets sky in endless possibility",
      number: "04"
    }
  ];

  useEffect(() => {
    if (!autoplay) return;
    
    const timer = setInterval(() => {
      setDirection('next');
      setActiveSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [autoplay, slides.length]);

  const goNext = () => {
    setDirection('next');
    setActiveSlide(prev => (prev + 1) % slides.length);
  };

  const goPrev = () => {
    setDirection('prev');
    setActiveSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setDirection(index > activeSlide ? 'next' : 'prev');
    setActiveSlide(index);
  };

  return (
    <div className="relative max-w-7xl mx-auto p-8">
      {/* Subtle outer frame */}
      
      <div className="relative bg-black/25 backdrop-blur-md rounded-2xl border border-white/15 overflow-hidden">
        
        {/* Top navigation bar */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/10">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 border border-white/40 rotate-45"></div>
              <span className="text-white/70 text-sm font-light tracking-[0.2em] uppercase">
                Gallery
              </span>
            </div>
            
            <div className="h-4 w-px bg-white/20"></div>
            
            <span className="text-white/50 text-sm font-light">
              {slides[activeSlide].number} / 04
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setAutoplay(!autoplay)}
              className="flex items-center space-x-2 px-4 py-2 text-white/60 hover:text-white/90 transition-colors duration-300 rounded-lg hover:bg-white/5"
            >
              {autoplay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span className="text-xs font-light tracking-wider uppercase">
                {autoplay ? 'Pause' : 'Play'}
              </span>
            </button>
            
            <button className="p-2 text-white/40 hover:text-white/70 transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main content area with slide from side animation */}
        <div className="relative h-[500px] overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
                index === activeSlide
                  ? 'translate-x-0'
                  : index < activeSlide
                  ? '-translate-x-full'
                  : 'translate-x-full'
              }`}
            >
              <div className="relative w-full h-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>
                
                {/* Content positioned on left */}
                <div className="absolute inset-0 flex items-end">
                  <div className="p-12 max-w-2xl">
                    <div className="mb-4">
                      <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-4">
                        <span className="text-white/80 text-xs font-light tracking-widest uppercase">
                          Featured
                        </span>
                      </div>
                    </div>
                    
                    <h2 className="text-white text-4xl font-extralight mb-4 tracking-wide leading-tight">
                      {slide.title}
                    </h2>
                    
                    <p className="text-white/80 text-lg font-light leading-relaxed mb-8 max-w-lg">
                      {slide.description}
                    </p>
                    
                    <button className="group flex items-center space-x-3 text-white/90 hover:text-white transition-colors duration-300">
                      <span className="text-sm font-light tracking-wider uppercase">View Details</span>
                      <div className="w-12 h-px bg-white/40 group-hover:bg-white/80 transition-colors duration-300"></div>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom controls */}
        <div className="flex items-center justify-between px-8 py-6 border-t border-white/10">
          {/* Navigation arrows */}
          <div className="flex items-center space-x-2">
            <button
              onClick={goPrev}
              className="p-3 text-white/60 hover:text-white/90 hover:bg-white/5 transition-all duration-300 rounded-lg group"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            
            <button
              onClick={goNext}
              className="p-3 text-white/60 hover:text-white/90 hover:bg-white/5 transition-all duration-300 rounded-lg group"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
          
          {/* Thumbnail strip */}
          <div className="flex items-center space-x-4">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`relative overflow-hidden rounded transition-all duration-300 ${
                  index === activeSlide 
                    ? 'w-16 h-10 ring-2 ring-white/40' 
                    : 'w-12 h-8 opacity-60 hover:opacity-80'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
              </button>
            ))}
          </div>
          
          {/* Progress indicator */}
          <div className="flex items-center space-x-2">
            <div className="w-24 h-px bg-white/20 relative overflow-hidden">
              <div 
                className="absolute inset-y-0 left-0 bg-white/60 transition-all duration-700"
                style={{ width: `${((activeSlide + 1) / slides.length) * 100}%` }}
              ></div>
            </div>
            <span className="text-white/50 text-xs font-light tracking-wider">
              {Math.round(((activeSlide + 1) / slides.length) * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniqueCarousel;