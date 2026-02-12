import React, { useState, useEffect } from "react";
import { vehicles } from "../vehicles";
import {
  Battery,
  Gauge,
  Clock,
  Zap,
  Check,
  ArrowRight,
  Shield,
  Award,
  TrendingUp,
} from "lucide-react";

export default function CyberModels({ setCalculatorData }) {
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0]);
  const [selectedConfig, setSelectedConfig] = useState(
    vehicles[0].configurations[0]
  );
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

  const scrollToCalculator = () => {
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

  return (
    <section
      id="models"
      className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/30 mb-6">
            <Zap className="w-5 h-5 text-purple-500" />
            <span className="text-sm text-purple-500 font-bold orbitron tracking-wider">
              OUR FLEET
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black orbitron mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
              Choose Your Ride
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover our range of cutting-edge electric scooters designed for every journey
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Vehicle Display */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            {/* Vehicle Card */}
            <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl overflow-hidden group">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-yellow-500/20 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

              {/* Vehicle Image */}
              <div className="relative mb-8">
                <div className="text-9xl text-center filter drop-shadow-2xl group-hover:scale-110 transition-transform duration-500">
                  {selectedVehicle.baseImage}
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 justify-center mt-6">
                  {selectedVehicle.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full text-xs font-bold text-yellow-500 orbitron"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Vehicle Info */}
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-4xl font-black orbitron mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {selectedVehicle.name}
                  </h3>
                  <p className="text-gray-400">{selectedVehicle.brand}</p>
                </div>

                {/* Quick Specs */}
                <div className="grid grid-cols-2 gap-4 pt-6">
                  {[
                    {
                      icon: Gauge,
                      label: "Tyre Size",
                      value: selectedVehicle.tyreSize,
                    },
                    {
                      icon: TrendingUp,
                      label: "Load Capacity",
                      value: `${selectedVehicle.loadCapacity}kg`,
                    },
                  ].map((spec, idx) => (
                    <div
                      key={idx}
                      className="bg-white/5 rounded-2xl p-4 border border-white/10"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <spec.icon className="w-4 h-4 text-yellow-500" />
                        <span className="text-xs text-gray-400 font-semibold">
                          {spec.label}
                        </span>
                      </div>
                      <div className="text-xl font-bold orbitron text-white">
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Configuration Selector */}
          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <h4 className="text-2xl font-bold orbitron mb-6 flex items-center gap-2">
                <Battery className="w-6 h-6 text-yellow-500" />
                Select Configuration
              </h4>

              {/* Configuration Cards */}
              <div className="space-y-4 mb-8">
                {selectedVehicle.configurations.map((config) => (
                  <div
                    key={config.id}
                    onClick={() => setSelectedConfig(config)}
                    className={`relative cursor-pointer rounded-2xl p-6 border-2 transition-all duration-300 ${
                      selectedConfig.id === config.id
                        ? "bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500 shadow-lg shadow-yellow-500/20"
                        : "bg-white/5 border-white/10 hover:border-yellow-500/30 hover:bg-white/10"
                    }`}
                  >
                    {/* Selected Indicator */}
                    {selectedConfig.id === config.id && (
                      <div className="absolute top-4 right-4 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-black" />
                      </div>
                    )}

                    <div className="space-y-4">
                      {/* Battery Info */}
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-lg font-bold orbitron text-white mb-1">
                            {config.batteryType} {config.voltage}V {config.capacityAh}Ah
                          </div>
                          <div className="text-sm text-gray-400">
                            {config.batteryBrand} • {config.chemistry}
                          </div>
                        </div>
                      </div>

                      {/* Specs Grid */}
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { icon: Gauge, label: "Range", value: `${config.rangeKm}km` },
                          { icon: Clock, label: "Charge", value: config.chargingTime },
                          { icon: Shield, label: "Life", value: config.batteryLife },
                        ].map((spec, idx) => (
                          <div key={idx} className="text-center">
                            <spec.icon className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
                            <div className="text-xs text-gray-400 mb-1">{spec.label}</div>
                            <div className="text-sm font-bold text-white">{spec.value}</div>
                          </div>
                        ))}
                      </div>

                      {/* Price */}
                      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                        <div className="text-3xl font-black orbitron bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                          ₹{config.price.toLocaleString()}
                        </div>
                        {config.warranty.battery && (
                          <div className="flex items-center gap-1 text-xs text-cyan-400">
                            <Award className="w-4 h-4" />
                            {config.warranty.battery} Warranty
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                onClick={scrollToCalculator}
                className="group w-full py-5 bg-gradient-to-r from-yellow-500 to-orange-600 text-black font-black rounded-2xl text-lg orbitron hover:scale-105 transition-all duration-300 shadow-2xl shadow-yellow-500/30 hover:shadow-yellow-500/50 overflow-hidden relative"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Calculate EMI for This Model
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              {/* Additional Info */}
              <div className="mt-6 p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/20">
                <p className="text-sm text-gray-300 text-center">
                  <span className="text-cyan-400 font-semibold">💡 All prices</span> include on-road charges and registration
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
