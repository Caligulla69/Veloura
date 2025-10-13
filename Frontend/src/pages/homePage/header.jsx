import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  ShoppingBag,
  User,
  Star,
  Globe,
  Menu,
  X,
  Play,
  Pause,
} from "lucide-react";
import PremiumCarousel from "../../components/ui/card-carousel";
import { Link } from "react-router-dom";
import API_URL from "../../utils/api";
// Enhanced Premium Carousel Component

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    // Trigger entrance animations
    setTimeout(() => setIsLoaded(true), 100);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleExploreBtn = async () => {
    try {
      const response = await fetch(`${API_URL}`,{method:"GET"});
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Enhanced Animated Background Elements */}

      {/* Navigation */}
      <nav
        className={`relative z-20 transition-all duration-700 ease-out ${
          scrollY > 50 ? "bg-black/20 backdrop-blur-md shadow-lg" : ""
        } ${
          isLoaded ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            {/* Enhanced Logo */}
            <div
              className={`flex items-center space-x-2 sm:space-x-3 transition-all duration-1000 delay-200 ${
                isLoaded
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-12 opacity-0"
              }`}
            >
              <div className="relative group">
                <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gradient-to-br from-white to-gray-200 rounded-lg flex items-center justify-center shadow-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <span className="font-bold text-black text-base sm:text-lg tracking-tight">
                    L
                  </span>
                </div>
                <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full animate-ping"></div>
                <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full"></div>
              </div>
              <div className="hidden sm:block">
                <span className="text-white font-light text-xl sm:text-2xl tracking-widest uppercase transform transition-all duration-700 hover:tracking-[0.5em]">
                  Brand
                </span>
                <div className="text-white/60 text-xs tracking-widest uppercase transform transition-all duration-500 hover:text-white/80">
                  Name
                </div>
              </div>
            </div>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8 xl:space-x-12">
              {["Collections", "Atelier", "Exclusives", "Heritage"].map(
                (item, index) => (
                  <a
                    key={item}
                    href="#"
                    className={`group relative text-white ${
                      index === 0
                        ? "font-normal"
                        : "font-light text-white/80 hover:text-white"
                    } tracking-wide transition-all duration-500 transform hover:scale-105 ${
                      isLoaded
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-6 opacity-0"
                    }`}
                    style={{ transitionDelay: `${400 + index * 100}ms` }}
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-white to-yellow-200 transition-all duration-500 group-hover:w-full"></span>
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-white/20 blur-sm transition-all duration-500 group-hover:w-full"></span>
                  </a>
                )
              )}
            </div>

            {/* Enhanced Right Actions */}
            <div
              className={`flex items-center space-x-2 sm:space-x-4 lg:space-x-6 transition-all duration-1000 delay-300 ${
                isLoaded
                  ? "translate-x-0 opacity-100"
                  : "translate-x-12 opacity-0"
              }`}
            >
              <div className="hidden sm:flex items-center space-x-2 sm:space-x-4">
                <button className="p-2 text-white/80 hover:text-white transition-all duration-300 hover:bg-white/10 rounded-full transform hover:scale-110 hover:rotate-12">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
                <Link
                  to="/login"
                  className="text-white/80 hover:text-white font-light tracking-wide transition-all duration-300 text-sm lg:text-base transform hover:scale-105 hover:-translate-y-0.5"
                >
                  Sign In
                </Link>
                <button className="bg-white text-black px-3 sm:px-4 lg:px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 tracking-wide text-sm lg:text-base transform hover:scale-105 hover:shadow-lg hover:shadow-white/50">
                  Member
                </button>
              </div>

              {/* Enhanced Mobile Menu Button */}
              <button
                className="lg:hidden p-2 text-white transform transition-all duration-300 hover:scale-110 hover:bg-white/10 rounded-full"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="relative w-5 h-5 sm:w-6 sm:h-6">
                  <Menu
                    className={`absolute inset-0 transition-all duration-300 ${
                      isMenuOpen
                        ? "opacity-0 rotate-180 scale-0"
                        : "opacity-100 rotate-0 scale-100"
                    }`}
                  />
                  <X
                    className={`absolute inset-0 transition-all duration-300 ${
                      isMenuOpen
                        ? "opacity-100 rotate-0 scale-100"
                        : "opacity-0 -rotate-180 scale-0"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-700 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-black/95 backdrop-blur-md border-t border-white/10">
            <div className="container mx-auto px-4 sm:px-6 py-6 space-y-4 sm:space-y-6">
              {["Collections", "Atelier", "Exclusives", "Heritage"].map(
                (item, index) => (
                  <a
                    key={item}
                    href="#"
                    className={`block text-white text-lg font-light tracking-wide transition-all duration-700 transform hover:text-yellow-200 hover:translate-x-2 ${
                      isMenuOpen
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-4 opacity-0"
                    }`}
                    style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                  >
                    {item}
                  </a>
                )
              )}

              <div
                className={`flex flex-col space-y-3 sm:hidden pt-4 border-t border-white/20 transition-all duration-500 ${
                  isMenuOpen
                    ? "transform translate-y-0 opacity-100"
                    : "transform -translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: "400ms" }}
              >
                <button className="p-2 text-white/80 hover:text-white transition-all duration-300 hover:bg-white/10 rounded-full self-start transform hover:scale-110">
                  <Search className="w-5 h-5" />
                </button>
                <button className="text-white/80 hover:text-white font-light tracking-wide transition-all duration-300 text-left transform hover:translate-x-2">
                  Sign In
                </button>
              </div>

              <div
                className={`pt-4 border-t border-white/20 transition-all duration-700 transform ${
                  isMenuOpen
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: "500ms" }}
              >
                <button className="bg-white text-black px-6 py-3 rounded-full font-medium w-full transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  Become Member
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-16">
        {/* Enhanced Luxury Badge */}
        <div
          className={`flex justify-center mb-8 sm:mb-12 transition-all duration-1000 delay-500 ${
            isLoaded
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-8 opacity-0 scale-95"
          }`}
        >
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-full text-xs sm:text-sm flex items-center space-x-2 sm:space-x-3 transform transition-all duration-500 hover:scale-105 hover:bg-white/20 hover:shadow-lg hover:shadow-yellow-200/20">
            <Star
              className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 animate-spin"
              style={{ animationDuration: "3s" }}
            />
            <span className="font-light tracking-widest uppercase">
              Spring Couture 2025
            </span>
            <Star
              className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 animate-spin"
              style={{ animationDuration: "3s", animationDirection: "reverse" }}
            />
          </div>
        </div>

        {/* Enhanced Hero Text */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="mb-6">
            <span
              className={`text-white/60 text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase font-light block mb-3 sm:mb-4 transition-all duration-1000 delay-700 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
            >
              Defining Elegance Since 1947
            </span>

            <h1
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-light text-white mb-6 sm:mb-8 leading-none tracking-tight px-2 transition-all duration-1200 delay-900 ${
                isLoaded
                  ? "translate-y-0 opacity-100 scale-100"
                  : "translate-y-12 opacity-0 scale-95"
              }`}
            >
              <span className="inline-block transform transition-all duration-1000 ">
                Timeless
              </span>
              <span className="block font-extralight text-amber-200">
                Sophistication
              </span>
            </h1>
          </div>

          <p
            className={`text-white/70 text-base sm:text-lg md:text-xl max-w-2xl lg:max-w-3xl mx-auto mb-8 sm:mb-12 font-light leading-relaxed px-4 transition-all duration-1000 delay-1100 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            Where artisanal craftsmanship meets contemporary vision. Each piece
            tells a story of uncompromising quality and sartorial perfection.
          </p>

          <div
            className={`flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6 px-4 transition-all duration-1000 delay-1300 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <button
              onClick={handleExploreBtn}
              className="group bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium hover:bg-gray-100 transition-all duration-500 flex items-center space-x-2 sm:space-x-3 shadow-2xl hover:shadow-yellow-200/50 text-sm sm:text-base w-full sm:w-auto justify-center transform hover:scale-105 hover:-translate-y-1"
            >
              <span className="tracking-wide">Explore Collection</span>
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-black rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-90 transition-all duration-500">
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
            </button>

            <button className="group border border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-light hover:bg-white/10 transition-all duration-500 backdrop-blur-sm hover:shadow-lg hover:shadow-white/20 text-sm sm:text-base w-full sm:w-auto transform hover:scale-105 hover:-translate-y-1 hover:border-white/50">
              <span className="tracking-wide group-hover:tracking-widest transition-all duration-300">
                Private Appointment
              </span>
            </button>
          </div>
        </div>

        {/* Enhanced Premium Image Carousel */}
        <div
          className={`transition-all duration-1000 delay-1500 ${
            isLoaded
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-12 opacity-0 scale-95"
          }`}
        >
          <PremiumCarousel />
        </div>
      </div>

      {/* Enhanced Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 lg:h-32 bg-gradient-to-t from-black/50 to-transparent"></div>

      {/* Subtle animated border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </section>
  );
};

export default Header;
