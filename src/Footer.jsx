import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Products: ["EEVA E", "EEVA ECO", "GRACY", "MYSTERY", "All Models"],
    Company: ["About Us", "Careers", "Press", "Blog", "Contact"],
    Support: ["FAQ", "Warranty", "Service Centers", "User Manual", "Returns"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Shipping Policy"],
  };

  return (
    <footer className="py-16 px-6 bg-[#1a1f1e] text-[#f5f3ee]">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-display text-xl font-bold mb-6">{category}</h4>
              <ul className="space-y-3">
                {links.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href="#"
                      className="text-[#f5f3ee]/70 hover:text-[#8ea989] transition-colors text-[0.95rem]"
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
        <div className="h-px bg-[#f5f3ee]/10 mb-12"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm opacity-60">
          <div>© {currentYear} Zelio Electric. All rights reserved.</div>
          <div>Designed with ♥ for a sustainable future</div>
        </div>
      </div>
    </footer>
  );
}