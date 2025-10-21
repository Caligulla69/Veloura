import React, { useState, useEffect } from 'react';
import {  ShoppingCart, User, Heart, X, ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Get cart and wishlist counts from Zustand stores
  const cartCount = useCartStore((state) => state.cart.length);
  const wishlistCount = useWishlistStore((state) => state.wishlist.length);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setActiveCategory(null);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const categories = {
    Women: ['New Arrivals', 'Dresses', 'Bags', 'Shoes', 'Jewelry', 'Sale'],
    Men: ['New Arrivals', 'Suits', 'Accessories', 'Footwear', 'Watches', 'Sale'],
    Collections: ['Spring 2025', 'Heritage', 'Limited Edition', 'Collaborations'],
    About: ['Our Story', 'Craftsmanship', 'Sustainability', 'Stores']
  };

  const categoryImages = {
    Women: '/people/model3.png',
    Men: '/people/model4.png',
    Collections: '/people/model1.png'
  };

  return (
    <>
      {/* Main Navbar - Original Design */}
      <nav className="z-50 bg-transparent mb-10 border-b border-white/10">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
            {/* Left Menu */}
            <div className="flex items-center space-x-4 sm:space-x-12">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2 group p-2"
                aria-label="Menu"
              >
                <div className="flex flex-col space-y-1.5">
                  <span className={`w-5 sm:w-6 h-px bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                  <span className={`w-5 sm:w-6 h-px bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`w-5 sm:w-6 h-px bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
                </div>
              </button>
            </div>

            {/* Center Logo */}
            <a href="/" className="absolute left-1/2 transform -translate-x-1/2">
              <span className="text-xl sm:text-2xl md:text-3xl font-light tracking-[0.2em] sm:tracking-[0.3em] text-white">
                Veloura
              </span>
            </a>

            {/* Right Actions */}
            <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-6">
              
              
              <Link to="/dashboard" className="hidden md:block text-white hover:text-white/60 transition-colors p-2" aria-label="Account">
                <User className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} />
              </Link>

              <Link to="/wishlist" className="hidden sm:block relative text-white hover:text-white/60 transition-colors p-2" aria-label="Wishlist">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link to="/cart" className="relative text-white hover:text-white/60 transition-colors p-2" aria-label="Cart">
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-600 text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mega Menu Overlay */}
      <div className={`fixed inset-0 transition-all duration-700 ease-in-out ${
        isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`} style={{ zIndex: 40, top: isMobile ? '64px' : '96px' }}>
        
        {isMobile ? (
          /* Mobile View - Single Column Accordion */
          <div className="absolute inset-0 bg-zinc-900">
            <div className="h-full overflow-y-auto">
              <div className="px-4 py-6 sm:px-6 sm:py-8">
                
                

                <h2 className="text-3xl sm:text-4xl font-light tracking-wider text-white mb-8 sm:mb-12">
                  Menu
                </h2>

                {/* Mobile Category List */}
                <div className="space-y-1">
                  {Object.keys(categories).map((category, idx) => (
                    <div key={category} className={`transition-all duration-500 ${
                      isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`} style={{ transitionDelay: `${idx * 100}ms` }}>
                      <button
                        onClick={() => setActiveCategory(activeCategory === category ? null : category)}
                        className="w-full flex items-center justify-between py-4 border-b border-white/10 text-white"
                      >
                        <span className="text-lg sm:text-xl font-light tracking-wider">{category}</span>
                        <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${
                          activeCategory === category ? 'rotate-90' : ''
                        }`} strokeWidth={1.5} />
                      </button>
                      
                      {/* Submenu */}
                      <div className={`overflow-hidden transition-all duration-500 ${
                        activeCategory === category ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        <div className="py-4 pl-4 space-y-3">
                          {categories[category].map((item) => (
                            <a
                              key={item}
                              href="#"
                              className="block text-white/70 hover:text-white text-base transition-colors"
                            >
                              {item}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mobile Image Grid */}
                <div className={`mt-12 grid grid-cols-2 gap-4 transition-all duration-700 delay-500 ${
                  isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                  {Object.entries(categoryImages).map(([name, src]) => (
                    <div key={name} className="relative overflow-hidden">
                      <img
                        src={src}
                        alt={name}
                        className="w-full h-48 rounded-xl object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-end p-4">
                        <span className="text-white text-sm font-light tracking-wider">{name}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mobile Social Links */}
                <div className={`mt-12 transition-all duration-700 delay-600 ${
                  isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                  <p className="text-xs text-white/30 tracking-widest uppercase mb-4">
                    Connect With Us
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Instagram</a>
                    <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Facebook</a>
                    <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Twitter</a>
                  </div>
                </div>

                {/* Mobile CTA */}
                <div className={`mt-8 bg-white p-6 transition-all duration-700 delay-700 ${
                  isMenuOpen ? 'opacity-100 rounded-xl translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                  <h4 className="text-xl font-light tracking-wider uppercase mb-2 text-black">
                    Spring 2025
                  </h4>
                  <p className="text-black/60 text-sm mb-4">
                    Discover contemporary luxury
                  </p>
                  <button className="w-full bg-black text-white py-3 text-sm tracking-wider uppercase hover:bg-black/90 transition-colors">
                    Explore Now
                  </button>
                </div>

              </div>
            </div>
          </div>
        ) : (
          /* Desktop View - Split Screen */
          <>
            <div className="absolute inset-0 flex">
              <div className="w-1/2 bg-zinc-900"></div>
              <div className="w-1/2 bg-white"></div>
            </div>

            <div className="relative h-full overflow-y-auto">
              <div className="max-w-[1800px] mx-auto px-8 lg:px-16 py-16">
                
                {/* Close Button */}
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="absolute top-8 right-8 text-white hover:rotate-90 transition-transform duration-300"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" strokeWidth={1.5} />
                </button>

                <div className="grid grid-cols-2 gap-0 min-h-[600px]">
                  
                  {/* Left Side - Dark Section */}
                  <div className="p-12">
                    <div className="max-w-xl">
                      <h2 className="text-4xl lg:text-6xl font-light tracking-wider text-white mb-12">
                        Explore
                      </h2>
                      
                      <div className="grid grid-cols-2 gap-x-12 gap-y-10">
                        {/* Women */}
                        <div className={`transition-all duration-700 delay-100 ${
                          isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                        }`}>
                          <h3 className="text-sm font-light tracking-widest uppercase mb-4 text-white/50">
                            Women
                          </h3>
                          <div className="space-y-2">
                            {categories.Women.map((item) => (
                              <a
                                key={item}
                                href="#"
                                className="block text-white hover:text-white/70 text-base transition-colors group"
                              >
                                <span className="inline-flex items-center">
                                  {item}
                                  <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" strokeWidth={1.5} />
                                </span>
                              </a>
                            ))}
                          </div>
                        </div>

                        {/* Men */}
                        <div className={`transition-all duration-700 delay-200 ${
                          isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                        }`}>
                          <h3 className="text-sm font-light tracking-widest uppercase mb-4 text-white/50">
                            Men
                          </h3>
                          <div className="space-y-2">
                            {categories.Men.map((item) => (
                              <a
                                key={item}
                                href="#"
                                className="block text-white hover:text-white/70 text-base transition-colors group"
                              >
                                <span className="inline-flex items-center">
                                  {item}
                                  <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" strokeWidth={1.5} />
                                </span>
                              </a>
                            ))}
                          </div>
                        </div>

                        {/* Collections */}
                        <div className={`transition-all duration-700 delay-300 ${
                          isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                        }`}>
                          <h3 className="text-sm font-light tracking-widest uppercase mb-4 text-white/50">
                            Collections
                          </h3>
                          <div className="space-y-2">
                            {categories.Collections.map((item) => (
                              <a
                                key={item}
                                href="#"
                                className="block text-white hover:text-white/70 text-base transition-colors group"
                              >
                                <span className="inline-flex items-center">
                                  {item}
                                  <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" strokeWidth={1.5} />
                                </span>
                              </a>
                            ))}
                          </div>
                        </div>

                        {/* About */}
                        <div className={`transition-all duration-700 delay-[400ms] ${
                          isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                        }`}>
                          <h3 className="text-sm font-light tracking-widest uppercase mb-4 text-white/50">
                            About
                          </h3>
                          <div className="space-y-2">
                            {categories.About.map((item) => (
                              <a
                                key={item}
                                href="#"
                                className="block text-white hover:text-white/70 text-base transition-colors group"
                              >
                                <span className="inline-flex items-center">
                                  {item}
                                  <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" strokeWidth={1.5} />
                                </span>
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Social Links */}
                      <div className={`mt-16 transition-all duration-700 delay-500 ${
                        isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}>
                        <p className="text-xs text-white/30 tracking-widest uppercase mb-4">
                          Connect With Us
                        </p>
                        <div className="flex space-x-6">
                          <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Instagram</a>
                          <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Facebook</a>
                          <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Twitter</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Light Section with Images */}
                  <div className="p-12 flex items-center">
                    <div className="w-full">
                      <div className={`grid grid-cols-2 gap-6 transition-all duration-700 delay-300 ${
                        isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                      }`}>
                        <div className="space-y-6">
                          <div className="relative overflow-hidden group">
                            <img
                              src="/people/model3.png"
                              alt="Women Collection"
                              className="w-full h-80 rounded-xl object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
                            <div className="absolute bottom-6 left-6">
                              <span className="text-white text-xl font-light tracking-wider">Women</span>
                            </div>
                          </div>
                          
                          <div className="relative overflow-hidden group">
                            <img
                              src="/people/model1.png"
                              alt="Collections"
                              className="w-full h-64 rounded-xl object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
                            <div className="absolute bottom-6 left-6">
                              <span className="text-white text-xl font-light tracking-wider">Collections</span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-12">
                          <div className="relative overflow-hidden group">
                            <img
                              src="/people/model4.png"
                              alt="Men Collection"
                              className="w-full h-96 rounded-xl object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
                            <div className="absolute bottom-6 left-6">
                              <span className="text-white text-xl font-light tracking-wider">Men</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Featured CTA */}
                      <div className={`mt-12 transition-all duration-700 delay-500 ${
                        isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}>
                        <div className="bg-zinc-900 rounded-xl text-white p-8">
                          <h4 className="text-2xl font-light tracking-wider uppercase mb-2">
                            Spring 2025
                          </h4>
                          <p className="text-white/60 text-sm mb-6">
                            Discover contemporary luxury
                          </p>
                          <button className="group inline-flex items-center text-sm tracking-wider uppercase hover:translate-x-2 transition-transform">
                            Explore Now
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}