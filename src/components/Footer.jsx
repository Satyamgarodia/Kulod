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
    <footer className="py-16 sm:py-18 md:py-20 px-4 sm:px-6 bg-[#0a0e0d] text-[#f5f3ee] mt-12 sm:mt-16 md:mt-20">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-10 md:mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 
                className="text-lg sm:text-xl font-bold mb-4 sm:mb-6"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {category}
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                {links.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href="#"
                      className="text-[#f5f3ee]/70 hover:text-[#8ea989] transition-colors text-sm sm:text-[0.95rem] no-underline"
                      style={{ color: '#f5f3ee' }}
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
        <div className="h-px bg-[#f5f3ee]/10 mb-8 sm:mb-10 md:mb-12"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 text-xs sm:text-sm text-[#f5f3ee]/60 text-center md:text-left">
          <div>© {currentYear} Zelio Electric. All rights reserved.</div>
          <div>Designed with ♥ for a sustainable future</div>
        </div>
      </div>
    </footer>
  );
}