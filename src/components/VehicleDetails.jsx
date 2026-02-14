import React, { useState, useEffect } from "react";
import { vehicles } from "../vehicles";

export default function VehicleDetails({ vehicleId, setCalculatorData, onNavigate }) {
  const [vehicle, setVehicle] = useState(null);
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [batteryTypeFilter, setBatteryTypeFilter] = useState("ALL");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const foundVehicle = vehicles.find((v) => v.id === vehicleId);
    if (foundVehicle) {
      setVehicle(foundVehicle);
      setSelectedConfig(foundVehicle.configurations[0]);
      
      // Check if vehicle has both GEL and LITHIUM
      const hasGel = foundVehicle.configurations.some(c => c.batteryType === "GEL");
      const hasLithium = foundVehicle.configurations.some(c => c.batteryType === "LITHIUM");
      
      if (hasGel && hasLithium) {
        setBatteryTypeFilter("ALL");
      } else if (hasGel) {
        setBatteryTypeFilter("GEL");
      } else {
        setBatteryTypeFilter("LITHIUM");
      }
    }
    setIsVisible(true);
  }, [vehicleId]);

  if (!vehicle) return null;

  const filteredConfigs = batteryTypeFilter === "ALL" 
    ? vehicle.configurations 
    : vehicle.configurations.filter(c => c.batteryType === batteryTypeFilter);

  const otherVehicles = vehicles.filter(v => v.id !== vehicleId).slice(0, 6);

  const handleCalculateEMI = () => {
    setCalculatorData({
      model: selectedConfig.price.toString(),
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

  const handleViewAllModels = () => {
    onNavigate('portfolio');
    
    // After navigation, scroll to models section
    setTimeout(() => {
      const modelsSection = document.querySelector("#models");
      if (modelsSection) {
        modelsSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const hasMultipleBatteryTypes = 
    vehicle.configurations.some(c => c.batteryType === "GEL") &&
    vehicle.configurations.some(c => c.batteryType === "LITHIUM");

  return (
    <div className="bg-[#0a0e0d] text-[#f5f3ee] min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="max-w-[1600px] mx-auto">
          <div 
            className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            {/* Breadcrumb */}
            <button 
              onClick={() => onNavigate('portfolio')}
              className="text-[#8ea989] hover:text-[#c8e5c0] transition-colors mb-8 flex items-center gap-2 text-sm uppercase tracking-widest"
            >
              <span>←</span> Back to Models
            </button>

            <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
              {/* Left: Info */}
              <div>
                <div className="flex flex-wrap gap-3 mb-6">
                  {vehicle.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-5 py-2 bg-[#8ea989]/20 text-[#8ea989] uppercase tracking-widest font-semibold"
                      style={{ letterSpacing: '0.1em' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 
                  className="font-bold mb-6"
                  style={{ 
                    fontFamily: 'Playfair Display, serif',
                    fontSize: 'clamp(2.5rem, 6vw, 6rem)',
                    letterSpacing: '-0.02em',
                    lineHeight: '1.1'
                  }}
                >
                  {vehicle.name}
                </h1>

                <p className="text-lg md:text-xl text-[#f5f3ee]/70 mb-8 leading-relaxed">
                  Experience the perfect blend of performance, style, and sustainability with the {vehicle.name}.
                </p>

                {/* Quick Specs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
                  {[
                    { label: "Motor Power", value: vehicle.motor },
                    { label: "Peak Power", value: vehicle.peakPower },
                    { label: "Load Capacity", value: `${vehicle.loadCapacity}kg` },
                    { label: "Tyre Size", value: vehicle.tyreSize },
                  ].map((spec, idx) => (
                    <div key={idx} className="text-center p-4 bg-[#1a1f1e] border border-[#f5f3ee]/10">
                      <div 
                        className="text-2xl font-bold mb-2"
                        style={{ fontFamily: 'Playfair Display, serif' }}
                      >
                        {spec.value}
                      </div>
                      <div className="text-xs opacity-60 uppercase tracking-widest">
                        {spec.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Range */}
                <div className="bg-[#1a1f1e] p-8 border border-[#f5f3ee]/10">
                  <div className="text-xs opacity-60 mb-2 uppercase tracking-widest">Price Range</div>
                  <div 
                    className="text-4xl md:text-5xl font-bold"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    ₹{Math.min(...vehicle.configurations.map(c => c.price)).toLocaleString()} - 
                    ₹{Math.max(...vehicle.configurations.map(c => c.price)).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Right: Image */}
              <div className="relative">
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
                    className="w-3/4 h-3/4 object-contain"
                    style={{ filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.4))' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Configurations Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 lg:px-24 bg-[#0f1413]">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-12">
            <h2 
              className="font-bold mb-4"
              style={{ 
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(2rem, 4vw, 4rem)',
                letterSpacing: '-0.02em'
              }}
            >
              Choose Your Configuration
            </h2>
            <p className="text-lg text-[#f5f3ee]/70">
              Select the perfect battery configuration for your needs
            </p>
          </div>

          {/* Battery Type Filter */}
          {hasMultipleBatteryTypes && (
            <div className="flex justify-center gap-4 mb-10">
              {["ALL", "GEL", "LITHIUM"].map((type) => (
                <button
                  key={type}
                  onClick={() => setBatteryTypeFilter(type)}
                  className={`px-8 py-3 font-semibold uppercase tracking-widest text-sm transition-all ${
                    batteryTypeFilter === type
                      ? "bg-[#8ea989] text-[#0a0e0d]"
                      : "bg-[#1a1f1e] text-[#f5f3ee]/60 hover:text-[#f5f3ee]"
                  }`}
                >
                  {type === "ALL" ? "All Types" : type}
                </button>
              ))}
            </div>
          )}

          {/* Configuration Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredConfigs.map((config) => (
              <div
                key={config.id}
                onClick={() => setSelectedConfig(config)}
                className={`bg-[#1a1f1e] p-8 cursor-pointer transition-all duration-300 border-2 ${
                  selectedConfig?.id === config.id
                    ? "border-[#8ea989] transform scale-[1.02]"
                    : "border-[#f5f3ee]/10 hover:border-[#8ea989]/50"
                }`}
              >
                {/* Battery Type Badge */}
                <div className="flex justify-between items-start mb-6">
                  <span className={`text-xs px-4 py-1.5 font-semibold uppercase tracking-widest ${
                    config.batteryType === "LITHIUM" 
                      ? "bg-[#c8e5c0]/20 text-[#c8e5c0]" 
                      : "bg-[#8ea989]/20 text-[#8ea989]"
                  }`}>
                    {config.batteryType}
                  </span>
                  {selectedConfig?.id === config.id && (
                    <span className="text-[#8ea989] text-2xl">✓</span>
                  )}
                </div>

                {/* Main Specs */}
                <div className="mb-6 pb-6 border-b border-[#f5f3ee]/10">
                  <div 
                    className="text-3xl font-bold mb-2"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {config.voltage}V / {config.capacityAh}Ah
                  </div>
                  <div className="text-sm text-[#f5f3ee]/60">
                    {config.batteryBrand} • {config.chemistry}
                  </div>
                </div>

                {/* Key Features */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-sm text-[#f5f3ee]/60">Range</span>
                    <span className="font-semibold">{config.rangeKm} km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#f5f3ee]/60">Charging Time</span>
                    <span className="font-semibold">{config.chargingTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#f5f3ee]/60">Battery Life</span>
                    <span className="font-semibold">{config.batteryLife}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#f5f3ee]/60">Battery Warranty</span>
                    <span className="font-semibold">{config.warranty.battery}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="pt-6 border-t border-[#f5f3ee]/10">
                  <div 
                    className="text-3xl font-bold"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    ₹{config.price.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Config Actions */}
          {selectedConfig && (
            <div className="mt-12 bg-[#1a1f1e] p-8 md:p-12 border-2 border-[#8ea989]">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 
                    className="text-3xl font-bold mb-4"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Selected Configuration
                  </h3>
                  <p className="text-lg text-[#f5f3ee]/70 mb-2">
                    {selectedConfig.batteryType} • {selectedConfig.voltage}V / {selectedConfig.capacityAh}Ah
                  </p>
                  <p className="text-4xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                    ₹{selectedConfig.price.toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={handleCalculateEMI}
                    className="flex-1 px-8 py-4 bg-[#8ea989] text-[#0a0e0d] font-semibold hover:bg-[#c8e5c0] transition-all text-center"
                  >
                    Calculate EMI
                  </button>
                  <button 
                    onClick={handleViewAllModels}
                    className="flex-1 px-8 py-4 bg-transparent border-2 border-[#8ea989] text-[#8ea989] font-semibold hover:bg-[#8ea989] hover:text-[#0a0e0d] transition-all"
                  >
                    View All Models
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Warranty Section */}
      {selectedConfig && (
        <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-24">
          <div className="max-w-[1600px] mx-auto">
            <h3 
              className="text-3xl md:text-4xl font-bold mb-8 text-center"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Warranty Coverage
            </h3>
            
            {vehicle.warrantyNote && (
              <div className="bg-[#8ea989]/10 border border-[#8ea989]/30 p-6 mb-8 text-center">
                <p className="text-[#8ea989]">{vehicle.warrantyNote}</p>
              </div>
            )}

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(selectedConfig.warranty).map(([key, value]) => (
                <div key={key} className="bg-[#1a1f1e] p-8 text-center border border-[#f5f3ee]/10">
                  <div 
                    className="text-3xl font-bold mb-3"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {value}
                  </div>
                  <div className="text-sm opacity-60 uppercase tracking-widest">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other Vehicles */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 lg:px-24 bg-[#0f1413]">
        <div className="max-w-[1600px] mx-auto">
          <h3 
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Explore Other Models
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherVehicles.map((otherVehicle) => {
              const startingPrice = Math.min(...otherVehicle.configurations.map(c => c.price));
              
              return (
                <div
                  key={otherVehicle.id}
                  onClick={() => onNavigate('vehicle-details', otherVehicle.id)}
                  className="bg-[#1a1f1e] cursor-pointer transition-all duration-300 hover:translate-y-[-8px]"
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
                      alt={otherVehicle.name}
                      className="w-2/3 h-2/3 object-contain transition-transform duration-500 hover:scale-110"
                      style={{ filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))' }}
                    />
                  </div>

                  {/* Info */}
                  <div className="p-8">
                    <div className="flex gap-2 mb-4">
                      {otherVehicle.tags.slice(0, 2).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-3 py-1 bg-[#8ea989]/20 text-[#8ea989] uppercase tracking-widest"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h4 
                      className="text-2xl font-bold mb-4"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      {otherVehicle.name}
                    </h4>

                    <div className="flex justify-between items-center pt-4 border-t border-[#f5f3ee]/10">
                      <div>
                        <div className="text-xs opacity-60 mb-1">Starting from</div>
                        <div 
                          className="text-2xl font-bold"
                          style={{ fontFamily: 'Playfair Display, serif' }}
                        >
                          ₹{startingPrice.toLocaleString()}
                        </div>
                      </div>
                      <span className="text-[#8ea989] text-xl">→</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}