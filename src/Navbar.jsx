import React, { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Models", href: "#models" },
    { name: "Calculator", href: "#calculator" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-slate-950/95 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-500/20 blur-xl group-hover:bg-yellow-500/30 transition-all rounded-full"></div>
              <div className="relative bg-gradient-to-br from-yellow-500 to-orange-600 p-2.5 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-6 h-6 text-black" />
              </div>
            </div>
            <span className="text-2xl font-black orbitron bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent group-hover:from-yellow-300 group-hover:to-orange-500 transition-all">
              ZELIO
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="relative px-6 py-2.5 text-sm font-semibold text-gray-300 hover:text-white transition-colors duration-300 group"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                <span className="relative z-10">{link.name}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/10 to-yellow-500/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 group-hover:w-full transition-all duration-300"></div>
              </a>
            ))}
            
            <a
              href="#calculator"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#calculator")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="ml-4 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-black font-bold rounded-xl text-sm orbitron hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/50 transition-all duration-300"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            mobileMenuOpen ? "max-h-96 mt-6" : "max-h-0"
          }`}
        >
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 space-y-2">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  document.querySelector(link.href)?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#calculator"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                document.querySelector("#calculator")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="block px-4 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-black font-bold rounded-lg text-center orbitron hover:scale-105 transition-transform"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
