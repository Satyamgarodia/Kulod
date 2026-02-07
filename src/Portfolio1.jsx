import React, { useState, useEffect, useRef } from "react";
import {
  Zap,
  Menu,
  X,
  ChevronDown,
  Gauge,
  Battery,
  Clock,
  MapPin,
  Phone,
  Mail,
  Building2,
  ArrowRight,
  Calculator,
  Star,
  Bike,
  ChevronRight,
  Play,
  Check,
  Globe,
  Shield,
  Award,
  TrendingUp,
  Users,
  Target,
  Sparkles,
} from "lucide-react";
import Footer from "./components/Footer";
import Contact from "./components/Contact";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [calculatorData, setCalculatorData] = useState({
    model: "",
    downPayment: "",
    tenure: "",
    interestRate: "10.5",
  });
  const [emiResult, setEmiResult] = useState(null);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
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
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white min-h-screen overflow-x-hidden">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrollY > 50
            ? "bg-slate-900/95 backdrop-blur-lg shadow-lg shadow-yellow-500/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3 orbitron">
              <div className="relative">
                <Zap
                  className="w-10 h-10 text-yellow-500 energy-pulse"
                  fill="#FDB813"
                />
              </div>
              <span className="text-2xl md:text-3xl font-bold text-gradient tracking-wider">
                ZELIO
              </span>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center gap-8">
              {["Home", "Models", "Calculator", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="relative text-gray-300 hover:text-yellow-500 transition-colors font-medium group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-yellow-500 hover:text-yellow-400 transition-colors"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-6 py-6 border-t border-yellow-500/20 fade-in-up">
              <ul className="flex flex-col gap-4">
                {["Home", "Models", "Calculator", "Contact"].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-gray-300 hover:text-yellow-500 transition-colors font-medium text-lg"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden cyber-grid"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          {/* Main Title */}
          <div className="mb-8 fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/30 mb-6">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-yellow-500 font-semibold orbitron">
                Next Generation Mobility
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black orbitron mb-6 leading-tight">
              <span className="text-gradient block">FUTURE IS</span>
              <span className="text-white block mt-2">ELECTRIC</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              Experience the revolution of electric mobility with cutting-edge
              technology, sustainable power, and unmatched performance.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#models"
                className="btn-futuristic group px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-full flex items-center gap-2 hover:scale-105 transition-transform glow-yellow"
              >
                Explore Models
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#calculator"
                className="btn-futuristic group px-8 py-4 bg-white/5 backdrop-blur-sm border border-yellow-500/30 text-white font-bold rounded-full flex items-center gap-2 hover:bg-white/10 transition-all"
              >
                <Calculator className="w-5 h-5" />
                Calculate EMI
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 slide-in-left">
            {[
              { icon: Bike, label: "5+ Models", value: "Premium Range" },
              { icon: Battery, label: "150 km", value: "Max Range" },
              { icon: Gauge, label: "75 km/h", value: "Top Speed" },
              { icon: Award, label: "100%", value: "Electric" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="holographic rounded-2xl p-6 relative overflow-hidden card-tilt"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <stat.icon className="w-8 h-8 text-yellow-500 mb-3 mx-auto" />
                <div className="text-2xl font-bold orbitron text-white mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-400">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-yellow-500 text-sm orbitron">
            Scroll to explore
          </span>
          <ChevronDown className="w-6 h-6 text-yellow-500" />
        </div>
      </section>

      {/* Products Section */}
      <section
        id="models"
        className="relative py-24 px-6 bg-gradient-to-b from-slate-950 to-slate-900"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-4">
              <Star className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-purple-500 font-semibold orbitron">
                Our Fleet
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black orbitron text-gradient mb-4">
              ELECTRIC MODELS
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Choose from our range of futuristic electric scooters designed for
              every lifestyle
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productsData.map((product, idx) => (
              <div
                key={product.id}
                className="holographic rounded-3xl p-6 relative overflow-hidden group cursor-pointer card-tilt scan-line"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Product Image */}
                <div className="relative mb-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 h-48 flex items-center justify-center overflow-hidden">
                  <div className="text-8xl float-animation group-hover:scale-110 transition-transform duration-500">
                    {product.image}
                  </div>
                  {/* Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-500/20 backdrop-blur-sm rounded-full border border-yellow-500/30">
                    <span className="text-xs font-bold text-yellow-500 orbitron">
                      NEW
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold orbitron text-white mb-1 group-hover:text-yellow-500 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-400">{product.tagline}</p>
                  </div>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                      <div className="flex items-center gap-2 mb-1">
                        <Gauge className="w-4 h-4 text-yellow-500" />
                        <span className="text-xs text-gray-400">Range</span>
                      </div>
                      <div className="text-lg font-bold orbitron">
                        {product.specs.range} km
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                      <div className="flex items-center gap-2 mb-1">
                        <Zap className="w-4 h-4 text-purple-500" />
                        <span className="text-xs text-gray-400">Speed</span>
                      </div>
                      <div className="text-lg font-bold orbitron">
                        {product.specs.topSpeed} km/h
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                      <div className="flex items-center gap-2 mb-1">
                        <Battery className="w-4 h-4 text-green-500" />
                        <span className="text-xs text-gray-400">Battery</span>
                      </div>
                      <div className="text-lg font-bold orbitron">
                        {product.specs.battery} kWh
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-cyan-500" />
                        <span className="text-xs text-gray-400">Charge</span>
                      </div>
                      <div className="text-lg font-bold orbitron">
                        {product.specs.charging}h
                      </div>
                    </div>
                  </div>

                  {/* Color Options */}
                  <div>
                    <div className="text-xs text-gray-400 mb-2">
                      Available Colors
                    </div>
                    <div className="flex gap-2">
                      {product.colors.map((color, cidx) => (
                        <div
                          key={cidx}
                          className="w-8 h-8 rounded-full border-2 border-white/20 cursor-pointer hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                        ></div>
                      ))}
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-xs text-gray-400">Starting at</div>
                        <div className="text-3xl font-black orbitron text-gradient">
                          ₹{(product.price / 1000).toFixed(0)}K
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-400">
                          {product.variants.length} Variants
                        </div>
                        <div className="text-sm text-yellow-500 font-semibold">
                          {product.variants.join(", ")}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setCalculatorData({
                          ...calculatorData,
                          model: product.price.toString(),
                        });
                        document
                          .getElementById("calculator")
                          .scrollIntoView({ behavior: "smooth" });
                      }}
                      className="w-full btn-futuristic py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                    >
                      Calculate EMI
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section
        id="calculator"
        className="relative py-24 px-6 bg-slate-950 cyber-grid"
      >
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-4">
              <Calculator className="w-4 h-4 text-cyan-500" />
              <span className="text-sm text-cyan-500 font-semibold orbitron">
                Finance
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black orbitron text-gradient mb-4">
              EMI CALCULATOR
            </h2>
            <p className="text-xl text-gray-400">
              Calculate your monthly payment and own your dream electric scooter
            </p>
          </div>

          {/* Calculator Card */}
          <div className="holographic rounded-3xl p-8 md:p-12 neon-border">
            <form onSubmit={calculateEMI} className="space-y-6">
              {/* Model Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-300 orbitron">
                  Select Model
                </label>
                <select
                  value={calculatorData.model}
                  onChange={(e) =>
                    setCalculatorData({
                      ...calculatorData,
                      model: e.target.value,
                    })
                  }
                  required
                  className="w-full px-6 py-4 bg-white/5 border border-yellow-500/30 rounded-xl text-white focus:outline-none focus:border-yellow-500 transition-colors"
                >
                  <option value="" className="bg-slate-900">
                    Choose a model
                  </option>
                  {productsData.map((product) => (
                    <option
                      key={product.id}
                      value={product.price}
                      className="bg-slate-900"
                    >
                      {product.name} - ₹{product.price.toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>

              {/* Down Payment */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-300 orbitron">
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
                  className="w-full px-6 py-4 bg-white/5 border border-yellow-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                />
              </div>

              {/* Loan Tenure */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-300 orbitron">
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
                  className="w-full px-6 py-4 bg-white/5 border border-yellow-500/30 rounded-xl text-white focus:outline-none focus:border-yellow-500 transition-colors"
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
              </div>

              {/* Interest Rate */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-300 orbitron">
                  Interest Rate (% per annum)
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
                  className="w-full px-6 py-4 bg-white/5 border border-yellow-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                />
              </div>

              {/* Calculate Button */}
              <button
                type="submit"
                className="w-full btn-futuristic py-5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-xl text-lg orbitron hover:scale-105 transition-transform glow-yellow"
              >
                CALCULATE EMI
              </button>
            </form>

            {/* Results */}
            {emiResult && (
              <div className="mt-10 space-y-4 scale-in">
                <div className="h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent mb-8"></div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      label: "Vehicle Price",
                      value: `₹${emiResult.vehiclePrice.toLocaleString()}`,
                    },
                    {
                      label: "Down Payment",
                      value: `₹${emiResult.downPayment.toLocaleString()}`,
                    },
                    {
                      label: "Loan Amount",
                      value: `₹${emiResult.loanAmount.toLocaleString()}`,
                    },
                    {
                      label: "Total Interest",
                      value: `₹${Math.round(emiResult.totalInterest).toLocaleString()}`,
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white/5 rounded-xl p-4 border border-white/10"
                    >
                      <div className="text-xs text-gray-400 mb-1">
                        {item.label}
                      </div>
                      <div className="text-xl font-bold orbitron text-white">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Monthly EMI - Highlighted */}
                <div className="bg-gradient-to-r from-yellow-500/20 to-purple-500/20 rounded-2xl p-6 border-2 border-yellow-500/50 glow-yellow">
                  <div className="text-center">
                    <div className="text-sm text-gray-300 mb-2 orbitron">
                      MONTHLY EMI
                    </div>
                    <div className="text-5xl font-black orbitron text-gradient">
                      ₹{Math.round(emiResult.monthlyEMI).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400 mt-2">
                      for {emiResult.tenure} months
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <div className="my-1">
        <Contact />
      </div>
      <Footer />
    </div>
  );
}
