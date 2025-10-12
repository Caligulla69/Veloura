import React from "react";
import { Crown, Award, Users, Globe, Sparkles, Heart } from "lucide-react";

const AboutSection = () => {
  const achievements = [
    { icon: Crown, number: "78+", label: "Years of Excellence", description: "Crafting luxury since 1947" },
    { icon: Award, number: "200+", label: "International Awards", description: "Recognized globally" },
    { icon: Users, number: "50K+", label: "Satisfied Clients", description: "Worldwide community" },
    { icon: Globe, number: "40+", label: "Countries", description: "Global presence" }
  ];

  const values = [
    {
      icon: Crown,
      title: "Heritage & Tradition",
      description: "Our legacy spans generations, combining time-honored techniques with contemporary vision to create pieces that transcend trends."
    },
    {
      icon: Heart,
      title: "Passionate Craftsmanship",
      description: "Every stitch tells a story. Our artisans pour their hearts into each creation, ensuring unparalleled quality and attention to detail."
    },
    {
      icon: Sparkles,
      title: "Innovation & Excellence",
      description: "We continuously push boundaries, embracing new technologies while maintaining the essence of traditional couture craftsmanship."
    }
  ];

  return (
    <section className="relative py-24 px-6 bg-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/5 w-80 h-80 bg-white rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-1/4 right-1/5 w-96 h-96 bg-yellow-200 rounded-full blur-3xl animate-pulse delay-1500"></div>
        <div className="absolute top-2/3 left-2/3 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Grain Texture Overlay */}
      <div className="absolute inset-0 opacity-8 pointer-events-none bg-repeat bg-[length:256px_256px] bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%220%200%20256%20256%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter%20id=%22noiseFilter%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.9%22%20numOctaves=%224%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23noiseFilter)%22%20opacity=%220.4%22/%3E%3C/svg%3E')]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="flex justify-center mb-8">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-3 rounded-full text-sm flex items-center space-x-3">
              <Crown className="w-4 h-4 text-yellow-400" />
              <span className="font-light tracking-widest uppercase">Our Story</span>
              <Crown className="w-4 h-4 text-yellow-400" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight tracking-tight mb-8">
            CRAFTING
            <span className="block font-extralight text-transparent bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text">
              TIMELESS ELEGANCE
            </span>
          </h2>
          
          <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light">
            For nearly eight decades, we have been the epitome of luxury fashion, 
            creating masterpieces that define sophistication and celebrate individuality.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          {/* Left Column - Story */}
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-white/5 via-yellow-400/10 to-white/5 rounded-3xl blur-2xl"></div>
            
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 lg:p-12">
              {/* Inner spotlight */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-white/10 to-transparent rounded-full blur-3xl"></div>
              
              <div className="relative z-10 space-y-8">
                <h3 className="text-2xl md:text-3xl font-light text-white mb-6">
                  A Legacy of <span className="text-yellow-200">Distinction</span>
                </h3>
                
                <div className="space-y-6 text-white/80 leading-relaxed">
                  <p className="text-lg font-light">
                    Founded in 1947 by visionary designer Elena Montclair, our atelier began as a small 
                    boutique in the heart of Paris. What started as a dream to create clothing that 
                    celebrates the unique beauty of every individual has grown into a global symbol 
                    of luxury and refinement.
                  </p>
                  
                  <p className="text-base font-light">
                    Our journey has been marked by countless milestones: dressing royalty, gracing red carpets, 
                    and setting trends that define generations. Yet, our core remains unchanged – an unwavering 
                    commitment to exceptional craftsmanship and timeless design.
                  </p>
                  
                  <p className="text-base font-light">
                    Today, we continue to honor our founder's vision while embracing innovation, 
                    ensuring that each piece we create is not just fashion, but wearable art 
                    that tells your unique story.
                  </p>
                </div>

                {/* Signature */}
                <div className="pt-8 border-t border-white/20">
                  <div className="text-white/60 text-sm italic">
                    "Fashion fades, but style is eternal. We create the eternal."
                  </div>
                  <div className="text-white/40 text-xs mt-2 tracking-wide">
                    – Elena Montclair, Founder
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/10 via-white/5 to-yellow-400/10 rounded-3xl blur-2xl"></div>
            
            <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
              <div className="aspect-[4/5] relative">
                <img 
                  src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                  alt="Fashion Atelier Workshop"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
                
                {/* Caption */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-black/60 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="text-white text-sm font-light tracking-wide">
                      Our Parisian Atelier • Where Dreams Take Shape
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mb-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div key={index} className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-white/5 to-yellow-400/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center hover:bg-white/10 transition-all duration-300">
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-400/20 to-white/20 rounded-full flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-yellow-400" />
                      </div>
                    </div>
                    <div className="text-2xl font-light text-white mb-2">{achievement.number}</div>
                    <div className="text-white/80 text-sm font-medium mb-1">{achievement.label}</div>
                    <div className="text-white/60 text-xs">{achievement.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Values Section */}
        <div className="relative">
          <div className="absolute -inset-8 bg-gradient-to-r from-white/3 via-yellow-400/5 to-white/3 rounded-3xl blur-3xl"></div>
          
          <div className="relative bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 lg:p-12">
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-light text-white mb-6">
                Our Core <span className="text-yellow-200">Values</span>
              </h3>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                The principles that guide every creation and define our commitment to excellence
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div key={index} className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-r from-white/5 to-yellow-400/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 text-center hover:bg-white/10 transition-all duration-300">
                      <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-yellow-400/20 to-white/20 rounded-full flex items-center justify-center">
                          <IconComponent className="w-8 h-8 text-yellow-400" />
                        </div>
                      </div>
                      
                      <h4 className="text-xl font-light text-white mb-4">{value.title}</h4>
                      <p className="text-white/70 leading-relaxed text-sm">{value.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;