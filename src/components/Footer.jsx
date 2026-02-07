import React from "react";
import {
  Zap,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 border-t border-yellow-500/20">
      {/* Glow Accent */}
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          {/* Brand */}
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 orbitron">
              <Zap
                className="w-10 h-10 text-yellow-500 drop-shadow-[0_0_15px_rgba(253,184,19,0.6)]"
                fill="#FDB813"
              />
              <span className="text-2xl font-bold text-gradient">
                KULOD GREEN ENERGIES
              </span>
            </div>
            <p className="text-gray-400 max-w-sm mx-auto md:mx-0">
              Powering the future with clean, electric mobility. Ride smart.
              Ride green.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-10 text-gray-400 text-sm">
            JAGANNATH TEMPLE ROAD KUTRA, DIST. SUNDARGARH ODISHA PIN-770018
            {/* <ul className="space-y-2">
              <li className="text-yellow-500 font-semibold">Company</li>
              <li className="hover:text-yellow-400 transition">About</li>
              <li className="hover:text-yellow-400 transition">Careers</li>
              <li className="hover:text-yellow-400 transition">Contact</li>
            </ul>
            <ul className="space-y-2">
              <li className="text-yellow-500 font-semibold">Solutions</li>
              <li className="hover:text-yellow-400 transition">EV Bikes</li>
              <li className="hover:text-yellow-400 transition">Charging</li>
              <li className="hover:text-yellow-400 transition">
                Sustainability
              </li>
            </ul> */}
          </div>

          {/* Social */}
          <div className="space-y-4 text-center md:text-right">
            <p className="text-gray-400">Connect with us</p>
            <div className="flex justify-center md:justify-end gap-4">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Instagram, label: "Instagram" },
                { icon: Twitter, label: "Twitter" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Mail, label: "Email" },
              ].map(({ icon: Icon, label }, idx) => (
                <a
                  key={idx}
                  href="#"
                  aria-label={label}
                  className="w-11 h-11 rounded-full bg-white/5 border border-yellow-500/30 flex items-center justify-center text-yellow-400 hover:bg-yellow-500/20 hover:scale-110 hover:shadow-[0_0_20px_rgba(253,184,19,0.4)] transition-all"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Kulod Green Energies. All rights
            reserved.
          </p>
          <p className="text-gray-400">
            Future is Electric ⚡ Ride Green, Ride Clean
          </p>
        </div>
      </div>
    </footer>
  );
}
