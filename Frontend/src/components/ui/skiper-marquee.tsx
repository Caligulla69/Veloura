import React from "react";

const FashionMarquee = () => {
  const fashionCategories = [
    {
      id: 1,
      title: "BLAZERS & TOPS",
      image: "/people/Marquee1.png",
      link: "/category/blazers-tops",
      description: "Professional & Casual",
      accent: "from-amber-400 to-orange-500"
    },
    {
      id: 2,
      title: "JACKETS & COATS",
      image: "/people/coat.png", 
      link: "/category/jackets-coats",
      description: "Outerwear Collection",
      accent: "from-emerald-400 to-teal-500"
    },
    {
      id: 3,
      title: "DRESSES",
      image: "/people/dresses.png",
      link: "/category/dresses",
      description: "Elegant & Casual",
      accent: "from-pink-400 to-rose-500"
    },
    {
      id: 4,
      title: "T-SHIRTS",
      image: "/people/tshirt.png",
      link: "/category/t-shirts",
      description: "Everyday Essentials",
      accent: "from-blue-400 to-indigo-500"
    },
    {
      id: 5,
      title: "SUITS",
      image: "/people/suit.png",
      link: "/category/suits",
      description: "Formal Wear",
      accent: "from-purple-400 to-violet-500"
    }
  ];

  // Duplicate the array for seamless loop
  const duplicatedCategories = [...fashionCategories, ...fashionCategories];

  const CategoryCard = ({ category }) => (
    <div className="flex-shrink-0 w-56 sm:w-64 md:w-72 mx-3 sm:mx-4 md:mx-6 group cursor-pointer">
      {/* Outer glow effect */}
      <div className="relative">
        <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-white/5 via-yellow-400/10 to-white/5 rounded-2xl sm:rounded-3xl blur-lg sm:blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl overflow-hidden hover:border-yellow-400/30 transition-all duration-700 hover:scale-[1.02]">
          <div className="relative overflow-hidden">
            {/* Image container - responsive heights */}
            <div className="h-64 sm:h-80 md:h-96 relative overflow-hidden">
              {/* Main fashion image filling the entire space */}
              <img 
                src={category.image} 
                alt={category.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Premium overlay effects */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className={`absolute inset-0 bg-gradient-to-br ${category.accent} opacity-10 mix-blend-overlay`}></div>
              
              {/* Floating fashion elements - smaller on mobile */}
              <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400/80 rounded-full animate-pulse"></div>
              <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/80 rounded-full animate-pulse delay-1000"></div>
              
              {/* Premium hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>
            
            {/* Premium category info - responsive padding */}
            <div className="p-4 sm:p-6 md:p-8 text-center bg-gradient-to-b from-black/50 to-black/70 backdrop-blur-sm">
              <div className="space-y-2 sm:space-y-3">
                <div className="w-8 sm:w-12 h-0.5 bg-gradient-to-r from-white/30 via-yellow-400 to-white/30 mx-auto rounded-full"></div>
                <h3 className="text-sm sm:text-base md:text-lg font-light text-white tracking-wide">
                  {category.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/60 font-light tracking-wider sm:tracking-widest uppercase">
                  {category.description}
                </p>
              </div>
              
              {/* Premium CTA - responsive text */}
              <div className="mt-4 sm:mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="inline-flex items-center text-xs sm:text-sm font-light text-white tracking-wide">
                  <span className="hidden sm:inline">EXPLORE COLLECTION</span>
                  <span className="sm:hidden">EXPLORE</span>
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-black overflow-hidden relative">
      {/* Background Elements - responsive sizes */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 right-1/3 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-white rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-yellow-200 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Grain Texture Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-repeat bg-[length:128px_128px] sm:bg-[length:256px_256px] bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%220%200%20256%20256%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter%20id=%22noiseFilter%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.9%22%20numOctaves=%224%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23noiseFilter)%22%20opacity=%220.4%22/%3E%3C/svg%3E')]" />
      
      {/* Luxury Badge - responsive */}
      <div className="flex justify-center mb-8 sm:mb-12 md:mb-16 relative z-10 px-4">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full text-xs sm:text-sm flex items-center space-x-2 sm:space-x-3">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          <span className="font-light tracking-wider sm:tracking-widest uppercase">
            <span className="hidden sm:inline">Curated Fashion Categories</span>
            <span className="sm:hidden">Fashion Categories</span>
          </span>
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full animate-pulse delay-500"></div>
        </div>
      </div>

      {/* Premium header - responsive typography */}
      <div className="mb-8 sm:mb-12 md:mb-16 text-center relative z-10 px-4">
        <div className="inline-flex items-center space-x-2 sm:space-x-4 mb-4 sm:mb-6">
          <div className="w-4 sm:w-6 md:w-8 h-0.5 bg-gradient-to-r from-transparent to-white/30"></div>
          <span className="text-xs sm:text-sm font-light text-white/60 tracking-[0.2em] sm:tracking-[0.3em] uppercase">Collections</span>
          <div className="w-4 sm:w-6 md:w-8 h-0.5 bg-gradient-to-l from-transparent to-white/30"></div>
        </div>
        
        <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-white mb-4 sm:mb-6 tracking-tight leading-none">
          FASHION
          <span className="block text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extralight text-transparent bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text mt-1 sm:mt-2">
            CATEGORIES
          </span>
        </h2>
        
        <div className="w-16 sm:w-24 md:w-32 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto"></div>
      </div>

      {/* Enhanced marquee container */}
      <div className="relative z-10">
        {/* Premium gradient fades - responsive widths */}
        <div className="absolute left-0 top-0 w-8 sm:w-20 md:w-40 h-full bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-8 sm:w-20 md:w-40 h-full bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none"></div>

        {/* Scrolling container with responsive animations */}
        <div className="marquee-container">
          <div className="marquee-content">
            {duplicatedCategories.map((category, index) => (
              <CategoryCard key={`${category.id}-${index}`} category={category} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .marquee-container {
          overflow: hidden;
          width: 100%;
        }
        
        .marquee-content {
          display: flex;
          width: calc((224px + 1.5rem) * 10); /* Mobile width calculation */
          animation: marquee-scroll-mobile 20s linear infinite;
        }
        
        @media (min-width: 640px) {
          .marquee-content {
            width: calc((256px + 2rem) * 10); /* SM width calculation */
            animation: marquee-scroll-sm 25s linear infinite;
          }
        }
        
        @media (min-width: 768px) {
          .marquee-content {
            width: calc((288px + 3rem) * 10); /* MD+ width calculation */
            animation: marquee-scroll-md 30s linear infinite;
          }
        }
        
        @keyframes marquee-scroll-mobile {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-224px * 5 - 1.5rem * 5));
          }
        }
        
        @keyframes marquee-scroll-sm {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-256px * 5 - 2rem * 5));
          }
        }
        
        @keyframes marquee-scroll-md {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-288px * 5 - 3rem * 5));
          }
        }
        
        /* Premium animations - responsive */
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(0.5deg); }
        }
        
        @media (min-width: 640px) {
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(1deg); }
          }
        }
        
        .group:hover .animate-pulse {
          animation: float 3s ease-in-out infinite;
        }
        
        /* Pause animation on touch devices for better mobile experience */
        @media (hover: none) {
          .marquee-content {
            animation-play-state: running;
          }
        }
      `}</style>
    </section>
  );
};

export default FashionMarquee;