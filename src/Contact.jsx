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
    <section id="contact" className="py-24 px-6 bg-[#0a0e0d] text-[#f5f3ee]">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-5 gap-24">
          
          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-5xl font-bold mb-8">Get in Touch</h3>
            <p className="text-lg opacity-70 mb-12 leading-relaxed">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>

            <div className="space-y-8">
              {[
                { label: "Phone", value: "+91 98765 43210" },
                { label: "Email", value: "info@zelio.com" },
                { label: "Address", value: "123 Electric Avenue\nTech City, IN 560001" },
                { label: "Business Hours", value: "Mon-Fri: 9AM - 6PM\nSat: 10AM - 4PM\nSun: Closed" },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="text-xs uppercase tracking-widest opacity-60 mb-2">
                    {item.label}
                  </div>
                  <div className="text-lg whitespace-pre-line">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            {isSubmitted ? (
              <div className="h-full flex items-center justify-center py-20 animate-scale-in">
                <div className="text-center">
                  <div className="w-20 h-20 bg-[#8ea989] text-[#0a0e0d] rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                    ✓
                  </div>
                  <h3 className="font-display text-3xl font-bold mb-4">Message Sent!</h3>
                  <p className="opacity-70">We'll get back to you shortly.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Name */}
                <div>
                  <label className="block text-sm uppercase tracking-widest font-semibold mb-3">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-5 py-5 border border-[#f5f3ee]/20 bg-[#f5f3ee]/5 text-[#f5f3ee] text-lg placeholder-[#f5f3ee]/50 focus:border-[#8ea989] focus:bg-[#f5f3ee]/10 transition-all"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm uppercase tracking-widest font-semibold mb-3">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full px-5 py-5 border border-[#f5f3ee]/20 bg-[#f5f3ee]/5 text-[#f5f3ee] text-lg placeholder-[#f5f3ee]/50 focus:border-[#8ea989] focus:bg-[#f5f3ee]/10 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm uppercase tracking-widest font-semibold mb-3">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 98765 43210"
                      className="w-full px-5 py-5 border border-[#f5f3ee]/20 bg-[#f5f3ee]/5 text-[#f5f3ee] text-lg placeholder-[#f5f3ee]/50 focus:border-[#8ea989] focus:bg-[#f5f3ee]/10 transition-all"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm uppercase tracking-widest font-semibold mb-3">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="Tell us about your inquiry..."
                    className="w-full px-5 py-5 border border-[#f5f3ee]/20 bg-[#f5f3ee]/5 text-[#f5f3ee] text-lg placeholder-[#f5f3ee]/50 focus:border-[#8ea989] focus:bg-[#f5f3ee]/10 transition-all resize-none"
                  ></textarea>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="px-12 py-6 bg-[#8ea989] text-[#0a0e0d] text-lg font-semibold uppercase tracking-wide hover:bg-[#c8e5c0] transition-all"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}