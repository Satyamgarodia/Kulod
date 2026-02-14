import React, { useState, useEffect } from "react";
import { vehicles } from "../vehicles";

export default function VehicleModels({ setCalculatorData }) {
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

  // Get the first configuration price for each vehicle
  const getStartingPrice = (vehicle) => {
    return Math.min(...vehicle.configurations.map(c => c.price));
  };

  return (
    <section
      id="models"
      className="py-24 px-6 bg-[#0a0e0d] text-[#f5f3ee]"
    >
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="section-subtitle mb-4">Our Collection</div>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold mb-6">
            Designed for Every Journey
          </h2>
          <p className="text-lg text-[#f5f3ee]/70 max-w-2xl mx-auto">
            From urban commutes to adventurous rides, discover the perfect electric scooter tailored to your lifestyle.
          </p>
        </div>

        {/* Models Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {vehicles.slice(0, 4).map((vehicle, idx) => (
            <div
              key={vehicle.id}
              className={`card-premium bg-[#1a1f1e] overflow-hidden cursor-pointer transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${idx * 150}ms` }}
              onClick={() => selectModel(getStartingPrice(vehicle))}
            >
              {/* Image */}
              <div className="aspect-square bg-gradient-to-br from-[#8ea989] to-[#c8e5c0] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 grid-pattern-light"></div>
                <div className="text-[10rem] transition-transform duration-500 hover:scale-110 hover:rotate-[-5deg] filter drop-shadow-2xl">
                  {vehicle.baseImage}
                </div>
              </div>

              {/* Info */}
              <div className="p-10">
                {/* Tags */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {vehicle.tags.slice(0, 2).map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="text-xs px-4 py-2 bg-[#8ea989]/20 text-[#8ea989] uppercase tracking-widest font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Name */}
                <h3 className="font-display text-3xl font-bold mb-8">
                  {vehicle.name}
                </h3>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-6 mb-8 pt-8 border-t border-[#f5f3ee]/10">
                  {[
                    { label: "Motor", value: vehicle.motor },
                    { label: "Load", value: `${vehicle.loadCapacity}kg` },
                  ].map((spec, specIdx) => (
                    <div key={specIdx} className="text-center">
                      <div className="font-display text-2xl font-bold mb-2">
                        {spec.value}
                      </div>
                      <div className="text-xs opacity-60 uppercase tracking-widest">
                        {spec.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div className="pt-8 border-t border-[#f5f3ee]/10 flex justify-between items-center">
                  <div>
                    <div className="text-xs opacity-60 mb-2">Starting from</div>
                    <div className="font-display text-3xl font-bold">
                      ₹{getStartingPrice(vehicle).toLocaleString()}
                    </div>
                  </div>
                  <button className="px-8 py-3 bg-[#8ea989] text-[#0a0e0d] font-semibold hover:bg-[#c8e5c0] transition-all">
                    View
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