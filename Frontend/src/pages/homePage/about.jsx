import React, { useState, useEffect, useRef } from "react";
import { Crown, Diamond, Star, Zap, Eye, Sparkles } from "lucide-react";

const AboutSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Intersection Observer for entrance animations
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observerRef.current.observe(sectionRef.current);
    }

    // Auto-cycle through timeline items
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 4);
    }, 3000);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const milestones = [
    {
      year: "1947",
      title: "The Genesis",
      description: "Founded in Paris by Elena Montclair",
    },
    {
      year: "1962",
      title: "Royal Recognition",
      description: "First Royal Warrant granted",
    },
    {
      year: "1985",
      title: "Global Expansion",
      description: "Opening of flagship stores worldwide",
    },
    {
      year: "2025",
      title: "Digital Renaissance",
      description: "Embracing the future of luxury",
    },
  ];

  const principles = [
    {
      icon: Diamond,
      title: "Artisanal Mastery",
      subtitle: "Every thread tells a story",
      description:
        "Our master craftspeople dedicate over 300 hours to each couture piece, ensuring every detail reflects our uncompromising standards of excellence.",
    },
    {
      icon: Star,
      title: "Timeless Innovation",
      subtitle: "Where tradition meets tomorrow",
      description:
        "We seamlessly blend centuries-old techniques with cutting-edge technology, creating pieces that honor the past while defining the future.",
    },
    {
      icon: Eye,
      title: "Visionary Design",
      subtitle: "Beauty beyond imagination",
      description:
        "Our design philosophy transcends fashion trends, creating wearable art that speaks to the soul and celebrates individual expression.",
    },
  ];

  return (
    <>
      <div
        ref={sectionRef}
        className="relative min-h-screen bg-black overflow-hidden"
      >
        {/* Dynamic Background */}
        <div className="absolute inset-0">
          {/* Moving gradient based on mouse position */}
          <div
            className="absolute inset-0 opacity-30 transition-all duration-1000 ease-out"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,215,0,0.15) 0%, rgba(255,255,255,0.05) 25%, transparent 50%)`,
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
          />

          {/* Enhanced floating orbs with staggered animations */}
          <div
            className="absolute top-1/4 left-1/6 w-2 h-2 bg-yellow-400 rounded-full animate-ping"
            style={{ animationDelay: "0s", animationDuration: "2s" }}
          ></div>
          <div
            className="absolute top-3/4 right-1/4 w-1 h-1 bg-white rounded-full "
            style={{ animationDelay: "1s", animationDuration: "3s" }}
          ></div>
          <div
            className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-yellow-200 rounded-full animate-ping"
            style={{ animationDelay: "2s", animationDuration: "2.5s" }}
          ></div>
          <div
            className="absolute top-1/2 right-1/6 w-1 h-1 bg-white rounded-full "
            style={{ animationDelay: "0.5s", animationDuration: "4s" }}
          ></div>
          <div
            className="absolute top-1/6 left-3/4 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-ping"
            style={{ animationDelay: "1.5s", animationDuration: "3.5s" }}
          ></div>
          <div
            className="absolute bottom-1/6 right-1/3 w-1 h-1 bg-white/70 rounded-full "
            style={{ animationDelay: "2.5s", animationDuration: "2.8s" }}
          ></div>

          {/* Animated mesh gradient overlay */}
          <div
            className="absolute inset-0 opacity-20 bg-gradient-to-br from-transparent via-yellow-900/10 to-transparent bg-[length:100px_100px] bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1)_1px,transparent_1px)]"
            style={{
              transform: `translateY(${scrollY * -0.1}px) rotate(${
                scrollY * 0.02
              }deg)`,
              backgroundPosition: `${mousePosition.x * 0.5}px ${
                mousePosition.y * 0.5
              }px`,
            }}
          ></div>
        </div>

        <div className="relative z-10 max-w-8xl mx-auto px-6 py-5">
          {/* Cinematic Header */}
          <div
            className={`text-center mb-32 relative transition-all duration-1500 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-16 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-5">
              <div
                className="text-9xl font-thin text-white tracking-[2rem] select-none "
                style={{ animationDuration: "4s" }}
              >
                ATELIER
              </div>
            </div>

            <div className="relative z-10 space-y-8">
              <div
                className={`inline-flex items-center space-x-4 bg-gradient-to-r from-white/5 to-yellow-400/10 backdrop-blur-2xl border border-white/10 rounded-full px-8 py-4 transition-all duration-1000 ease-out ${
                  isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
                }`}
                style={{ transitionDelay: "400ms" }}
              >
                <div
                  className="w-2 h-2 bg-yellow-400 rounded-full "
                  style={{ animationDuration: "1.5s" }}
                ></div>
                <span className="text-white/80 text-sm tracking-[0.5em] uppercase font-light">
                  Chapter One
                </span>
                <div
                  className="w-2 h-2 bg-yellow-400 rounded-full "
                  style={{ animationDelay: "0.5s", animationDuration: "1.5s" }}
                ></div>
              </div>

              <h1 className="text-5xl md:text-8xl lg:text-9xl font-thin text-white leading-none tracking-tight">
                <span
                  className={`block opacity-40 transition-all duration-1000 ease-out ${
                    isVisible
                      ? "translate-y-0 opacity-40"
                      : "translate-y-8 opacity-0"
                  }`}
                  style={{ transitionDelay: "600ms" }}
                >
                  THE
                </span>
                <span
                  className={`block bg-gradient-to-r from-yellow-200 via-white to-amber-600 bg-clip-text text-transparent font-extralight transition-all duration-1200 ease-out transform ${
                    isVisible ? "scale-100 opacity-100" : "scale-95 opacity-70"
                  }`}
                  style={{
                    transitionDelay: "800ms",
                    backgroundSize: "200% 100%",
                    animation: isVisible
                      ? "shimmer 3s ease-in-out infinite"
                      : "none",
                  }}
                >
                  LEGACY
                </span>

                <span
                  className={`block opacity-60 text-4xl md:text-6xl lg:text-7xl mt-4 transition-all duration-1000 ease-out ${
                    isVisible
                      ? "translate-y-0 opacity-60"
                      : "translate-y-8 opacity-0"
                  }`}
                  style={{ transitionDelay: "1000ms" }}
                >
                  CONTINUES
                </span>
              </h1>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-12 gap-16 mb-32">
            {/* Left Column - Narrative */}
            <div
              className={`lg:col-span-7 space-y-12 transition-all duration-1500 ease-out ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-16 opacity-0"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              {/* Hero Image with Parallax Effect */}
              <div className="relative group">
                <div className="absolute -inset-8 bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-400/20 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>

                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl border border-white/10 group-hover:border-white/20 transition-all duration-700">
                  <div className="aspect-[16/10] relative">
                    <img
                      src="/people/model2.png"
                      alt="Luxury Couture Craftsmanship"
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 filter group-hover:brightness-110"
                    />

                    {/* Dynamic overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-700 group-hover:from-black/60"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>

                    {/* Floating elements with enhanced animations */}
                    <div
                      className={`absolute top-8 right-2 transition-all duration-1000 ease-out ${
                        isVisible
                          ? "translate-y-0 opacity-100"
                          : "-translate-y-8 opacity-0"
                      }`}
                      style={{ transitionDelay: "1200ms" }}
                    >
                      <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-black/70 hover:border-yellow-400/30 transition-all duration-500 hover:scale-105">
                        <div className="flex items-center space-x-3">
                          <Crown
                            className="w-5 h-5 text-yellow-400 "
                            style={{ animationDuration: "2s" }}
                          />
                          <span className="text-white text-sm font-light tracking-wider">
                            Since 1947
                          </span>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`hidden sm:block absolute bottom-8 left-8 right-8 transition-all duration-1000 ease-out ${
                        isVisible
                          ? "translate-y-0 opacity-100"
                          : "translate-y-8 opacity-0"
                      }`}
                      style={{ transitionDelay: "1400ms" }}
                    >
                      <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-black/70 hover:border-yellow-400/20 transition-all duration-500 group-hover:scale-105">
                        <p className="text-white/90 text-lg font-light leading-relaxed mb-2">
                          "We don't just create fashion. We architect dreams,
                          sculpt confidence, and weave stories that transcend
                          time."
                        </p>
                        <div className="text-yellow-400/80 text-sm tracking-wide">
                          — House Philosophy
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline with enhanced animations */}
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-yellow-400/50 to-transparent">
                  <div
                    className="absolute inset-0 w-px bg-gradient-to-b from-yellow-400/0 via-yellow-400/80 to-yellow-400/0 "
                    style={{ animationDuration: "3s" }}
                  ></div>
                </div>

                <div className="space-y-12">
                  {milestones.map((milestone, index) => (
                    <div
                      key={index}
                      className={`relative pl-20 group cursor-pointer transition-all duration-1000 ease-out ${
                        isVisible
                          ? "translate-x-0 opacity-100"
                          : "translate-x-8 opacity-0"
                      }`}
                      style={{ transitionDelay: `${800 + index * 200}ms` }}
                      onMouseEnter={() => setActiveIndex(index)}
                    >
                      <div
                        className={`absolute left-6 w-4 h-4 rounded-full border-2 transition-all duration-700 ease-out ${
                          activeIndex === index
                            ? "bg-yellow-400 border-yellow-400 shadow-lg shadow-yellow-400/50 scale-125"
                            : "bg-black border-white/30 hover:border-white/50 hover:scale-110"
                        }`}
                      >
                        <div
                          className={`absolute inset-0 rounded-full transition-all duration-700 ${
                            activeIndex === index
                              ? "animate-ping bg-yellow-400/30"
                              : ""
                          }`}
                          style={{ animationDuration: "2s" }}
                        ></div>

                        {/* Inner glow effect */}
                        <div
                          className={`absolute inset-1 rounded-full transition-all duration-500 ${
                            activeIndex === index ? "bg-yellow-400/60 " : ""
                          }`}
                        ></div>
                      </div>

                      <div
                        className={`bg-gradient-to-r backdrop-blur-xl rounded-2xl border p-8 transition-all duration-700 ease-out hover:scale-105 ${
                          activeIndex === index
                            ? "from-white/10 to-yellow-400/10 border-yellow-400/30 shadow-2xl shadow-yellow-400/10 scale-105"
                            : "from-white/5 to-transparent border-white/10 hover:from-white/8 hover:to-white/5 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center space-x-4 mb-4">
                          <span
                            className={`text-3xl font-thin transition-all duration-500 ${
                              activeIndex === index
                                ? "text-yellow-400 scale-110"
                                : "text-white/60 group-hover:text-white/80"
                            }`}
                          >
                            {milestone.year}
                          </span>
                          <div
                            className={`h-px bg-gradient-to-r flex-1 transition-all duration-500 ${
                              activeIndex === index
                                ? "from-yellow-400/60 to-transparent"
                                : "from-white/30 to-transparent group-hover:from-white/50"
                            }`}
                          ></div>
                        </div>
                        <h3
                          className={`text-xl font-light mb-2 transition-colors duration-500 ${
                            activeIndex === index
                              ? "text-white"
                              : "text-white/90 group-hover:text-white"
                          }`}
                        >
                          {milestone.title}
                        </h3>
                        <p
                          className={`leading-relaxed transition-colors duration-500 ${
                            activeIndex === index
                              ? "text-white/80"
                              : "text-white/70 group-hover:text-white/80"
                          }`}
                        >
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Philosophy Cards with staggered animations */}
            <div
              className={`lg:col-span-5 space-y-8 transition-all duration-1500 ease-out ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-16 opacity-0"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              {principles.map((principle, index) => {
                const IconComponent = principle.icon;
                return (
                  <div
                    key={index}
                    className={`relative group transition-all duration-1000 ease-out ${
                      isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-16 opacity-0"
                    }`}
                    style={{ transitionDelay: `${1000 + index * 300}ms` }}
                  >
                    <div className="absolute -inset-4 bg-gradient-to-r from-white/10 via-yellow-400/20 to-white/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>

                    <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl border border-white/20 p-10 group-hover:border-yellow-400/30 group-hover:from-white/15 group-hover:to-white/8 transition-all duration-700 overflow-hidden hover:scale-105">
                      {/* Background pattern with animation */}
                      <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-yellow-400/20 to-transparent group-hover:opacity-10 transition-opacity duration-700"></div>

                      {/* Enhanced floating icon background */}
                      <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400/10 to-transparent rounded-full blur-xl group-hover:from-yellow-400/20 group-hover:scale-110 transition-all duration-700"></div>

                      <div className="relative z-10">
                        <div className="flex items-start space-x-6 mb-8">
                          <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-yellow-400/20 to-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:scale-110  group-hover:from-yellow-400/30 group-hover:to-white/30 group-hover:border-yellow-400/30 transition-all duration-700">
                            <IconComponent className="w-8 h-8 text-yellow-400 group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-2xl font-light text-white mb-2 group-hover:text-yellow-100 transition-colors duration-500">
                              {principle.title}
                            </h3>
                            <p className="text-yellow-400/80 text-sm tracking-wide italic group-hover:text-yellow-400 transition-colors duration-500">
                              {principle.subtitle}
                            </p>
                          </div>
                        </div>

                        <p className="text-white/80 leading-relaxed text-base group-hover:text-white/90 transition-colors duration-500">
                          {principle.description}
                        </p>

                        {/* Decorative line with animation */}
                        <div className="mt-8 h-px bg-gradient-to-r from-yellow-400/50 via-white/20 to-transparent group-hover:from-yellow-400/80 group-hover:via-white/40 transition-all duration-700 relative overflow-hidden">
                          <div className="absolute inset-0 w-0 bg-gradient-to-r from-yellow-400 to-white group-hover:w-full transition-all duration-1000 ease-out"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Enhanced Call to Action */}
              <div
                className={`relative group mt-12 transition-all duration-1200 ease-out ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-20 opacity-0"
                }`}
                style={{ transitionDelay: "1900ms" }}
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/30 via-white/10 to-yellow-400/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>

                <div className="relative bg-gradient-to-r from-yellow-400/10 to-white/5 backdrop-blur-2xl rounded-3xl border border-yellow-400/20 p-10 text-center overflow-hidden group-hover:from-yellow-400/15 group-hover:to-white/8 group-hover:border-yellow-400/40 transition-all duration-700 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent group-hover:from-yellow-400/10 transition-all duration-700"></div>

                  {/* Floating sparkles animation */}
                  <div
                    className="absolute top-4 left-4 w-1 h-1 bg-yellow-400 rounded-full animate-ping"
                    style={{ animationDelay: "0s", animationDuration: "3s" }}
                  ></div>
                  <div
                    className="absolute bottom-6 right-8 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-ping"
                    style={{ animationDelay: "1s", animationDuration: "2.5s" }}
                  ></div>
                  <div
                    className="absolute top-8 right-12 w-1 h-1 bg-white rounded-full "
                    style={{ animationDelay: "2s", animationDuration: "4s" }}
                  ></div>

                  <div className="relative z-10">
                    <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700" />
                    <h3 className="text-2xl font-light text-white mb-4 group-hover:text-yellow-100 transition-colors duration-500">
                      Experience Our Atelier
                    </h3>
                    <p className="text-white/70 mb-8 leading-relaxed group-hover:text-white/80 transition-colors duration-500">
                      Discover the artistry behind every creation in our
                      exclusive private showings.
                    </p>
                    <button className="group/btn bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-8 py-4 rounded-full font-medium hover:from-yellow-300 hover:to-yellow-400 hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl shadow-yellow-400/20 hover:shadow-yellow-400/40 hover:shadow-2xl">
                      <span className="flex items-center space-x-3">
                        <span className="tracking-wide">
                          Book Private Viewing
                        </span>
                        <Zap className="w-4 h-4 group-hover/btn:rotate-12 group-hover/btn:scale-110 transition-all duration-300" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutSection;
