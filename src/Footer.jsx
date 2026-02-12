import React from "react";
import { Zap, Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Products: ["EVA E", "Zelio Urban", "Zelio Sport", "Zelio Cargo", "Zelio Classic"],
    Company: ["About Us", "Careers", "Press", "Blog", "Contact"],
    Support: ["FAQ", "Warranty", "Service Centers", "User Manual", "Returns"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Shipping Policy"],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 to-black text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 cyber-grid opacity-5"></div>
      
      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-yellow-500 to-orange-600 p-2.5 rounded-xl">
                <Zap className="w-6 h-6 text-black" />
              </div>
              <span className="text-2xl font-black orbitron bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                ZELIO
              </span>
            </div>
            
            <p className="text-gray-400 mb-6 leading-relaxed">
              Leading the electric revolution with innovative, sustainable, and high-performance scooters designed for the future.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="w-4 h-4 text-yellow-500" />
                <span>info@zelio.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-yellow-500" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-yellow-500 mt-0.5" />
                <span>123 Electric Avenue, Tech City, IN 560001</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-bold orbitron mb-4 text-yellow-500 tracking-wider">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href="#"
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-12"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <div className="text-sm text-gray-400 text-center md:text-left">
            © {currentYear} Zelio Electric. All rights reserved.
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-yellow-500/20 hover:border-yellow-500/50 transition-all duration-300 group"
              >
                <social.icon className="w-5 h-5 text-gray-400 group-hover:text-yellow-500 transition-colors" />
              </a>
            ))}
          </div>

          {/* Certifications */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="px-3 py-1 border border-gray-700 rounded-lg">ISO 9001</span>
            <span className="px-3 py-1 border border-gray-700 rounded-lg">CE Certified</span>
          </div>
        </div>
      </div>

      {/* Newsletter Section (Optional) */}
      <div className="relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl p-8 border border-yellow-500/20 text-center">
            <h3 className="text-2xl font-bold orbitron mb-3">Stay Updated</h3>
            <p className="text-gray-400 mb-6">Subscribe to our newsletter for the latest updates and offers</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50 transition-all"
              />
              <button className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-black font-bold rounded-xl hover:scale-105 transition-transform">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
