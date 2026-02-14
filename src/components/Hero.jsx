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
      className="min-h-screen grid lg:grid-cols-2 gap-24 items-center px-8 md:px-16 lg:px-24 pt-40 pb-24 max-w-[1600px] mx-auto"
    >
      {/* Hero Content */}
      <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div 
          className="inline-block px-8 py-4 bg-[#0a0e0d] text-[#f5f3ee] text-xs uppercase tracking-widest font-semibold mb-12"
          style={{ letterSpacing: '0.15em' }}
        >
          Electric Mobility
        </div>
        
        <h1 
          className="font-display font-extrabold leading-[1.1] tracking-tight mb-12"
          style={{ 
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(3.5rem, 8vw, 7rem)',
            letterSpacing: '-0.02em'
          }}
        >
          The Future<br />of Urban<br />Transport
        </h1>

        <p className="text-xl md:text-2xl text-[#6b7570] max-w-[600px] mb-16 leading-[1.8]">
          Experience the perfect harmony of sustainable engineering, elegant design, and uncompromising performance.
        </p>

        <div className="flex flex-wrap gap-6">
          <button
            onClick={scrollToModels}
            className="px-14 py-6 bg-[#0a0e0d] text-[#f5f3ee] font-semibold text-lg tracking-wide hover:bg-[#8ea989] hover:text-[#0a0e0d] transition-all relative overflow-hidden"
            style={{ letterSpacing: '0.02em' }}
          >
            <span className="relative z-10">Explore Collection</span>
          </button>

          <button
            onClick={scrollToCalculator}
            className="px-14 py-6 bg-transparent border-2 border-[#0a0e0d] text-[#0a0e0d] font-semibold text-lg tracking-wide hover:bg-[#0a0e0d] hover:text-[#f5f3ee] transition-all"
            style={{ letterSpacing: '0.02em' }}
          >
            Calculate EMI
          </button>
        </div>
      </div>

      {/* Hero Visual */}
      <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
        <div 
          className="relative aspect-[4/5] bg-gradient-to-br from-[#8ea989] to-[#c8e5c0] flex items-center justify-center overflow-hidden"
        >
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage: `url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse"><path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(10,14,13,0.05)" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(%23grid)"/></svg>')`
            }}
          ></div>
          
          {/* Scooter Icon */}
          <div 
            className="text-[15rem]"
            style={{
              animation: 'float 6s ease-in-out infinite',
              filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.2))'
            }}
          >
            🛵
          </div>
        </div>

        {/* Stats Card */}
        <div className="absolute bottom-[-3rem] right-[-3rem] bg-[#0a0e0d] text-[#f5f3ee] p-12 grid grid-cols-2 gap-10 min-w-[340px]">
          {[
            { value: "180km", label: "Max Range" },
            { value: "75km/h", label: "Top Speed" },
            { value: "3-5hrs", label: "Charge Time" },
            { value: "4 Year", label: "Warranty" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div 
                className="text-4xl font-bold mb-3"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {stat.value}
              </div>
              <div 
                className="text-xs uppercase tracking-widest opacity-70"
                style={{ letterSpacing: '0.1em' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </section>
  );
}