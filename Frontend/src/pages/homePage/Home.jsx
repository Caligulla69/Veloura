import React from "react";
import Header from "./header";
import { ChevronRight, Sparkles, Crown } from "lucide-react";
import Footer from './footer'
import FashionMarquee from "../../components/ui/skiper-marquee";
import HeroSection from "./hero";
import AboutSection from "./about";
import PremiumFooter from "./footer";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />

      <AboutSection />
      <HeroSection />


      {/* Additional sections */}
      <section>
        <FashionMarquee />
      </section>
      
      <PremiumFooter />
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </div>
  );
};

export default HomePage;