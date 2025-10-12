import React from "react";
import { ChevronRight, Sparkles, Crown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative py-16 px-6">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/6 w-64 h-64 bg-yellow-200 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Grain Texture Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-repeat bg-[length:256px_256px] bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%220%200%20256%20256%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter%20id=%22noiseFilter%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.9%22%20numOctaves=%224%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23noiseFilter)%22%20opacity=%220.4%22/%3E%3C/svg%3E')]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Luxury Badge */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-3 rounded-full text-sm flex items-center space-x-3">
            <Crown className="w-4 h-4 text-yellow-400" />
            <span className="font-light tracking-widest uppercase">
              Exclusive Atelier Collection
            </span>
            <Crown className="w-4 h-4 text-yellow-400" />
          </div>
        </div>

        {/* Main Content Container */}
        <div className="relative">
          {/* Outer glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-white/5 via-yellow-400/10 to-white/5 rounded-3xl blur-2xl"></div>
          
          {/* Main card */}
          <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
            
            {/* Inner spotlight effect */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-radial from-white/20 to-transparent rounded-full blur-3xl"></div>
            
            <div className="relative z-10 p-8 lg:p-12">
              {/* Header Section */}
              <div className="grid lg:grid-cols-5 gap-8 items-start mb-8">
                {/* Left side - Text content (3 columns) */}
                <div className="lg:col-span-3 space-y-8">
                  <div>
                    <span className="text-white/60 text-sm tracking-[0.3em] uppercase font-light block mb-6">
                      Couture Excellence
                    </span>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-white leading-tight tracking-tight">
                      ELEVATE
                      <br />
                      <span className="font-extralight text-transparent bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text">
                        YOUR STYLE
                      </span>
                      <br />
                      <span className="text-2xl md:text-3xl lg:text-4xl mt-2 text-white/80 font-light">
                        WITH OUR NEW COLLECTION
                      </span>
                    </h1>
                  </div>

                  {/* Call to action buttons */}
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                    <button className="group bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl">
                      <span className="tracking-wide uppercase text-sm">See Our New Collection</span>
                      <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ChevronRight className="w-4 h-4 text-white" />
                      </div>
                    </button>

                    <button className="group border border-white/30 text-white px-8 py-4 rounded-full font-light hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                      <span className="tracking-wide uppercase text-sm flex items-center space-x-2">
                        <Sparkles className="w-4 h-4" />
                        <span>Discover Heritage</span>
                      </span>
                    </button>
                  </div>
                </div>

                {/* Right side - Description and stats (2 columns) */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <p className="text-white/80 text-base leading-relaxed font-light">
                      Get ready to look amazing with our latest fashion collections 
                      where great comfort meets unparalleled elegance. Each piece is 
                      crafted with meticulous attention to detail, ensuring you feel 
                      confident and sophisticated for every occasion.
                    </p>
                  </div>

                  {/* Stats or features */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-xl font-light text-white mb-1">78+</div>
                      <div className="text-white/60 text-xs tracking-wide uppercase">Years Heritage</div>
                    </div>
                    <div className="text-center border-l border-r border-white/20">
                      <div className="text-xl font-light text-white mb-1">100%</div>
                      <div className="text-white/60 text-xs tracking-wide uppercase">Handcrafted</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-light text-white mb-1">24/7</div>
                      <div className="text-white/60 text-xs tracking-wide uppercase">Concierge</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Section with Enhanced Styling */}
              <div className="relative -mx-8 lg:-mx-12 -mb-8 lg:-mb-12 mt-8">
                {/* Image container */}
                <div className="relative bg-black/30 backdrop-blur-sm rounded-t-3xl overflow-hidden">
                  {/* Fashion model image from Unsplash */}
                  <div className="aspect-[16/9] lg:aspect-[20/9] relative">
                    <img 
                    src="/people/model4.png"
                      alt="Luxury Fashion Model"
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    {/* Vignette effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
                    
                    {/* Image caption/overlay */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-black/60 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                        <p className="text-white text-sm font-light tracking-wide">
                          Spring Couture 2025 • Handcrafted Excellence
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;