import React, { useState, useEffect } from "react";
import { vehicles } from "../vehicles";

export default function VehicleModels({ setCalculatorData, onNavigate }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("models");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
}, []);

const selectModel = (price) => {
    setCalculatorData({
      model: price.toString(),
      downPayment: "",
      tenure: "",
      interestRate: "10.5",
    });

    setTimeout(() => {
      document.querySelector("#calculator")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  const navigateToDetails = (vehicleId) => {
    if (onNavigate) {
      onNavigate('vehicle-details', vehicleId);
    }
  };

  const getStartingPrice = (vehicle) => {
    return Math.min(...vehicle.configurations.map(c => c.price));
  };

  return (
    <section
      id="models"
      className="py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 md:px-12 lg:px-24 bg-[#0a0e0d] text-[#f5f3ee] mt-12 sm:mt-16 md:mt-20"
    >
      <div className="max-w-[1600px] mx-auto">
        
        {/* Header */}
        <div className={`text-center mb-12 sm:mb-16 md:mb-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div 
            className="text-xs sm:text-sm tracking-widest uppercase mb-4 sm:mb-6 text-[#8ea989] font-semibold"
            style={{ letterSpacing: '0.15em' }}
          >
            Our Collection
          </div>
          <h2 
            className="font-bold mb-6 sm:mb-8 px-4"
            style={{ 
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2rem, 5vw, 5rem)',
              letterSpacing: '-0.02em'
            }}
          >
            Designed for Every Journey
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#f5f3ee]/70 max-w-3xl mx-auto leading-relaxed px-4">
            From urban commutes to adventurous rides, discover the perfect electric scooter tailored to your lifestyle.
          </p>
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
          {vehicles.slice(0, 4).map((vehicle, idx) => (
            <div
              key={vehicle.id}
              className={`bg-[#1a1f1e] overflow-hidden cursor-pointer transition-all duration-700 hover:translate-y-[-12px]`}
              style={{ 
                transitionDelay: `${idx * 150}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(10px)'
              }}
              onClick={() => selectModel(getStartingPrice(vehicle))}
            >
              {/* Image */}
              <div className="aspect-square bg-gradient-to-br from-[#8ea989] to-[#c8e5c0] flex items-center justify-center relative overflow-hidden">
                <div 
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url('data:image/svg+xml,<svg width="50" height="50" xmlns="http://www.w3.org/2000/svg"><rect width="50" height="50" fill="none" stroke="rgba(10,14,13,0.1)" stroke-width="1"/></svg>')`
                  }}
                ></div>
                <img 
                  src="/bike.webp"
                  alt={vehicle.name}
                  className="w-3/4 h-3/4 object-contain transition-transform duration-500 hover:scale-110 hover:rotate-[-5deg]"
                  style={{ filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))' }}
                />
              </div>

              {/* Info */}
              <div className="p-6 sm:p-8 md:p-10 lg:p-12">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
                  {vehicle.tags.slice(0, 2).map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="text-[0.65rem] sm:text-xs px-3 sm:px-5 py-1.5 sm:py-2 bg-[#8ea989]/20 text-[#8ea989] uppercase tracking-widest font-semibold"
                      style={{ letterSpacing: '0.1em' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Name */}
                <h3 
                  className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {vehicle.name}
                </h3>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-10 pt-6 sm:pt-8 md:pt-10 border-t border-[#f5f3ee]/10">
                  {[
                    { label: "Motor", value: vehicle.motor },
                    { label: "Load", value: `${vehicle.loadCapacity}kg` },
                  ].map((spec, specIdx) => (
                    <div key={specIdx} className="text-center">
                      <div 
                        className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3"
                        style={{ fontFamily: 'Playfair Display, serif' }}
                      >
                        {spec.value}
                      </div>
                      <div 
                        className="text-[0.65rem] sm:text-xs opacity-60 uppercase tracking-widest"
                        style={{ letterSpacing: '0.1em' }}
                      >
                        {spec.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div className="pt-6 sm:pt-8 md:pt-10 border-t border-[#f5f3ee]/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-center sm:text-left">
                    <div className="text-xs opacity-60 mb-2 sm:mb-3">Starting from</div>
                    <div 
                      className="text-3xl sm:text-4xl font-bold"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      ₹{getStartingPrice(vehicle).toLocaleString()}
                    </div>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent parent div onClick from firing
                      navigateToDetails(vehicle.id); // Navigate to details page
                    }}
                    className="px-12 sm:px-14 md:px-16 py-3 sm:py-3.5 bg-[#8ea989] text-[#0a0e0d] font-semibold hover:bg-[#c8e5c0] transition-all flex items-center justify-center w-full sm:w-auto whitespace-nowrap"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}