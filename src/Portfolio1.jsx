import React, { useState, useEffect } from "react";
import {
  Calculator,
  ArrowRight,
  Check,
  TrendingUp,
  Zap,
  Shield,
  Award,
  Battery,
  Gauge,
  Clock,
} from "lucide-react";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CyberModels from "./components/VehicleCard";
import Grainient from "./Grainient";

// Products Data - Easily Scalable
const productsData = [
  {
    id: 1,
    name: "Zelio Urban",
    tagline: "Perfect for city commute",
    price: 65000,
    image: "🛵",
    specs: {
      range: "80",
      topSpeed: "45",
      battery: "2.3",
      charging: "4-5",
    },
    colors: ["#FFFFFF", "#000000", "#4A90E2"],
    variants: ["Standard", "Pro"],
    features: ["Smart Display", "Anti-theft", "USB Charging"],
  },
  {
    id: 2,
    name: "Zelio Sport",
    tagline: "Power meets style",
    price: 85000,
    image: "🏍️",
    specs: {
      range: "100",
      topSpeed: "60",
      battery: "3.2",
      charging: "5-6",
    },
    colors: ["#E63946", "#C0C0C0", "#000000"],
    variants: ["Standard", "Pro", "Elite"],
    features: ["Sport Mode", "LED Lights", "Digital Console", "Cruise Control"],
  },
  {
    id: 3,
    name: "Zelio Cargo",
    tagline: "Built for business",
    price: 95000,
    image: "🚚",
    specs: {
      range: "90",
      topSpeed: "40",
      battery: "3.5",
      charging: "6-7",
    },
    colors: ["#808080", "#FDB813", "#FFFFFF"],
    variants: ["Standard", "Heavy Duty"],
    features: ["Large Cargo Space", "Reinforced Frame", "Commercial GPS"],
  },
  {
    id: 4,
    name: "Zelio Classic",
    tagline: "Timeless elegance",
    price: 55000,
    image: "🛴",
    specs: {
      range: "70",
      topSpeed: "40",
      battery: "2.0",
      charging: "3-4",
    },
    colors: ["#F5E6D3", "#8B4513", "#2D5016"],
    variants: ["Standard"],
    features: ["Retro Design", "Comfort Seat", "Easy Maintenance"],
  },
  {
    id: 5,
    name: "Zelio Pro Max",
    tagline: "Ultimate performance",
    price: 125000,
    image: "⚡",
    specs: {
      range: "150",
      topSpeed: "75",
      battery: "4.8",
      charging: "7-8",
    },
    colors: ["#000000", "#E63946", "#4A90E2", "#C0C0C0"],
    variants: ["Pro", "Elite"],
    features: [
      "Fast Charging",
      "Premium Suspension",
      "Smart Connectivity",
      "Advanced Safety",
    ],
  },
];

export default function ZelioWebsite() {
  const [scrollY, setScrollY] = useState(0);
  const [calculatorData, setCalculatorData] = useState({
    model: "",
    downPayment: "",
    tenure: "",
    interestRate: "10.5",
  });
  const [emiResult, setEmiResult] = useState(null);
  const [isCalculatorVisible, setIsCalculatorVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Check if calculator section is in view
      const calculatorSection = document.getElementById('calculator');
      if (calculatorSection) {
        const rect = calculatorSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.75 && rect.bottom > 0;
        setIsCalculatorVisible(isVisible);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    
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
    <div className="relative text-white min-h-screen overflow-x-hidden">
      {/* Grainient Background */}
      <div className="fixed inset-0 z-0">
        <Grainient
          color1="#051406"
          color2="#01510a"
          color3="#1b8d28"
          timeSpeed={0.25}
          colorBalance={-0.1}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={1.4}
          warpAmplitude={45}
          blendAngle={59}
          blendSoftness={0.14}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.95}
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Instant Power",
                description: "Zero emissions, maximum performance",
                color: "from-yellow-500 to-orange-500"
              },
              {
                icon: Shield,
                title: "Industry Leading Warranty",
                description: "Up to 4 years comprehensive coverage",
                color: "from-cyan-500 to-blue-500"
              },
              {
                icon: Award,
                title: "Award Winning Design",
                description: "Recognized for innovation and excellence",
                color: "from-purple-500 to-pink-500"
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-yellow-500/50 transition-all duration-500 hover:scale-105"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500"
                     style={{ backgroundImage: `linear-gradient(135deg, ${feature.color.split(' ')[1]}, ${feature.color.split(' ')[3]})` }}></div>
                
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-3 orbitron">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Models Section */}
      <CyberModels setCalculatorData={setCalculatorData} />

      {/* Calculator Section */}
      <section
        id="calculator"
        className="relative py-32 px-6 overflow-hidden"
      >
        {/* Animated Background Grid */}
        <div className="absolute inset-0 cyber-grid opacity-10"></div>
        
        {/* Gradient Overlays */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isCalculatorVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 mb-6">
              <Calculator className="w-5 h-5 text-yellow-500" />
              <span className="text-sm text-yellow-500 font-bold orbitron tracking-wider">
                FINANCE CALCULATOR
              </span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black orbitron mb-6">
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
                Calculate Your EMI
              </span>
            </h2>
            
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Find the perfect payment plan for your dream electric scooter with our smart calculator
            </p>
          </div>

          {/* Calculator Card */}
          <div className={`relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl transition-all duration-1000 delay-200 ${isCalculatorVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-yellow-500/50 rounded-tl-3xl"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-yellow-500/50 rounded-br-3xl"></div>

            <form onSubmit={calculateEMI} className="space-y-8">
              {/* Model Selection */}
              <div className="space-y-3 group">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-300 orbitron tracking-wide">
                  <Battery className="w-4 h-4 text-yellow-500" />
                  SELECT YOUR MODEL
                </label>
                <div className="relative">
                  <select
                    value={calculatorData.model}
                    onChange={(e) =>
                      setCalculatorData({
                        ...calculatorData,
                        model: e.target.value,
                      })
                    }
                    required
                    className="w-full px-6 py-5 bg-white/5 border-2 border-white/10 rounded-2xl text-white text-lg focus:outline-none focus:border-yellow-500/70 focus:bg-white/10 transition-all duration-300 appearance-none cursor-pointer hover:border-yellow-500/30"
                  >
                    <option value="" className="bg-slate-900">
                      Choose your electric scooter
                    </option>
                    {productsData.map((product) => (
                      <option
                        key={product.id}
                        value={product.price}
                        className="bg-slate-900 py-2"
                      >
                        {product.name} - ₹{product.price.toLocaleString()}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ArrowRight className="w-5 h-5 text-gray-400 rotate-90" />
                  </div>
                </div>
              </div>

              {/* Down Payment */}
              <div className="space-y-3 group">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-300 orbitron tracking-wide">
                  <TrendingUp className="w-4 h-4 text-yellow-500" />
                  DOWN PAYMENT (₹)
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
                  className="w-full px-6 py-5 bg-white/5 border-2 border-white/10 rounded-2xl text-white text-lg placeholder-gray-500 focus:outline-none focus:border-yellow-500/70 focus:bg-white/10 transition-all duration-300"
                />
              </div>

              {/* Grid for Tenure and Interest */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tenure */}
                <div className="space-y-3 group">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-300 orbitron tracking-wide">
                    <Clock className="w-4 h-4 text-yellow-500" />
                    LOAN TENURE
                  </label>
                  <div className="relative">
                    <select
                      value={calculatorData.tenure}
                      onChange={(e) =>
                        setCalculatorData({
                          ...calculatorData,
                          tenure: e.target.value,
                        })
                      }
                      required
                      className="w-full px-6 py-5 bg-white/5 border-2 border-white/10 rounded-2xl text-white text-lg focus:outline-none focus:border-yellow-500/70 focus:bg-white/10 transition-all duration-300 appearance-none cursor-pointer hover:border-yellow-500/30"
                    >
                      <option value="" className="bg-slate-900">
                        Select tenure
                      </option>
                      <option value="12" className="bg-slate-900">
                        12 Months
                      </option>
                      <option value="24" className="bg-slate-900">
                        24 Months
                      </option>
                      <option value="36" className="bg-slate-900">
                        36 Months
                      </option>
                      <option value="48" className="bg-slate-900">
                        48 Months
                      </option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                      <ArrowRight className="w-5 h-5 text-gray-400 rotate-90" />
                    </div>
                  </div>
                </div>

                {/* Interest Rate */}
                <div className="space-y-3 group">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-300 orbitron tracking-wide">
                    <Gauge className="w-4 h-4 text-yellow-500" />
                    INTEREST RATE (% P.A.)
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
                    className="w-full px-6 py-5 bg-white/5 border-2 border-white/10 rounded-2xl text-white text-lg placeholder-gray-500 focus:outline-none focus:border-yellow-500/70 focus:bg-white/10 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="group relative w-full py-6 bg-gradient-to-r from-yellow-500 via-yellow-600 to-orange-600 text-black font-black rounded-2xl text-lg orbitron overflow-hidden shadow-2xl shadow-yellow-500/20 hover:shadow-yellow-500/40 transition-all duration-300 hover:scale-[1.02]"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  CALCULATE YOUR EMI
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </form>

            {/* EMI Results */}
            {emiResult && (
              <div className="mt-12 space-y-6 animate-fade-up">
                {/* Divider */}
                <div className="relative h-px my-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    {
                      label: "Vehicle Price",
                      value: `₹${emiResult.vehiclePrice.toLocaleString()}`,
                      icon: Battery,
                    },
                    {
                      label: "Down Payment",
                      value: `₹${emiResult.downPayment.toLocaleString()}`,
                      icon: TrendingUp,
                    },
                    {
                      label: "Loan Amount",
                      value: `₹${emiResult.loanAmount.toLocaleString()}`,
                      icon: Calculator,
                    },
                    {
                      label: "Total Interest",
                      value: `₹${Math.round(emiResult.totalInterest).toLocaleString()}`,
                      icon: Gauge,
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-5 border border-white/10 hover:border-yellow-500/30 transition-all duration-300 group"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="text-xs text-gray-400 font-semibold orbitron">
                          {item.label}
                        </div>
                        <item.icon className="w-4 h-4 text-yellow-500/50 group-hover:text-yellow-500 transition-colors" />
                      </div>
                      <div className="text-2xl font-black orbitron bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Monthly EMI Highlight */}
                <div className="relative bg-gradient-to-br from-yellow-500/20 via-orange-500/20 to-yellow-500/20 rounded-3xl p-8 border-2 border-yellow-500/50 overflow-hidden group">
                  {/* Animated background effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/10 to-yellow-500/0 group-hover:animate-pulse"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Check className="w-5 h-5 text-yellow-500" />
                      <div className="text-sm text-gray-300 font-bold orbitron tracking-wider">
                        YOUR MONTHLY PAYMENT
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-6xl md:text-7xl font-black orbitron mb-2">
                        <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
                          ₹{Math.round(emiResult.monthlyEMI).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-400 flex items-center justify-center gap-2">
                        <Clock className="w-4 h-4" />
                        for {emiResult.tenure} months
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-6 border border-cyan-500/20">
                  <p className="text-sm text-gray-300 text-center leading-relaxed">
                    <span className="text-cyan-400 font-semibold">💡 Pro Tip:</span> Lower down payment means higher EMI. Adjust your down payment to find the perfect monthly budget for you.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950 pointer-events-none"></div>
        <Contact />
      </div>
      
      <Footer />
      </div>
    </div>
  );
}