import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", message: "" });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-32 px-6 bg-[#0a1a2e] text-white">
      <div className="max-w-[1400px] mx-auto text-center">
        
        {/* Connect Button */}
        <button className="inline-flex items-center gap-3 px-8 py-4 border-2 border-[#d4af37] text-[#d4af37] rounded-full font-semibold tracking-wide mb-12 hover:bg-[#d4af37] hover:text-[#0a1a2e] transition-all">
          <span className="text-xl">📞</span>
          CONNECT
        </button>

        {/* Main Heading */}
        <h2 className="font-display text-[clamp(3rem,10vw,8rem)] font-black leading-none mb-8">
          <span className="bg-gradient-to-r from-[#00ffcc] via-[#00d4aa] to-[#00b388] bg-clip-text text-transparent">
            GET IN TOUCH
          </span>
        </h2>

        <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-20">
          Ready to go electric? Let's jack into the future.
        </p>

        {/* Form */}
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {isSubmitted ? (
            <div className="md:col-span-2 h-full flex items-center justify-center py-20 animate-scale-in">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-[#00ffcc] to-[#00b388] text-[#0a1a2e] rounded-full flex items-center justify-center mx-auto mb-6 text-4xl font-bold">
                  ✓
                </div>
                <h3 className="font-display text-3xl font-bold mb-4">Message Sent!</h3>
                <p className="text-gray-400">We'll get back to you shortly.</p>
              </div>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="md:col-span-2 grid md:grid-cols-2 gap-8">
                
                {/* Name */}
                <div className="md:col-span-2">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your Name"
                    className="w-full px-6 py-5 bg-white/5 border border-white/10 text-white text-lg placeholder-gray-500 focus:outline-none focus:border-[#00ffcc] focus:bg-white/10 transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Email Address"
                    className="w-full px-6 py-5 bg-white/5 border border-white/10 text-white text-lg placeholder-gray-500 focus:outline-none focus:border-[#00ffcc] focus:bg-white/10 transition-all"
                  />
                </div>

                {/* Phone */}
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Phone Number"
                    className="w-full px-6 py-5 bg-white/5 border border-white/10 text-white text-lg placeholder-gray-500 focus:outline-none focus:border-[#00ffcc] focus:bg-white/10 transition-all"
                  />
                </div>

                {/* Message */}
                <div className="md:col-span-2">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Your Message"
                    className="w-full px-6 py-5 bg-white/5 border border-white/10 text-white text-lg placeholder-gray-500 focus:outline-none focus:border-[#00ffcc] focus:bg-white/10 transition-all resize-none"
                  ></textarea>
                </div>

                {/* Submit */}
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="px-16 py-5 bg-gradient-to-r from-[#00ffcc] to-[#00b388] text-[#0a1a2e] text-lg font-bold rounded-full hover:shadow-lg hover:shadow-[#00ffcc]/30 transition-all"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}