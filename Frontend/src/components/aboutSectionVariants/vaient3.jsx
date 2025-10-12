import React, { useState, useEffect, useRef } from "react";
import { Scissors, Pin, Sparkles, Crown, Eye, Zap } from "lucide-react";

const AboutSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [revealedCards, setRevealedCards] = useState(new Set());
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  // Scroll-based animations
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
        setScrollY(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animated fabric texture on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const threads = [];
    for (let i = 0; i < 100; i++) {
      threads.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 200 + 50,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.01,
        opacity: Math.random() * 0.3 + 0.1
      });
    }

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      threads.forEach(thread => {
        thread.angle += thread.speed;
        thread.x += Math.cos(thread.angle) * 0.5;
        thread.y += Math.sin(thread.angle) * 0.5;
        
        if (thread.x > canvas.width) thread.x = 0;
        if (thread.x < 0) thread.x = canvas.width;
        if (thread.y > canvas.height) thread.y = 0;
        if (thread.y < 0) thread.y = canvas.height;

        const gradient = ctx.createLinearGradient(
          thread.x, thread.y,
          thread.x + Math.cos(thread.angle) * thread.length,
          thread.y + Math.sin(thread.angle) * thread.length
        );
        gradient.addColorStop(0, `rgba(255, 215, 0, ${thread.opacity})`);
        gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(thread.x, thread.y);
        ctx.lineTo(
          thread.x + Math.cos(thread.angle) * thread.length,
          thread.y + Math.sin(thread.angle) * thread.length
        );
        ctx.stroke();
      });

      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

    const chapters = [
    {
      title: "Genesis",
      year: "1947",
      subtitle: "From Vision to Reality",
      content: "In the heart of post-war Paris, amidst the echoes of hope and renewal, Elena Montclair's needles first pierced silk. What began as rebellion against conformity became the foundation of timeless elegance.",
    image:"/people/dresses.png",
      color: "from-amber-400/20"
    },
    {
      title: "Evolution", 
      year: "1970s",
      subtitle: "The Revolutionary Decades",
      content: "As the world transformed, so did our craft. We embraced change while honoring tradition, creating pieces that spoke to a new generation of confident, liberated souls seeking authentic self-expression.",
    image:"/people/coat.png",
      color: "from-rose-400/20"
    },
    {
      title: "Mastery",
      year: "Today", 
      subtitle: "Beyond Fashion",
      content: "We've transcended the boundaries of fashion to become architects of identity. Each piece is a philosophical statement, a wearable manifesto of individuality crafted through uncompromising artisanship.",
    image:"/people/Marquee1.png",
      color: "from-emerald-400/20"
    }
  ];

  const philosophies = [
    {
      icon: Pin,
      concept: "Precision",
      mantra: "Every stitch is intentional",
      revelation: "In the microscopic space between thread and fabric lies the difference between clothing and couture. We inhabit that space with reverence.",
      pattern: "M12,2 L22,12 L12,22 L2,12 Z"
    },
    {
      icon: Scissors,
      concept: "Vision", 
      mantra: "What is unseen shapes what is seen",
      revelation: "The negative space around a silhouette speaks louder than the fabric itself. We sculpt absence as much as presence.",
      pattern: "M3,3 L21,3 L21,21 L3,21 Z M9,9 L15,9 L15,15 L9,15 Z"
    },
    {
      icon: Crown,
      concept: "Sovereignty",
      mantra: "Wear your truth unapologetically", 
      revelation: "True luxury isn't about exclusion—it's about the courage to be authentically yourself in a world that demands conformity.",
      pattern: "M12,2 L15.09,8.26 L22,9 L17,14 L18.18,21 L12,17.77 L5.82,21 L7,14 L2,9 L8.91,8.26 Z"
    }
  ];

  const handleCardReveal = (index) => {
    setRevealedCards(prev => new Set([...prev, index]));
  };

  return (
    <div ref={sectionRef} className="relative min-h-screen bg-black overflow-hidden">
      {/* Animated Fabric Canvas Background */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Parallax Background Layers */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black"
        style={{ transform: `translateY(${scrollY * 20}px)` }}
      />
      
      {/* Dynamic Gradient Overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{ 
          background: `radial-gradient(circle at ${50 + scrollY * 50}% ${30 + scrollY * 40}%, rgba(255,215,0,0.15) 0%, transparent 60%)`
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Morphing Header */}
        <div className="text-center mb-40 relative">
          <div 
            className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
            style={{ transform: `scale(${1 + scrollY * 0.5}) rotate(${scrollY * 5}deg)`, opacity: 0.1 }}
          >
            <div className="text-8xl md:text-9xl font-thin text-white tracking-[1rem]">METAMORPHOSIS</div>
          </div>

          <div className="relative space-y-12">
            <div 
              className="inline-block"
              style={{ transform: `translateY(${scrollY * -30}px)` }}
            >
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-thin text-white leading-none">
                <span className="inline-block" style={{ transform: `rotate(${scrollY * -2}deg)` }}>WE</span>{' '}
                <span className="inline-block bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent">
                  DON'T
                </span>{' '}
                <span className="inline-block" style={{ transform: `rotate(${scrollY * 2}deg)` }}>MAKE</span>
                <br />
                <span className="text-5xl md:text-7xl text-yellow-400/80 font-extralight tracking-widest">
                  CLOTHES
                </span>
              </h1>
            </div>

            <div 
              className="space-y-6"
              style={{ transform: `translateY(${scrollY * 20}px)`, opacity: 1 - scrollY * 0.5 }}
            >
              <p className="text-2xl md:text-3xl text-white/70 font-light max-w-4xl mx-auto leading-relaxed">
                We architect identities. Sculpt confidence. Engineer dreams into wearable reality.
              </p>
              <div className="flex justify-center">
                <div className="w-32 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Chapter Navigation */}
        <div className="flex justify-center mb-20">
          <div className="flex space-x-4 bg-black/60 backdrop-blur-2xl rounded-full p-2 border border-white/10">
            {chapters.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentChapter(index)}
                className={`w-12 h-12 rounded-full transition-all duration-500 ${
                  currentChapter === index
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg shadow-yellow-400/50'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <div className={`text-sm font-light ${
                  currentChapter === index ? 'text-black' : 'text-white/60'
                }`}>
                  {index + 1}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chapter Display */}
        <div className="mb-32 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Chapter Content */}
            <div className="order-2 lg:order-1 space-y-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className={`text-6xl font-thin bg-gradient-to-r ${chapters[currentChapter].color} to-transparent bg-clip-text text-transparent`}>
                    {chapters[currentChapter].year}
                  </div>
                  <div className="h-px bg-gradient-to-r from-white/30 to-transparent flex-1"></div>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-light text-white">
                  {chapters[currentChapter].title}
                </h2>
                <p className="text-yellow-400/80 text-xl italic tracking-wide">
                  {chapters[currentChapter].subtitle}
                </p>
              </div>

              <div className="bg-gradient-to-r from-white/5 to-transparent backdrop-blur-xl rounded-2xl border border-white/10 p-8">
                <p className="text-white/80 text-lg leading-relaxed">
                  {chapters[currentChapter].content}
                </p>
              </div>
            </div>

            {/* Chapter Image */}
            <div className="order-1 lg:order-2 relative group">
              <div className={`absolute -inset-8 bg-gradient-to-r ${chapters[currentChapter].color} to-transparent rounded-3xl blur-3xl opacity-0 group-hover:opacity-60 transition-all duration-1000`}></div>
              
              <div className="relative overflow-hidden rounded-3xl bg-black/20 backdrop-blur-sm border border-white/20">
                <div className="aspect-[4/5] relative">
                  <img 
                    src={chapters[currentChapter].image}
                    alt={chapters[currentChapter].title}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${chapters[currentChapter].color} to-transparent opacity-30`}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Philosophy Cards */}
        <div className="space-y-16">
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-light text-white mb-4">
              The <span className="text-yellow-400">Trinity</span> of Creation
            </h3>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Three pillars upon which every masterpiece stands
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {philosophies.map((philosophy, index) => {
              const IconComponent = philosophy.icon;
              const isRevealed = revealedCards.has(index);
              
              return (
                <div 
                  key={index}
                  className="relative group cursor-pointer"
                  onClick={() => handleCardReveal(index)}
                  onMouseEnter={() => handleCardReveal(index)}
                >
                  <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/20 via-white/5 to-yellow-400/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
                  
                  <div className={`relative min-h-96 bg-gradient-to-br backdrop-blur-2xl rounded-3xl border overflow-hidden transition-all duration-1000 ${
                    isRevealed 
                      ? 'from-white/15 to-white/5 border-yellow-400/30 shadow-2xl shadow-yellow-400/10' 
                      : 'from-white/5 to-white/2 border-white/10'
                  }`}>
                    
                    {/* Animated SVG Pattern Background */}
                    <div className="absolute inset-0 opacity-5">
                      <svg className="w-full h-full">
                        <pattern id={`pattern-${index}`} patternUnits="userSpaceOnUse" width="40" height="40">
                          <path d={philosophy.pattern} fill="none" stroke="currentColor" strokeWidth="0.5"/>
                        </pattern>
                        <rect width="100%" height="100%" fill={`url(#pattern-${index})`} className="text-yellow-400"/>
                      </svg>
                    </div>

                    <div className="relative z-10 p-8 h-full flex flex-col">
                      <div className="mb-8">
                        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400/20 to-white/20 rounded-2xl mb-6 group-hover:rotate-12 transition-transform duration-500">
                          <IconComponent className="w-8 h-8 text-yellow-400" />
                        </div>
                        
                        <h4 className="text-2xl font-light text-white mb-3">{philosophy.concept}</h4>
                        <p className="text-yellow-400/80 italic text-sm tracking-wide">{philosophy.mantra}</p>
                      </div>

                      <div className={`flex-1 transition-all duration-1000 ${
                        isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}>
                        <div className="h-px bg-gradient-to-r from-yellow-400/50 via-white/20 to-transparent mb-6"></div>
                        <p className="text-white/80 leading-relaxed text-sm">{philosophy.revelation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Final CTA with Morphing Button */}
        <div className="text-center mt-32">
          <div className="relative inline-block group">
            <div className="absolute -inset-8 bg-gradient-to-r from-yellow-400/30 via-white/10 to-yellow-400/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
            
            <button className="relative bg-gradient-to-r from-black via-gray-900 to-black border border-yellow-400/50 text-white px-12 py-6 rounded-full font-light text-lg tracking-wide hover:from-yellow-400/10 hover:to-yellow-400/10 transition-all duration-500 overflow-hidden">
              <span className="relative z-10 flex items-center space-x-4">
                <span>Enter Our Universe</span>
                <Sparkles className="w-5 h-5 animate-spin" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;