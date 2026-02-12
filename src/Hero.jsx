import React, { useEffect, useState } from "react";
import { ArrowRight, Zap, TrendingUp, Battery, Sparkles } from "lucide-react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToModels = () => {
    document.querySelector("#models")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const scrollToCalculator = () => {
    document.querySelector("#calculator")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Cyber Grid */}
        <div className="absolute inset-0 cyber-grid opacity-20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 backdrop-blur-sm transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
            <span className="text-sm font-bold text-yellow-500 orbitron tracking-wider">
              THE FUTURE OF MOBILITY
            </span>
          </div>

          {/* Main Heading */}
          <h1
            className={`text-5xl md:text-7xl lg:text-8xl font-black orbitron leading-tight transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <span className="block mb-4">RIDE THE</span>
            <span className="block bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent animate-fade-up">
              ELECTRIC
            </span>
            <span className="block bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent animate-fade-up" style={{ animationDelay: '0.1s' }}>
              REVOLUTION
            </span>
          </h1>

          {/* Subheading */}
          <p
            className={`text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Experience the perfect blend of cutting-edge technology, sustainable energy, and unmatched performance with Zelio Electric Scooters
          </p>

          {/* Stats */}
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto my-12 transition-all duration-1000 delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {[
              { icon: Zap, value: "150km", label: "Max Range" },
              { icon: TrendingUp, value: "75km/h", label: "Top Speed" },
              { icon: Battery, value: "3-5hrs", label: "Fast Charge" },
              { icon: Sparkles, value: "4 Years", label: "Warranty" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105 group"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <stat.icon className="w-8 h-8 text-yellow-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-3xl font-black orbitron text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <button
              onClick={scrollToModels}
              className="group relative px-8 py-5 bg-gradient-to-r from-yellow-500 to-orange-600 text-black font-black rounded-2xl text-lg orbitron overflow-hidden hover:scale-105 transition-all duration-300 shadow-2xl shadow-yellow-500/30 hover:shadow-yellow-500/50 w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Explore Models
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button
              onClick={scrollToCalculator}
              className="group px-8 py-5 bg-white/5 backdrop-blur-sm border-2 border-white/20 text-white font-bold rounded-2xl text-lg orbitron hover:bg-white/10 hover:border-yellow-500/50 transition-all duration-300 w-full sm:w-auto"
            >
              <span className="flex items-center justify-center gap-3">
                Calculate EMI
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div
            className={`flex flex-wrap items-center justify-center gap-8 pt-12 transition-all duration-1000 delay-1200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {[
              "🏆 Award Winning Design",
              "♻️ 100% Eco-Friendly",
              "⚡ Zero Emissions",
              "🔒 Industry Leading Safety",
            ].map((badge, idx) => (
              <div
                key={idx}
                className="text-sm text-gray-400 font-semibold"
              >
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-yellow-500/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
