import React, { useState, useEffect } from 'react';
import { Instagram, ArrowRight, Facebook, Youtube, MessageCircle, Crown, Sparkles } from 'lucide-react';

const PremiumFooter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <footer className="relative bg-black overflow-hidden">
      {/* Hero Section with Dark Luxury Theme */}
      <div 
        className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute top-1/4 right-1/3 w-48 sm:w-64 lg:w-96 h-48 sm:h-64 lg:h-96 bg-white rounded-full blur-3xl transition-all duration-[3000ms] ease-out"
            style={{
              transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px) scale(${1 + mousePosition.x * 0.001})`,
              animation: 'float 6s ease-in-out infinite'
            }}
          ></div>
          <div 
            className="absolute bottom-1/4 left-1/4 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-yellow-200 rounded-full blur-3xl transition-all duration-[4000ms] ease-out"
            style={{
              transform: `translate(${-mousePosition.x * 0.05}px, ${-mousePosition.y * 0.05}px)`,
              animation: 'float 8s ease-in-out infinite reverse'
            }}
          ></div>
        </div>

        {/* Enhanced Grain Texture Overlay */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none bg-repeat bg-[length:256px_256px] transition-opacity duration-1000 bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%220%200%20256%20256%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter%20id=%22noiseFilter%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.9%22%20numOctaves=%224%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23noiseFilter)%22%20opacity=%220.4%22/%3E%3C/svg%3E')]"
          style={{
            animation: 'shimmer 10s ease-in-out infinite alternate'
          }}
        />
        
        <div className={`relative z-10 max-w-6xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Animated Luxury Badge */}
          <div className={`flex justify-center mb-8 sm:mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-full text-xs sm:text-sm flex items-center space-x-2 sm:space-x-3 hover:bg-white/15 hover:border-white/30 transition-all duration-500 hover:scale-105 group">
              <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-light tracking-wider sm:tracking-widest uppercase">
                Connect With Elegance
              </span>
              <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 group-hover:-rotate-12 transition-transform duration-300" />
            </div>
          </div>

          {/* Main Content Container */}
          <div className={`relative transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Animated outer glow effect */}
            <div 
              className="absolute -inset-4 sm:-inset-6 lg:-inset-8 bg-gradient-to-r from-white/5 via-yellow-400/10 to-white/5 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl transition-all duration-1000"
              style={{
                animation: 'glow 4s ease-in-out infinite alternate'
              }}
            ></div>
            
            {/* Main card with hover effects */}
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl overflow-hidden p-6 sm:p-12 lg:p-16 hover:from-white/15 hover:to-white/8 hover:border-white/30 transition-all duration-700 group">
              
              {/* Interactive spotlight effect */}
              <div 
                className="absolute w-48 sm:w-64 lg:w-96 h-48 sm:h-64 lg:h-96 bg-gradient-radial from-white/20 to-transparent rounded-full blur-2xl sm:blur-3xl transition-all duration-1000 ease-out"
                style={{
                  left: `${mousePosition.x}%`,
                  top: `${mousePosition.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              ></div>
              
              <div className="relative z-10">
                <span className={`text-white/60 text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase font-light block mb-4 sm:mb-6 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  Fashion Excellence
                </span>
                <h1 className={`text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-tight tracking-tight mb-6 sm:mb-8 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <span className="inline-block hover:scale-105 transition-transform duration-300">EXPLORE OUR</span>
                  <span className="block font-extralight text-transparent bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text hover:from-yellow-200 hover:via-white hover:to-yellow-200 transition-all duration-1000 bg-[length:200%_100%] animate-gradient">
                    FASHION CATALOG
                  </span>
                </h1>
                <p className={`text-sm sm:text-base md:text-lg lg:text-xl text-white/80 mb-8 sm:mb-12 max-w-full sm:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed font-light px-2 sm:px-0 transition-all duration-1000 delay-1100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  Browse through our fashion catalog to find a wild range of stylish clothing options. 
                  From classic looks to the latest trends, there's something for everyone.
                </p>
                
                <button className={`group bg-white text-black px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full font-medium hover:bg-gray-100 transition-all duration-500 flex items-center justify-center space-x-3 sm:space-x-4 shadow-2xl mx-auto text-sm sm:text-base hover:scale-105 hover:shadow-white/20 hover:shadow-2xl active:scale-95 delay-1300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <span className="tracking-wide uppercase transition-all duration-300 group-hover:tracking-wider">See Our Instagram</span>
                  <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-black rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-white group-hover:translate-x-0.5 transition-transform duration-300" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links Section with Stagger Animation */}
      <div className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        {/* Subtle animated background elements */}
        <div className="absolute inset-0 opacity-3">
          <div 
            className="absolute top-1/2 left-1/4 w-24 sm:w-32 h-24 sm:h-32 bg-white rounded-full blur-2xl transition-all duration-2000"
            style={{ animation: 'float 5s ease-in-out infinite delay-500' }}
          ></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className={`relative transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Animated subtle glow */}
            <div 
              className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-xl sm:rounded-2xl blur-xl"
              style={{ animation: 'pulse-glow 3s ease-in-out infinite alternate' }}
            ></div>
            
            <div className="relative bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/10 p-6 sm:p-8 lg:p-12 hover:bg-white/8 hover:border-white/20 transition-all duration-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 xl:gap-16">
                
                {/* General Section */}
                <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                  <h3 className="text-lg sm:text-xl font-light text-white mb-6 sm:mb-8 tracking-[0.15em] sm:tracking-[0.2em] uppercase flex items-center space-x-2 group">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 group-hover:rotate-180 transition-transform duration-500" />
                    <span>General</span>
                  </h3>
                  <ul className="space-y-3 sm:space-y-4 lg:space-y-5">
                    {['About Us', 'Blog', 'How it Works', 'Contact Us'].map((item, index) => (
                      <li key={item} className={`transition-all duration-500 delay-${600 + index * 100}`}>
                        <a href="#" className="text-white/70 hover:text-white transition-all duration-300 hover:translate-x-2 block font-light tracking-wide text-sm sm:text-base group relative overflow-hidden">
                          <span className="relative z-10">{item}</span>
                          <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-yellow-400 to-white group-hover:w-full transition-all duration-300"></div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Products Section */}
                <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                  <h3 className="text-lg sm:text-xl font-light text-white mb-6 sm:mb-8 tracking-[0.15em] sm:tracking-[0.2em] uppercase flex items-center space-x-2 group">
                    <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 group-hover:scale-110 transition-transform duration-500" />
                    <span>Products</span>
                  </h3>
                  <ul className="space-y-3 sm:space-y-4 lg:space-y-5">
                    {['Men Fashion', 'Women Fashion', 'Shoes & Bag', 'Accessories'].map((item, index) => (
                      <li key={item} className={`transition-all duration-500 delay-${700 + index * 100}`}>
                        <a href="#" className="text-white/70 hover:text-white transition-all duration-300 hover:translate-x-2 block font-light tracking-wide text-sm sm:text-base group relative overflow-hidden">
                          <span className="relative z-10">{item}</span>
                          <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-yellow-400 to-white group-hover:w-full transition-all duration-300"></div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Customer Service Section */}
                <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                  <h3 className="text-lg sm:text-xl font-light text-white mb-6 sm:mb-8 tracking-[0.15em] sm:tracking-[0.2em] uppercase flex items-center space-x-2 group">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 group-hover:rotate-180 transition-transform duration-500" />
                    <span className="text-sm sm:text-base">Customer Service</span>
                  </h3>
                  <ul className="space-y-3 sm:space-y-4 lg:space-y-5">
                    {['FAQ', 'Help & Support', 'Billing Cycle', 'Privacy Policy'].map((item, index) => (
                      <li key={item} className={`transition-all duration-500 delay-${800 + index * 100}`}>
                        <a href="#" className="text-white/70 hover:text-white transition-all duration-300 hover:translate-x-2 block font-light tracking-wide text-sm sm:text-base group relative overflow-hidden">
                          <span className="relative z-10">{item}</span>
                          <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-yellow-400 to-white group-hover:w-full transition-all duration-300"></div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Social Media Section */}
                <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                  <h3 className="text-lg sm:text-xl font-light text-white mb-6 sm:mb-8 tracking-[0.15em] sm:tracking-[0.2em] uppercase flex items-center space-x-2 group">
                    <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 group-hover:scale-110 transition-transform duration-500" />
                    <span>Social Media</span>
                  </h3>
                  <ul className="space-y-3 sm:space-y-4 lg:space-y-5">
                    {[
                      { name: 'Instagram', icon: Instagram },
                      { name: 'TikTok', icon: MessageCircle },
                      { name: 'Facebook', icon: Facebook },
                      { name: 'Youtube', icon: Youtube }
                    ].map((social, index) => (
                      <li key={social.name} className={`transition-all duration-500 delay-${900 + index * 100}`}>
                        <a href="#" className="flex items-center gap-3 sm:gap-4 text-white/70 hover:text-white transition-all duration-300 group font-light tracking-wide text-sm sm:text-base hover:translate-x-1">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300 group-hover:rotate-12">
                            <social.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                          </div>
                          <span className="group-hover:tracking-wider transition-all duration-300">{social.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Brand Section with Enhanced Animation */}
          <div className={`mt-12 sm:mt-16 lg:mt-20 text-center transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative">
              {/* Animated brand glow effect */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-xl sm:blur-2xl"
                style={{ animation: 'brand-glow 6s ease-in-out infinite alternate' }}
              ></div>
              
              <h2 className="relative text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-extralight text-white/10 tracking-[0.2em] sm:tracking-[0.3em] select-none mb-6 sm:mb-8 hover:text-white/20 transition-all duration-1000 hover:scale-105 cursor-default">
                Veloura
              </h2>
              
              {/* Animated divider line */}
              <div className="w-20 sm:w-24 lg:w-32 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mb-6 sm:mb-8 hover:w-40 hover:via-yellow-400/50 transition-all duration-700"></div>
              
              {/* Copyright */}
              <p className="text-white/40 text-xs sm:text-sm tracking-wider sm:tracking-widest uppercase font-light px-4 hover:text-white/60 transition-colors duration-300">
                © 2025 Veloura Atelier • All Rights Reserved
              </p>
            </div>
          </div>
        </div>

        {/* Bottom fade with animation */}
        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-black to-transparent pointer-events-none opacity-0 animate-fade-in"></div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes glow {
          0% { opacity: 0.3; }
          100% { opacity: 0.8; }
        }
        
        @keyframes pulse-glow {
          0% { opacity: 0.1; }
          100% { opacity: 0.3; }
        }
        
        @keyframes brand-glow {
          0% { opacity: 0.05; }
          100% { opacity: 0.15; }
        }
        
        @keyframes shimmer {
          0% { opacity: 0.05; }
          100% { opacity: 0.15; }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 2s ease-in-out forwards;
        }
      `}</style>
    </footer>
  );
};

export default PremiumFooter;