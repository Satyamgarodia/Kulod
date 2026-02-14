import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Models", href: "#models" },
    { name: "Features", href: "#features" },
    { name: "Calculator", href: "#calculator" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? "bg-[#f5f3ee]/95 backdrop-blur-premium py-6 shadow-sm"
          : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-16">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a
            href="#home"
            className="font-display text-3xl font-bold tracking-wide text-[#0a0e0d] cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#home")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            KULOD
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="text-[#0a0e0d] text-[0.95rem] font-medium tracking-wide relative group"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                {link.name}
                <div className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-[#8ea989] transition-all duration-300 group-hover:w-full"></div>
              </a>
            ))}
            
            <button
              onClick={() => document.querySelector("#calculator")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3 bg-[#0a0e0d] text-[#f5f3ee] font-medium text-[0.95rem] tracking-wide hover:bg-[#8ea989] hover:text-[#0a0e0d] transition-all"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#0a0e0d]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? "max-h-96 mt-6" : "max-h-0"
          }`}
        >
          <div className="bg-white/50 backdrop-blur-lg border border-[#0a0e0d]/10 p-4 space-y-2">
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
                className="block px-4 py-3 text-[#0a0e0d] hover:bg-[#8ea989]/10 transition-all"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                document.querySelector("#calculator")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full px-4 py-3 bg-[#0a0e0d] text-[#f5f3ee] font-medium text-center"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}