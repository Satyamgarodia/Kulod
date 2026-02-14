import React, { useState, useEffect } from "react";
import { vehicles } from "../vehicles";

export default function VehicleDetails({ vehicleId, setCalculatorData, onNavigate }) {
  const [vehicle, setVehicle] = useState(null);
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    batteryType: "ALL", // GEL, LITHIUM, ALL
    voltage: "ALL", // 48, 60, 63, 72, 74, ALL
    capacity: "ALL", // 25, 30, 33, 35, 40, 50, 55, ALL
    priceRange: [0, 150000],
    rangeKm: "ALL", // 60, 70, 85, 100, 120, 150, 200, ALL
    searchQuery: ""
  });

  // Available filter options (computed from configurations)
  const [filterOptions, setFilterOptions] = useState({
    voltages: [],
    capacities: [],
    ranges: [],
    minPrice: 0,
    maxPrice: 150000
  });

  useEffect(() => {
    const foundVehicle = vehicles.find((v) => v.id === vehicleId);
    if (foundVehicle) {
      setVehicle(foundVehicle);
      
      // Compute filter options from configurations
      const voltages = [...new Set(foundVehicle.configurations.map(c => c.voltage))].sort((a, b) => a - b);
      const capacities = [...new Set(foundVehicle.configurations.map(c => c.capacityAh))].sort((a, b) => a - b);
      const ranges = [...new Set(foundVehicle.configurations.map(c => c.rangeKm))].sort((a, b) => a - b);
      const prices = foundVehicle.configurations.map(c => c.price);
      
      setFilterOptions({
        voltages,
        capacities,
        ranges,
        minPrice: Math.min(...prices),
        maxPrice: Math.max(...prices)
      });
      
      setFilters(prev => ({
        ...prev,
        priceRange: [Math.min(...prices), Math.max(...prices)]
      }));
      
      setSelectedConfig(foundVehicle.configurations[0]);
    }
    setIsVisible(true);
  }, [vehicleId]);

  if (!vehicle) return null;

  // Apply filters
  const filteredConfigs = vehicle.configurations.filter(config => {
    // Battery type filter
    if (filters.batteryType !== "ALL" && config.batteryType !== filters.batteryType) {
      return false;
    }
    
    // Voltage filter
    if (filters.voltage !== "ALL" && config.voltage !== parseInt(filters.voltage)) {
      return false;
    }
    
    // Capacity filter
    if (filters.capacity !== "ALL" && config.capacityAh !== parseInt(filters.capacity)) {
      return false;
    }
    
    // Price range filter
    if (config.price < filters.priceRange[0] || config.price > filters.priceRange[1]) {
      return false;
    }
    
    // Range filter
    if (filters.rangeKm !== "ALL" && config.rangeKm !== parseInt(filters.rangeKm)) {
      return false;
    }
    
    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const searchableText = `${config.batteryType} ${config.voltage}v ${config.capacityAh}ah ${config.rangeKm}km ${config.batteryBrand}`.toLowerCase();
      if (!searchableText.includes(query)) {
        return false;
      }
    }
    
    return true;
  });

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
    
    setTimeout(() => {
      const modelsSection = document.querySelector("#models");
      if (modelsSection) {
        modelsSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const resetFilters = () => {
    setFilters({
      batteryType: "ALL",
      voltage: "ALL",
      capacity: "ALL",
      priceRange: [filterOptions.minPrice, filterOptions.maxPrice],
      rangeKm: "ALL",
      searchQuery: ""
    });
  };

  const hasActiveFilters = 
    filters.batteryType !== "ALL" ||
    filters.voltage !== "ALL" ||
    filters.capacity !== "ALL" ||
    filters.rangeKm !== "ALL" ||
    filters.searchQuery !== "" ||
    filters.priceRange[0] !== filterOptions.minPrice ||
    filters.priceRange[1] !== filterOptions.maxPrice;

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

      {/* Configuration Section */}
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
              Customize your perfect electric scooter
            </p>
          </div>

          {/* Filters Panel - Apple Style */}
          <div className="mb-10 space-y-6">
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search configurations..."
                value={filters.searchQuery}
                onChange={(e) => setFilters({...filters, searchQuery: e.target.value})}
                className="w-full px-6 py-4 bg-[#1a1f1e] border border-[#f5f3ee]/10 text-[#f5f3ee] placeholder-[#f5f3ee]/40 focus:border-[#8ea989] focus:outline-none transition-all text-lg"
              />
            </div>

            {/* Filter Groups */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Battery Type */}
              <div className="bg-[#1a1f1e] p-6 border border-[#f5f3ee]/10">
                <label className="block text-sm uppercase tracking-widest mb-4 text-[#8ea989] font-semibold">
                  Battery Type
                </label>
                <div className="space-y-2">
                  {["ALL", "GEL", "LITHIUM"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilters({...filters, batteryType: type})}
                      className={`w-full px-4 py-3 text-left transition-all ${
                        filters.batteryType === type
                          ? "bg-[#8ea989] text-[#0a0e0d] font-semibold"
                          : "bg-[#0a0e0d] text-[#f5f3ee]/70 hover:text-[#f5f3ee]"
                      }`}
                    >
                      {type === "ALL" ? "All Types" : type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Voltage */}
              <div className="bg-[#1a1f1e] p-6 border border-[#f5f3ee]/10">
                <label className="block text-sm uppercase tracking-widest mb-4 text-[#8ea989] font-semibold">
                  Voltage
                </label>
                <div className="space-y-2">
                  <button
                    onClick={() => setFilters({...filters, voltage: "ALL"})}
                    className={`w-full px-4 py-3 text-left transition-all ${
                      filters.voltage === "ALL"
                        ? "bg-[#8ea989] text-[#0a0e0d] font-semibold"
                        : "bg-[#0a0e0d] text-[#f5f3ee]/70 hover:text-[#f5f3ee]"
                    }`}
                  >
                    All Voltages
                  </button>
                  {filterOptions.voltages.map((v) => (
                    <button
                      key={v}
                      onClick={() => setFilters({...filters, voltage: v.toString()})}
                      className={`w-full px-4 py-3 text-left transition-all ${
                        filters.voltage === v.toString()
                          ? "bg-[#8ea989] text-[#0a0e0d] font-semibold"
                          : "bg-[#0a0e0d] text-[#f5f3ee]/70 hover:text-[#f5f3ee]"
                      }`}
                    >
                      {v}V
                    </button>
                  ))}
                </div>
              </div>

              {/* Capacity */}
              <div className="bg-[#1a1f1e] p-6 border border-[#f5f3ee]/10">
                <label className="block text-sm uppercase tracking-widest mb-4 text-[#8ea989] font-semibold">
                  Capacity
                </label>
                <div className="space-y-2">
                  <button
                    onClick={() => setFilters({...filters, capacity: "ALL"})}
                    className={`w-full px-4 py-3 text-left transition-all ${
                      filters.capacity === "ALL"
                        ? "bg-[#8ea989] text-[#0a0e0d] font-semibold"
                        : "bg-[#0a0e0d] text-[#f5f3ee]/70 hover:text-[#f5f3ee]"
                    }`}
                  >
                    All Capacities
                  </button>
                  {filterOptions.capacities.map((c) => (
                    <button
                      key={c}
                      onClick={() => setFilters({...filters, capacity: c.toString()})}
                      className={`w-full px-4 py-3 text-left transition-all ${
                        filters.capacity === c.toString()
                          ? "bg-[#8ea989] text-[#0a0e0d] font-semibold"
                          : "bg-[#0a0e0d] text-[#f5f3ee]/70 hover:text-[#f5f3ee]"
                      }`}
                    >
                      {c}Ah
                    </button>
                  ))}
                </div>
              </div>

              {/* Range */}
              <div className="bg-[#1a1f1e] p-6 border border-[#f5f3ee]/10">
                <label className="block text-sm uppercase tracking-widest mb-4 text-[#8ea989] font-semibold">
                  Range
                </label>
                <div className="space-y-2">
                  <button
                    onClick={() => setFilters({...filters, rangeKm: "ALL"})}
                    className={`w-full px-4 py-3 text-left transition-all ${
                      filters.rangeKm === "ALL"
                        ? "bg-[#8ea989] text-[#0a0e0d] font-semibold"
                        : "bg-[#0a0e0d] text-[#f5f3ee]/70 hover:text-[#f5f3ee]"
                    }`}
                  >
                    All Ranges
                  </button>
                  {filterOptions.ranges.map((r) => (
                    <button
                      key={r}
                      onClick={() => setFilters({...filters, rangeKm: r.toString()})}
                      className={`w-full px-4 py-3 text-left transition-all ${
                        filters.rangeKm === r.toString()
                          ? "bg-[#8ea989] text-[#0a0e0d] font-semibold"
                          : "bg-[#0a0e0d] text-[#f5f3ee]/70 hover:text-[#f5f3ee]"
                      }`}
                    >
                      {r} km
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="bg-[#1a1f1e] p-6 border border-[#f5f3ee]/10 sm:col-span-2">
                <label className="block text-sm uppercase tracking-widest mb-4 text-[#8ea989] font-semibold">
                  Price Range
                </label>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>₹{filters.priceRange[0].toLocaleString()}</span>
                    <span>₹{filters.priceRange[1].toLocaleString()}</span>
                  </div>
                  <div className="flex gap-4">
                    <input
                      type="range"
                      min={filterOptions.minPrice}
                      max={filterOptions.maxPrice}
                      value={filters.priceRange[0]}
                      onChange={(e) => setFilters({
                        ...filters, 
                        priceRange: [parseInt(e.target.value), filters.priceRange[1]]
                      })}
                      className="flex-1"
                    />
                    <input
                      type="range"
                      min={filterOptions.minPrice}
                      max={filterOptions.maxPrice}
                      value={filters.priceRange[1]}
                      onChange={(e) => setFilters({
                        ...filters, 
                        priceRange: [filters.priceRange[0], parseInt(e.target.value)]
                      })}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Active Filters & Reset */}
            {hasActiveFilters && (
              <div className="flex justify-between items-center p-4 bg-[#1a1f1e] border border-[#8ea989]/30">
                <span className="text-sm text-[#8ea989]">
                  {filteredConfigs.length} configuration{filteredConfigs.length !== 1 ? 's' : ''} found
                </span>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2 text-sm bg-transparent border border-[#8ea989] text-[#8ea989] hover:bg-[#8ea989] hover:text-[#0a0e0d] transition-all uppercase tracking-widest"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

          {/* Configuration Cards */}
          {filteredConfigs.length > 0 ? (
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
          ) : (
            <div className="text-center py-20">
              <p className="text-2xl text-[#f5f3ee]/60 mb-6">No configurations match your filters</p>
              <button
                onClick={resetFilters}
                className="px-8 py-4 bg-[#8ea989] text-[#0a0e0d] font-semibold hover:bg-[#c8e5c0] transition-all"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Selected Config Actions */}
          {selectedConfig && filteredConfigs.length > 0 && (
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