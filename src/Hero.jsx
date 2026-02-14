import React, { useEffect, useState } from "react";

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
      className="min-h-screen grid lg:grid-cols-2 gap-16 items-center px-16 pt-32 pb-16 max-w-[1400px] mx-auto"
    >
      {/* Hero Content */}
      <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="editorial-label mb-8">Electric Mobility</div>
        
        <h1 className="font-display text-[clamp(3.5rem,8vw,6.5rem)] font-extrabold leading-[1.1] tracking-tight mb-8">
          The Future<br />of Urban<br />Transport
        </h1>

        <p className="text-xl text-[#6b7570] max-w-[500px] mb-12 leading-relaxed">
          Experience the perfect harmony of sustainable engineering, elegant design, and uncompromising performance.
        </p>

        <div className="flex flex-wrap gap-6">
          <button
            onClick={scrollToModels}
            className="btn-premium px-12 py-5 bg-[#0a0e0d] text-[#f5f3ee] font-semibold text-base tracking-wide"
          >
            Explore Collection
          </button>

          <button
            onClick={scrollToCalculator}
            className="px-12 py-5 bg-transparent border-2 border-[#0a0e0d] text-[#0a0e0d] font-semibold text-base tracking-wide hover:bg-[#0a0e0d] hover:text-[#f5f3ee] transition-all"
          >
            Calculate EMI
          </button>
        </div>
      </div>

      {/* Hero Visual */}
      <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
        <div className="relative aspect-[4/5] bg-gradient-to-br from-[#8ea989] to-[#c8e5c0] flex items-center justify-center overflow-hidden">
          {/* Grid Pattern */}
          <div className="absolute inset-0 grid-pattern opacity-50"></div>
          
          {/* Scooter Icon */}
          <div className="text-[15rem] animate-float filter drop-shadow-2xl">
            🛵
          </div>
        </div>

        {/* Stats Card */}
        <div className="absolute bottom-[-2rem] right-[-2rem] bg-[#0a0e0d] text-[#f5f3ee] p-10 grid grid-cols-2 gap-8 min-w-[300px]">
          {[
            { value: "180km", label: "Max Range" },
            { value: "75km/h", label: "Top Speed" },
            { value: "3-5hrs", label: "Charge Time" },
            { value: "4 Year", label: "Warranty" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="font-display text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-xs uppercase tracking-widest opacity-70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}