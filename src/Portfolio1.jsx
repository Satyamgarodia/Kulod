import React, { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import VehicleModels from "./components/VehicleCard";

export default function ZelioWebsite() {
  const [calculatorData, setCalculatorData] = useState({
    model: "",
    downPayment: "",
    tenure: "",
    interestRate: "10.5",
  });
  const [emiResult, setEmiResult] = useState(null);
  const [isCalculatorVisible, setIsCalculatorVisible] = useState(false);
  const [isFeaturesVisible, setIsFeaturesVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const calculatorSection = document.getElementById('calculator');
      if (calculatorSection) {
        const rect = calculatorSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.75 && rect.bottom > 0;
        setIsCalculatorVisible(isVisible);
      }

      const featuresSection = document.getElementById('features');
      if (featuresSection) {
        const rect = featuresSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.75 && rect.bottom > 0;
        setIsFeaturesVisible(isVisible);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const calculateEMI = (e) => {
    e.preventDefault();
    const vehiclePrice = parseFloat(calculatorData.model);
    const downPayment = parseFloat(calculatorData.downPayment);
    const tenure = parseInt(calculatorData.tenure);
    const interestRate = parseFloat(calculatorData.interestRate);

    if (downPayment >= vehiclePrice) {
      alert("Down payment must be less than vehicle price");
      return;
    }

    const loanAmount = vehiclePrice - downPayment;
    const monthlyRate = interestRate / 12 / 100;
    const emi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1);
    const totalAmount = emi * tenure;
    const totalInterest = totalAmount - loanAmount;

    setEmiResult({
      vehiclePrice,
      downPayment,
      loanAmount,
      totalInterest,
      monthlyEMI: emi,
      tenure,
    });
  };

  return (
    <div className="min-h-screen bg-[#f5f3ee] text-[#0a0e0d]">
      
      <Navbar />
      <Hero />
      <VehicleModels setCalculatorData={setCalculatorData} />

      {/* Features Section */}
      <section id="features" className="py-32 px-8 md:px-16 lg:px-24 bg-[#f5f3ee]">
        <div className="max-w-[1600px] mx-auto">
          
          {/* Header */}
          <div className={`text-center mb-24 transition-all duration-700 ${isFeaturesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div 
              className="text-sm tracking-widest uppercase mb-6 text-[#8ea989] font-semibold"
              style={{ letterSpacing: '0.15em' }}
            >
              Why Choose Zelio
            </div>
            <h2 
              className="font-bold text-[#0a0e0d] mb-8"
              style={{ 
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(2.5rem, 5vw, 5rem)',
                letterSpacing: '-0.02em'
              }}
            >
              Engineering Excellence
            </h2>
            <p className="text-xl text-[#6b7570] max-w-3xl mx-auto leading-relaxed">
              Every detail crafted for the perfect ride
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-20">
            {[
              {
                icon: "⚡",
                title: "Powerful Performance",
                description: "State-of-the-art motors delivering exceptional acceleration and top speeds for thrilling rides.",
              },
              {
                icon: "🔋",
                title: "Extended Range",
                description: "Advanced battery technology ensuring you reach your destination without range anxiety.",
              },
              {
                icon: "🛡️",
                title: "Premium Safety",
                description: "Industry-leading safety features with comprehensive warranty coverage for peace of mind.",
              },
              {
                icon: "🌿",
                title: "Eco-Friendly",
                description: "Zero emissions, sustainable materials, and renewable energy compatible charging systems.",
              },
              {
                icon: "📱",
                title: "Smart Technology",
                description: "Connected features, digital displays, and app integration for a seamless riding experience.",
              },
              {
                icon: "⚙️",
                title: "Low Maintenance",
                description: "Simplified mechanics and robust build quality mean fewer visits to the service center.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className={`text-center transition-all duration-700 ${isFeaturesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div 
                  className="w-24 h-24 hexagon bg-[#0a0e0d] text-[#f5f3ee] flex items-center justify-center text-5xl mx-auto mb-10"
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                  }}
                >
                  {feature.icon}
                </div>
                <h3 
                  className="text-3xl font-bold text-[#0a0e0d] mb-6"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {feature.title}
                </h3>
                <p className="text-[#6b7570] leading-[1.8] text-lg">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMI Calculator */}
      <section
        id="calculator"
        className={`py-32 px-8 md:px-16 lg:px-24 relative overflow-hidden transition-all duration-700 ${
          isCalculatorVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#8ea989] to-[#c8e5c0]"></div>
        <div className="absolute inset-0 dots-pattern"></div>

        <div className="max-w-[1000px] mx-auto relative z-10">
          
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-8 py-4 bg-[#0a0e0d] text-[#f5f3ee] text-xs uppercase tracking-widest font-semibold mb-8">
              Finance
            </div>
            <h2 
              className="font-bold text-[#0a0e0d] mb-8"
              style={{ 
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(2.5rem, 5vw, 5rem)'
              }}
            >
              EMI Calculator
            </h2>
            <p className="text-xl text-[#0a0e0d]/70 max-w-3xl mx-auto leading-relaxed">
              Plan your purchase with our easy EMI calculator
            </p>
          </div>

          {/* Calculator Form */}
          <div className="bg-[#f5f3ee] p-16 rounded-lg">
            <form onSubmit={calculateEMI} className="space-y-10">
              
              {/* Vehicle Price */}
              <div>
                <label className="block text-sm uppercase tracking-widest font-semibold text-[#0a0e0d] mb-3">
                  Vehicle Price (₹)
                </label>
                <input
                  type="number"
                  value={calculatorData.model}
                  onChange={(e) =>
                    setCalculatorData({
                      ...calculatorData,
                      model: e.target.value,
                    })
                  }
                  placeholder="Enter vehicle price"
                  min="0"
                  required
                  className="w-full px-5 py-5 border-2 border-[#0a0e0d] bg-transparent text-[#0a0e0d] text-lg placeholder-[#6b7570] focus:border-[#8ea989] focus:bg-[#8ea989]/5 transition-all"
                />
              </div>

              {/* Down Payment */}
              <div>
                <label className="block text-sm uppercase tracking-widest font-semibold text-[#0a0e0d] mb-3">
                  Down Payment (₹)
                </label>
                <input
                  type="number"
                  value={calculatorData.downPayment}
                  onChange={(e) =>
                    setCalculatorData({
                      ...calculatorData,
                      downPayment: e.target.value,
                    })
                  }
                  placeholder="Enter down payment amount"
                  min="0"
                  required
                  className="w-full px-5 py-5 border-2 border-[#0a0e0d] bg-transparent text-[#0a0e0d] text-lg placeholder-[#6b7570] focus:border-[#8ea989] focus:bg-[#8ea989]/5 transition-all"
                />
              </div>

              {/* Tenure & Interest */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm uppercase tracking-widest font-semibold text-[#0a0e0d] mb-3">
                    Loan Tenure
                  </label>
                  <select
                    value={calculatorData.tenure}
                    onChange={(e) =>
                      setCalculatorData({
                        ...calculatorData,
                        tenure: e.target.value,
                      })
                    }
                    required
                    className="w-full px-5 py-5 border-2 border-[#0a0e0d] bg-transparent text-[#0a0e0d] text-lg focus:border-[#8ea989] focus:bg-[#8ea989]/5 transition-all cursor-pointer"
                  >
                    <option value="">Select tenure</option>
                    <option value="12">12 Months</option>
                    <option value="24">24 Months</option>
                    <option value="36">36 Months</option>
                    <option value="48">48 Months</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm uppercase tracking-widest font-semibold text-[#0a0e0d] mb-3">
                    Interest Rate (% p.a.)
                  </label>
                  <input
                    type="number"
                    value={calculatorData.interestRate}
                    onChange={(e) =>
                      setCalculatorData({
                        ...calculatorData,
                        interestRate: e.target.value,
                      })
                    }
                    placeholder="Enter interest rate"
                    min="0"
                    max="30"
                    step="0.1"
                    required
                    className="w-full px-5 py-5 border-2 border-[#0a0e0d] bg-transparent text-[#0a0e0d] text-lg placeholder-[#6b7570] focus:border-[#8ea989] focus:bg-[#8ea989]/5 transition-all"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-6 bg-[#0a0e0d] text-[#f5f3ee] text-lg font-semibold uppercase tracking-wide hover:bg-[#1a1f1e] transition-all"
              >
                Calculate EMI
              </button>
            </form>

            {/* Results */}
            {emiResult && (
              <div className="mt-12 space-y-8 animate-fade-up">
                
                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#8ea989] to-transparent"></div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { label: "Vehicle Price", value: `₹${emiResult.vehiclePrice.toLocaleString()}` },
                    { label: "Down Payment", value: `₹${emiResult.downPayment.toLocaleString()}` },
                    { label: "Loan Amount", value: `₹${emiResult.loanAmount.toLocaleString()}` },
                    { label: "Total Interest", value: `₹${Math.round(emiResult.totalInterest).toLocaleString()}` },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="text-center p-6 bg-[#0a0e0d]/5"
                    >
                      <div className="text-xs uppercase tracking-widest text-[#6b7570] mb-3">
                        {item.label}
                      </div>
                      <div className="font-display text-2xl font-bold text-[#0a0e0d]">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Monthly EMI Highlight */}
                <div className="bg-[#0a0e0d] text-[#f5f3ee] p-12 text-center">
                  <div className="text-sm uppercase tracking-widest mb-4 opacity-70">
                    Your Monthly Payment
                  </div>
                  <div className="font-display text-6xl font-extrabold mb-2">
                    ₹{Math.round(emiResult.monthlyEMI).toLocaleString()}
                  </div>
                  <div className="opacity-70">
                    for {emiResult.tenure} months
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
    </div>
  );
}