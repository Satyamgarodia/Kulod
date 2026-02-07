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
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CyberModels from "./components/VehicleCard";

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
      <Navbar />

      <Hero />

      {/* Calculator Section */}
      <CyberModels setCalculatorData={setCalculatorData} />
      {/* <section
        id="calculator"
        className="relative py-24 px-6 bg-slate-950 cyber-grid"
      >
        <div className="max-w-4xl mx-auto">
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

          <div className="holographic rounded-3xl p-8 md:p-12 neon-border">
            <form onSubmit={calculateEMI} className="space-y-6">
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

              <button
                type="submit"
                className="w-full btn-futuristic py-5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-xl text-lg orbitron hover:scale-105 transition-transform glow-yellow"
              >
                CALCULATE EMI
              </button>
            </form>

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
      </section> */}

      {/* Contact Section */}
      <div className="my-1">
        <Contact />
      </div>
      <Footer />
    </div>
  );
}
