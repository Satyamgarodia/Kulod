import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
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
            <h3 
              className="text-5xl font-bold mb-8"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Get in Touch
            </h3>
            <p className="text-lg opacity-70 mb-12 leading-relaxed">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>

            <div className="space-y-8">
              {[
                { label: "Visit Us", value: "Kulod Green Energies\nJagannath Temple Road\nKutra, Sundargarh\nOdisha 770018" },
                { label: "Call Us", value: "7849077443", link: "tel:7849077443" },
                { label: "Email Us", value: "zeliomivaan@gmail.com", link: "mailto:zeliomivaan@gmail.com" },
                { label: "GSTIN", value: "21DXHPA0963B1Z8" },
              ].map((item, idx) => (
                <div key={idx}>
                  <div 
                    className="text-xs uppercase tracking-widest opacity-60 mb-2"
                    style={{ letterSpacing: '0.1em' }}
                  >
                    {item.label}
                  </div>
                  {item.link ? (
                    <a href={item.link} className="text-lg hover:text-[#8ea989] transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <div className="text-lg whitespace-pre-line">{item.value}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            {isSubmitted ? (
              <div className="h-full flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="w-20 h-20 bg-[#8ea989] text-[#0a0e0d] rounded-full flex items-center justify-center mx-auto mb-6 text-4xl font-bold">
                    ✓
                  </div>
                  <h3 
                    className="text-3xl font-bold mb-4"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Message Sent!
                  </h3>
                  <p className="opacity-70">We'll get back to you shortly.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Name */}
                <div>
                  <label 
                    className="block text-sm uppercase tracking-widest font-semibold mb-3"
                    style={{ letterSpacing: '0.1em' }}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-5 py-5 border border-[#f5f3ee]/20 bg-[#f5f3ee]/5 text-[#f5f3ee] text-lg placeholder-[#f5f3ee]/50 focus:outline-none focus:border-[#8ea989] focus:bg-[#f5f3ee]/10 transition-all"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label 
                      className="block text-sm uppercase tracking-widest font-semibold mb-3"
                      style={{ letterSpacing: '0.1em' }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full px-5 py-5 border border-[#f5f3ee]/20 bg-[#f5f3ee]/5 text-[#f5f3ee] text-lg placeholder-[#f5f3ee]/50 focus:outline-none focus:border-[#8ea989] focus:bg-[#f5f3ee]/10 transition-all"
                    />
                  </div>

                  <div>
                    <label 
                      className="block text-sm uppercase tracking-widest font-semibold mb-3"
                      style={{ letterSpacing: '0.1em' }}
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="7849077443"
                      className="w-full px-5 py-5 border border-[#f5f3ee]/20 bg-[#f5f3ee]/5 text-[#f5f3ee] text-lg placeholder-[#f5f3ee]/50 focus:outline-none focus:border-[#8ea989] focus:bg-[#f5f3ee]/10 transition-all"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label 
                    className="block text-sm uppercase tracking-widest font-semibold mb-3"
                    style={{ letterSpacing: '0.1em' }}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="How can we help?"
                    className="w-full px-5 py-5 border border-[#f5f3ee]/20 bg-[#f5f3ee]/5 text-[#f5f3ee] text-lg placeholder-[#f5f3ee]/50 focus:outline-none focus:border-[#8ea989] focus:bg-[#f5f3ee]/10 transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label 
                    className="block text-sm uppercase tracking-widest font-semibold mb-3"
                    style={{ letterSpacing: '0.1em' }}
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="Tell us about your inquiry..."
                    className="w-full px-5 py-5 border border-[#f5f3ee]/20 bg-[#f5f3ee]/5 text-[#f5f3ee] text-lg placeholder-[#f5f3ee]/50 focus:outline-none focus:border-[#8ea989] focus:bg-[#f5f3ee]/10 transition-all resize-none"
                  ></textarea>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="px-12 py-6 bg-[#8ea989] text-[#0a0e0d] text-lg font-semibold uppercase tracking-wide hover:bg-[#c8e5c0] transition-all"
                  style={{ letterSpacing: '0.05em' }}
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