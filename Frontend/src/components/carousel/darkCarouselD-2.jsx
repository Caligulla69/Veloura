import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Sparkles, Eye } from 'lucide-react';

const PremiumCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const collections = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=600&fit=crop",
      title: "Ethereal Landscapes",
      subtitle: "Discover breathtaking vistas that transcend reality",
      category: "Nature",
      views: "2.4K"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop",
      title: "Urban Symphony",
      subtitle: "Where architecture meets artistry in perfect harmony",
      category: "Architecture",
      views: "3.1K"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop",
      title: "Mystical Forests",
      subtitle: "Journey through enchanted woodlands of wonder",
      category: "Adventure",
      views: "1.8K"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop",
      title: "Coastal Dreams",
      subtitle: "Where endless horizons meet infinite possibilities",
      category: "Seascape",
      views: "4.2K"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying || isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % collections.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered, collections.length]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % collections.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + collections.length) % collections.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative max-w-7xl mx-auto p-4">
 
      
      <div 
        className="relative bg-gradient-to-br from-black/40 via-black/20 to-black/40 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-white/20 shadow-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Premium Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
              <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-md"></div>
            </div>
            <div>
              <h2 className="text-white font-extralight tracking-[0.2em] text-lg lg:text-xl uppercase">
                Curated Collections
              </h2>
              <p className="text-white/50 text-xs font-light mt-1">Premium Selection</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Auto-play Toggle */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="group relative p-3 text-white/60 hover:text-white transition-all duration-300 rounded-xl hover:bg-white/10 backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              {isAutoPlaying ? 
                <Pause className="w-4 h-4 relative z-10" /> : 
                <Play className="w-4 h-4 relative z-10" />
              }
            </button>
            
            {/* Navigation Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={prevSlide}
                className="group relative p-3 text-white/60 hover:text-white transition-all duration-300 rounded-xl hover:bg-white/10 backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <ChevronLeft className="w-4 h-4 relative z-10 group-hover:scale-110 transition-transform" />
              </button>
              
              <button
                onClick={nextSlide}
                className="group relative p-3 text-white/60 hover:text-white transition-all duration-300 rounded-xl hover:bg-white/10 backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-l from-blue-500/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <ChevronRight className="w-4 h-4 relative z-10 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden rounded-xl lg:rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 z-10 pointer-events-none"></div>
          
          <div 
            className="flex transition-all duration-1000 ease-out"
            style={{ 
              transform: `translateX(-${currentSlide * 100}%)`,
              filter: isHovered ? 'brightness(1.1)' : 'brightness(1)'
            }}
          >
            {collections.map((collection, index) => (
              <div key={collection.id} className="w-full flex-shrink-0 relative group">
                <div className="relative aspect-[21/9] overflow-hidden">
                  {/* Image */}
                  <img
                    src={collection.src}
                    alt={collection.title}
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                  />
                  
                  {/* Sophisticated Overlay Gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-6 left-6">
                    <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                      <span className="text-white/90 text-sm font-light tracking-wide">{collection.category}</span>
                    </div>
                  </div>
                  
                  {/* Views Counter */}
                  <div className="absolute top-6 right-6 flex items-center space-x-2 bg-black/30 backdrop-blur-md rounded-full px-3 py-2 border border-white/20">
                    <Eye className="w-4 h-4 text-white/70" />
                    <span className="text-white/70 text-sm font-light">{collection.views}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                    <div className="max-w-2xl">
                      <h3 className="text-white font-light text-2xl lg:text-4xl mb-3 tracking-wide leading-tight">
                        {collection.title}
                      </h3>
                      <p className="text-white/80 text-base lg:text-lg font-extralight leading-relaxed mb-6">
                        {collection.subtitle}
                      </p>
                      
                      {/* CTA Button */}
                      <button className="group relative overflow-hidden px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                        <span className="relative text-white font-light tracking-wide">Explore Collection</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Progress Bar */}
        <div className="mt-6 mb-4">
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 rounded-full transition-all duration-1000 ease-out shadow-lg shadow-amber-400/30"
              style={{ width: `${((currentSlide + 1) / collections.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex items-center justify-center space-x-4">
          {collections.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`group relative transition-all duration-500 ${
                index === currentSlide ? "scale-110" : "hover:scale-105"
              }`}
            >
              <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? "bg-white shadow-xl shadow-white/50" 
                  : "bg-white/30 hover:bg-white/60"
              }`}></div>
              {index === currentSlide && (
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-white/30 animate-ping"></div>
              )}
            </button>
          ))}
        </div>
        
        {/* Slide Counter */}
        <div className="absolute bottom-4 left-8 text-white/50 text-sm font-extralight tracking-widest">
          {String(currentSlide + 1).padStart(2, '0')} / {String(collections.length).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};

export default PremiumCarousel;