import React, { useState, useEffect } from "react";
import { vehicles } from "../vehicles";

export default function VehicleDetails({ vehicleId, setCalculatorData, onNavigate }) {
  const [vehicle, setVehicle] = useState(null);
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    batteryType: "ALL",
    voltage: "ALL",
    capacity: "ALL",
    priceRange: [0, 150000],
    rangeKm: "ALL",
    searchQuery: ""
  });

  // Dropdown open/close states
  const [openDropdowns, setOpenDropdowns] = useState({
    batteryType: false,
    voltage: false,
    capacity: false,
    range: false,
    price: false
  });

  // Available filter options
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

  const toggleDropdown = (dropdown) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };

  // Apply filters
  const filteredConfigs = vehicle.configurations.filter(config => {
    if (filters.batteryType !== "ALL" && config.batteryType !== filters.batteryType) return false;
    if (filters.voltage !== "ALL" && config.voltage !== parseInt(filters.voltage)) return false;
    if (filters.capacity !== "ALL" && config.capacityAh !== parseInt(filters.capacity)) return false;
    if (config.price < filters.priceRange[0] || config.price > filters.priceRange[1]) return false;
    if (filters.rangeKm !== "ALL" && config.rangeKm !== parseInt(filters.rangeKm)) return false;
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const searchableText = `${config.batteryType} ${config.voltage}v ${config.capacityAh}ah ${config.rangeKm}km ${config.batteryBrand}`.toLowerCase();
      if (!searchableText.includes(query)) return false;
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
      document.querySelector("#calculator")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleViewAllModels = () => {
    onNavigate('portfolio');
    setTimeout(() => {
      const modelsSection = document.querySelector("#models");
      if (modelsSection) modelsSection.scrollIntoView({ behavior: "smooth" });
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

  const getFilterLabel = (filterType) => {
    switch(filterType) {
      case 'batteryType':
        return filters.batteryType === "ALL" ? "All Battery Types" : filters.batteryType;
      case 'voltage':
        return filters.voltage === "ALL" ? "All Voltages" : `${filters.voltage}V`;
      case 'capacity':
        return filters.capacity === "ALL" ? "All Capacities" : `${filters.capacity}Ah`;
      case 'range':
        return filters.rangeKm === "ALL" ? "All Ranges" : `${filters.rangeKm} km`;
      case 'price':
        return `₹${filters.priceRange[0].toLocaleString()} - ₹${filters.priceRange[1].toLocaleString()}`;
      default:
        return "";
    }
  };

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
              className="text-[#8ea989] hover:text-[#c8e5c0] transition-colors mb-8 flex items-center gap-2 text-sm uppercase tracking-widest group"
            >
              <span className="transform group-hover:-translate-x-1 transition-transform">←</span> Back to Models
            </button>

            <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
              {/* Left: Info */}
              <div>
                <div className="flex flex-wrap gap-3 mb-6">
                  {vehicle.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-5 py-2 bg-[#8ea989]/20 text-[#8ea989] uppercase tracking-widest font-semibold animate-fade-in"
                      style={{ 
                        letterSpacing: '0.1em',
                        animationDelay: `${idx * 100}ms`
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 
                  className="font-bold mb-6 animate-slide-up"
                  style={{ 
                    fontFamily: 'Playfair Display, serif',
                    fontSize: 'clamp(2.5rem, 6vw, 6rem)',
                    letterSpacing: '-0.02em',
                    lineHeight: '1.1'
                  }}
                >
                  {vehicle.name}
                </h1>

                <p className="text-lg md:text-xl text-[#f5f3ee]/70 mb-8 leading-relaxed animate-slide-up" style={{ animationDelay: '200ms' }}>
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
                    <div 
                      key={idx} 
                      className="text-center p-4 bg-[#1a1f1e] border border-[#f5f3ee]/10 hover:border-[#8ea989]/50 transition-all duration-300 hover:transform hover:scale-105 animate-fade-in"
                      style={{ animationDelay: `${300 + idx * 100}ms` }}
                    >
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
                <div className="bg-[#1a1f1e] p-8 border border-[#f5f3ee]/10 hover:border-[#8ea989]/50 transition-all duration-300 animate-fade-in" style={{ animationDelay: '700ms' }}>
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
              <div className="relative animate-slide-up" style={{ animationDelay: '400ms' }}>
                <div className="aspect-square bg-gradient-to-br from-[#8ea989] to-[#c8e5c0] flex items-center justify-center relative overflow-hidden group">
                  <div 
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url('data:image/svg+xml,<svg width="50" height="50" xmlns="http://www.w3.org/2000/svg"><rect width="50" height="50" fill="none" stroke="rgba(10,14,13,0.1)" stroke-width="1"/></svg>')`
                    }}
                  ></div>
                  <img 
                    src="/bike.webp"
                    alt={vehicle.name}
                    className="w-3/4 h-3/4 object-contain transform transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3"
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
          <div className="text-center mb-12 animate-fade-in">
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

          {/* Filters Panel - Dropdown Style */}
          <div className="mb-10 space-y-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative group">
              <input
                type="text"
                placeholder="Search configurations..."
                value={filters.searchQuery}
                onChange={(e) => setFilters({...filters, searchQuery: e.target.value})}
                className="w-full px-6 py-4 bg-[#1a1f1e] border-2 border-[#f5f3ee]/10 text-[#f5f3ee] placeholder-[#f5f3ee]/40 focus:border-[#8ea989] focus:outline-none transition-all text-lg group-hover:border-[#f5f3ee]/20"
              />
              <span className="absolute right-6 top-1/2 transform -translate-y-1/2 text-[#f5f3ee]/40">🔍</span>
            </div>

            {/* Filter Dropdowns */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Battery Type Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('batteryType')}
                  className="w-full px-6 py-4 bg-[#1a1f1e] border-2 border-[#f5f3ee]/10 hover:border-[#8ea989]/50 text-left flex justify-between items-center transition-all duration-300 group"
                >
                  <div>
                    <div className="text-xs uppercase tracking-widest text-[#8ea989] mb-1">Battery Type</div>
                    <div className="text-lg font-semibold">{getFilterLabel('batteryType')}</div>
                  </div>
                  <span className={`transform transition-transform duration-300 ${openDropdowns.batteryType ? 'rotate-180' : ''}`}>▼</span>
                </button>
                
                {/* Dropdown Menu */}
                <div 
                  className={`w-full mt-2 bg-[#1a1f1e] border-2 border-[#8ea989]/30 overflow-hidden transition-all duration-300 ${
                    openDropdowns.batteryType ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  {["ALL", "GEL", "LITHIUM"].map((type, idx) => (
                    <button
                      key={type}
                      onClick={() => {
                        setFilters({...filters, batteryType: type});
                        toggleDropdown('batteryType');
                      }}
                      className={`w-full px-6 py-3 text-left transition-all duration-200 hover:bg-[#8ea989] hover:text-[#0a0e0d] ${
                        filters.batteryType === type ? "bg-[#8ea989] text-[#0a0e0d] font-semibold" : "text-[#f5f3ee]"
                      }`}
                    >
                      {type === "ALL" ? "All Battery Types" : type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Voltage Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('voltage')}
                  className="w-full px-6 py-4 bg-[#1a1f1e] border-2 border-[#f5f3ee]/10 hover:border-[#8ea989]/50 text-left flex justify-between items-center transition-all duration-300"
                >
                  <div>
                    <div className="text-xs uppercase tracking-widest text-[#8ea989] mb-1">Voltage</div>
                    <div className="text-lg font-semibold">{getFilterLabel('voltage')}</div>
                  </div>
                  <span className={`transform transition-transform duration-300 ${openDropdowns.voltage ? 'rotate-180' : ''}`}>▼</span>
                </button>
                
                <div 
                  className={`w-full mt-2 bg-[#1a1f1e] border-2 border-[#8ea989]/30 overflow-hidden transition-all duration-300 ${
                    openDropdowns.voltage ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <button
                    onClick={() => {
                      setFilters({...filters, voltage: "ALL"});
                      toggleDropdown('voltage');
                    }}
                    className={`w-full px-6 py-3 text-left transition-all duration-200 hover:bg-[#8ea989] hover:text-[#0a0e0d] ${
                      filters.voltage === "ALL" ? "bg-[#8ea989] text-[#0a0e0d] font-semibold" : "text-[#f5f3ee]"
                    }`}
                  >
                    All Voltages
                  </button>
                  {filterOptions.voltages.map((v) => (
                    <button
                      key={v}
                      onClick={() => {
                        setFilters({...filters, voltage: v.toString()});
                        toggleDropdown('voltage');
                      }}
                      className={`w-full px-6 py-3 text-left transition-all duration-200 hover:bg-[#8ea989] hover:text-[#0a0e0d] ${
                        filters.voltage === v.toString() ? "bg-[#8ea989] text-[#0a0e0d] font-semibold" : "text-[#f5f3ee]"
                      }`}
                    >
                      {v}V
                    </button>
                  ))}
                </div>
              </div>

              {/* Capacity Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('capacity')}
                  className="w-full px-6 py-4 bg-[#1a1f1e] border-2 border-[#f5f3ee]/10 hover:border-[#8ea989]/50 text-left flex justify-between items-center transition-all duration-300"
                >
                  <div>
                    <div className="text-xs uppercase tracking-widest text-[#8ea989] mb-1">Capacity</div>
                    <div className="text-lg font-semibold">{getFilterLabel('capacity')}</div>
                  </div>
                  <span className={`transform transition-transform duration-300 ${openDropdowns.capacity ? 'rotate-180' : ''}`}>▼</span>
                </button>
                
                <div 
                  className={`w-full mt-2 bg-[#1a1f1e] border-2 border-[#8ea989]/30 overflow-hidden transition-all duration-300 ${
                    openDropdowns.capacity ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <button
                    onClick={() => {
                      setFilters({...filters, capacity: "ALL"});
                      toggleDropdown('capacity');
                    }}
                    className={`w-full px-6 py-3 text-left transition-all duration-200 hover:bg-[#8ea989] hover:text-[#0a0e0d] ${
                      filters.capacity === "ALL" ? "bg-[#8ea989] text-[#0a0e0d] font-semibold" : "text-[#f5f3ee]"
                    }`}
                  >
                    All Capacities
                  </button>
                  {filterOptions.capacities.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setFilters({...filters, capacity: c.toString()});
                        toggleDropdown('capacity');
                      }}
                      className={`w-full px-6 py-3 text-left transition-all duration-200 hover:bg-[#8ea989] hover:text-[#0a0e0d] ${
                        filters.capacity === c.toString() ? "bg-[#8ea989] text-[#0a0e0d] font-semibold" : "text-[#f5f3ee]"
                      }`}
                    >
                      {c}Ah
                    </button>
                  ))}
                </div>
              </div>

              {/* Range Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('range')}
                  className="w-full px-6 py-4 bg-[#1a1f1e] border-2 border-[#f5f3ee]/10 hover:border-[#8ea989]/50 text-left flex justify-between items-center transition-all duration-300"
                >
                  <div>
                    <div className="text-xs uppercase tracking-widest text-[#8ea989] mb-1">Range</div>
                    <div className="text-lg font-semibold">{getFilterLabel('range')}</div>
                  </div>
                  <span className={`transform transition-transform duration-300 ${openDropdowns.range ? 'rotate-180' : ''}`}>▼</span>
                </button>
                
                <div 
                  className={`w-full mt-2 bg-[#1a1f1e] border-2 border-[#8ea989]/30 overflow-hidden transition-all duration-300 ${
                    openDropdowns.range ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <button
                    onClick={() => {
                      setFilters({...filters, rangeKm: "ALL"});
                      toggleDropdown('range');
                    }}
                    className={`w-full px-6 py-3 text-left transition-all duration-200 hover:bg-[#8ea989] hover:text-[#0a0e0d] ${
                      filters.rangeKm === "ALL" ? "bg-[#8ea989] text-[#0a0e0d] font-semibold" : "text-[#f5f3ee]"
                    }`}
                  >
                    All Ranges
                  </button>
                  {filterOptions.ranges.map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        setFilters({...filters, rangeKm: r.toString()});
                        toggleDropdown('range');
                      }}
                      className={`w-full px-6 py-3 text-left transition-all duration-200 hover:bg-[#8ea989] hover:text-[#0a0e0d] ${
                        filters.rangeKm === r.toString() ? "bg-[#8ea989] text-[#0a0e0d] font-semibold" : "text-[#f5f3ee]"
                      }`}
                    >
                      {r} km
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Dropdown */}
              <div className="relative sm:col-span-2">
                <button
                  onClick={() => toggleDropdown('price')}
                  className="w-full px-6 py-4 bg-[#1a1f1e] border-2 border-[#f5f3ee]/10 hover:border-[#8ea989]/50 text-left flex justify-between items-center transition-all duration-300"
                >
                  <div>
                    <div className="text-xs uppercase tracking-widest text-[#8ea989] mb-1">Price Range</div>
                    <div className="text-lg font-semibold">{getFilterLabel('price')}</div>
                  </div>
                  <span className={`transform transition-transform duration-300 ${openDropdowns.price ? 'rotate-180' : ''}`}>▼</span>
                </button>
                
                <div 
                  className={`w-full mt-2 bg-[#1a1f1e] border-2 border-[#8ea989]/30 p-6 overflow-hidden transition-all duration-300 ${
                    openDropdowns.price ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>₹{filters.priceRange[0].toLocaleString()}</span>
                      <span>₹{filters.priceRange[1].toLocaleString()}</span>
                    </div>
                    <div className="space-y-3">
                      <input
                        type="range"
                        min={filterOptions.minPrice}
                        max={filterOptions.maxPrice}
                        value={filters.priceRange[0]}
                        onChange={(e) => setFilters({
                          ...filters, 
                          priceRange: [parseInt(e.target.value), filters.priceRange[1]]
                        })}
                        className="w-full accent-[#8ea989]"
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
                        className="w-full accent-[#8ea989]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Filters & Reset */}
            {hasActiveFilters && (
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-6 bg-[#1a1f1e] border-2 border-[#8ea989]/30 animate-slide-down">
                <div className="flex items-center gap-4">
                  <span className="text-lg font-semibold text-[#8ea989]">
                    {filteredConfigs.length} configuration{filteredConfigs.length !== 1 ? 's' : ''} found
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {filters.batteryType !== "ALL" && (
                      <span className="px-3 py-1 bg-[#8ea989]/20 text-[#8ea989] text-xs rounded-full">
                        {filters.batteryType}
                      </span>
                    )}
                    {filters.voltage !== "ALL" && (
                      <span className="px-3 py-1 bg-[#8ea989]/20 text-[#8ea989] text-xs rounded-full">
                        {filters.voltage}V
                      </span>
                    )}
                    {filters.capacity !== "ALL" && (
                      <span className="px-3 py-1 bg-[#8ea989]/20 text-[#8ea989] text-xs rounded-full">
                        {filters.capacity}Ah
                      </span>
                    )}
                    {filters.rangeKm !== "ALL" && (
                      <span className="px-3 py-1 bg-[#8ea989]/20 text-[#8ea989] text-xs rounded-full">
                        {filters.rangeKm}km
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={resetFilters}
                  className="px-8 py-3 text-sm bg-transparent border-2 border-[#8ea989] text-[#8ea989] hover:bg-[#8ea989] hover:text-[#0a0e0d] transition-all uppercase tracking-widest font-semibold"
                >
                  Reset All
                </button>
              </div>
            )}
          </div>

          {/* Configuration Cards */}
          {filteredConfigs.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredConfigs.map((config, idx) => (
                <div
                  key={config.id}
                  onClick={() => setSelectedConfig(config)}
                  className={`bg-[#1a1f1e] p-8 cursor-pointer transition-all duration-500 border-2 animate-fade-in hover:shadow-2xl ${
                    selectedConfig?.id === config.id
                      ? "border-[#8ea989] transform scale-[1.02] shadow-[#8ea989]/20"
                      : "border-[#f5f3ee]/10 hover:border-[#8ea989]/50 hover:transform hover:scale-[1.01]"
                  }`}
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {/* Battery Type Badge */}
                  <div className="flex justify-between items-start mb-6">
                    <span className={`text-xs px-4 py-1.5 font-semibold uppercase tracking-widest transition-all duration-300 ${
                      config.batteryType === "LITHIUM" 
                        ? "bg-[#c8e5c0]/20 text-[#c8e5c0]" 
                        : "bg-[#8ea989]/20 text-[#8ea989]"
                    }`}>
                      {config.batteryType}
                    </span>
                    {selectedConfig?.id === config.id && (
                      <span className="text-[#8ea989] text-2xl animate-scale-in">✓</span>
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
            <div className="text-center py-20 animate-fade-in">
              <div className="text-6xl mb-6">🔍</div>
              <p className="text-2xl text-[#f5f3ee]/60 mb-6">No configurations match your filters</p>
              <button
                onClick={resetFilters}
                className="px-8 py-4 bg-[#8ea989] text-[#0a0e0d] font-semibold hover:bg-[#c8e5c0] transition-all transform hover:scale-105"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Selected Config Actions */}
          {selectedConfig && filteredConfigs.length > 0 && (
            <div className="mt-12 bg-[#1a1f1e] p-8 md:p-12 border-2 border-[#8ea989] animate-slide-up">
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
                    className="flex-1 px-8 py-4 bg-[#8ea989] text-[#0a0e0d] font-semibold hover:bg-[#c8e5c0] transition-all text-center transform hover:scale-105"
                  >
                    Calculate EMI
                  </button>
                  <button 
                    onClick={handleViewAllModels}
                    className="flex-1 px-8 py-4 bg-transparent border-2 border-[#8ea989] text-[#8ea989] font-semibold hover:bg-[#8ea989] hover:text-[#0a0e0d] transition-all transform hover:scale-105"
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
              className="text-3xl md:text-4xl font-bold mb-8 text-center animate-fade-in"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Warranty Coverage
            </h3>
            
            {vehicle.warrantyNote && (
              <div className="bg-[#8ea989]/10 border border-[#8ea989]/30 p-6 mb-8 text-center animate-slide-down">
                <p className="text-[#8ea989]">{vehicle.warrantyNote}</p>
              </div>
            )}

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(selectedConfig.warranty).map(([key, value], idx) => (
                <div 
                  key={key} 
                  className="bg-[#1a1f1e] p-8 text-center border border-[#f5f3ee]/10 hover:border-[#8ea989]/50 transition-all duration-300 hover:transform hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
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
            className="text-3xl md:text-4xl font-bold mb-12 text-center animate-fade-in"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Explore Other Models
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherVehicles.map((otherVehicle, idx) => {
              const startingPrice = Math.min(...otherVehicle.configurations.map(c => c.price));
              
              return (
                <div
                  key={otherVehicle.id}
                  onClick={() => onNavigate('vehicle-details', otherVehicle.id)}
                  className="bg-[#1a1f1e] cursor-pointer transition-all duration-500 hover:translate-y-[-12px] hover:shadow-2xl animate-fade-in group"
                  style={{ animationDelay: `${idx * 150}ms` }}
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
                      className="w-2/3 h-2/3 object-contain transition-all duration-700 group-hover:scale-110 group-hover:rotate-6"
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
                      <span className="text-[#8ea989] text-xl transform group-hover:translate-x-2 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from { 
            opacity: 0;
            transform: translateY(-20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slideUp 0.6s ease-out forwards;
        }
        
        .animate-slide-down {
          animation: slideDown 0.4s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}