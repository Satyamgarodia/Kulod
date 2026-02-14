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
    <section id="contact" className="py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 md:px-8 lg:px-12 bg-[#0a0e0d] text-[#f5f3ee] mt-12 sm:mt-16 md:mt-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 md:gap-20 lg:gap-24">
          
          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h3 
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Get in Touch
            </h3>
            <p className="text-base sm:text-lg opacity-70 mb-8 sm:mb-10 md:mb-12 leading-relaxed">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>

            <div className="space-y-6 sm:space-y-8">
              {[
                { label: "Visit Us", value: "Kulod Green Energies\nJagannath Temple Road\nKutra, Sundargarh\nOdisha 770018" },
                { label: "Call Us", value: "7849077443", link: "tel:7849077443" },
                { label: "Email Us", value: "zeliomivaan@gmail.com", link: "mailto:zeliomivaan@gmail.com" },
                { label: "GSTIN", value: "21DXHPA0963B1Z8" },
              ].map((item, idx) => (
                <div key={idx}>
                  <div 
                    className="text-[0.65rem] sm:text-xs uppercase tracking-widest opacity-60 mb-2"
                    style={{ letterSpacing: '0.1em' }}
                  >
                    {item.label}
                  </div>
                  {item.link ? (
                    <a href={item.link} className="text-base sm:text-lg hover:text-[#8ea989] transition-colors break-all">
                      {item.value}
                    </a>
                  ) : (
                    <div className="text-base sm:text-lg whitespace-pre-line">{item.value}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            {isSubmitted ? (
              <div className="h-full flex items-center justify-center py-12 sm:py-16 md:py-20">
                <div className="text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#8ea989] text-[#0a0e0d] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-3xl sm:text-4xl font-bold">
                    ✓
                  </div>
                  <h3 
                    className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Message Sent!
                  </h3>
                  <p className="opacity-70">We'll get back to you shortly.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                
                {/* Name */}
                <div>
                  <label 
                    className="block text-xs sm:text-sm uppercase tracking-widest font-semibold mb-2 sm:mb-3"
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
                    className="w-full px-4 sm:px-5 py-4 sm:py-5 border border-[#f5f3ee]/20 bg-[#f5f3ee]/5 text-[#f5f3ee] text-base sm:text-lg placeholder-[#f5f3ee]/50 focus:outline-none focus:border-[#8ea989] focus:bg-[#f5f3ee]/10 transition-all"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <label 
                      className="block text-xs sm:text-sm uppercase tracking-widest font-semibold mb-2 sm:mb-3"
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
                      className="w-full px-4 sm:px-5 py-4 sm:py-5 border border-[#f5f3ee]/20 bg-[#f5f3ee]/5 text-[#f5f3ee] text-base sm:text-lg placeholder-[#f5f3ee]/50 focus:outline-none focus:border-[#8ea989] focus:bg-[#f5f3ee]/10 transition-all"
                    />
                  </div>

                  <div>
                    <label 
                      className="block text-xs sm:text-sm uppercase tracking-widest font-semibold mb-2 sm:mb-3"
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
                      className="w-full px-4 sm:px-5 py-4 sm:py-5 border border-[#f5f3ee]/20 bg-[#f5f3ee]/5 text-[#f5f3ee] text-base sm:text-lg placeholder-[#f5f3ee]/50 focus:outline-none focus:border-[#8ea989] focus:bg-[#f5f3ee]/10 transition-all"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label 
                    className="block text-xs sm:text-sm uppercase tracking-widest font-semibold mb-2 sm:mb-3"
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
                    className="w-full px-4 sm:px-5 py-4 sm:py-5 border border-[#f5f3ee]/20 bg-[#f5f3ee]/5 text-[#f5f3ee] text-base sm:text-lg placeholder-[#f5f3ee]/50 focus:outline-none focus:border-[#8ea989] focus:bg-[#f5f3ee]/10 transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label 
                    className="block text-xs sm:text-sm uppercase tracking-widest font-semibold mb-2 sm:mb-3"
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
                    className="w-full px-4 sm:px-5 py-4 sm:py-5 border border-[#f5f3ee]/20 bg-[#f5f3ee]/5 text-[#f5f3ee] text-base sm:text-lg placeholder-[#f5f3ee]/50 focus:outline-none focus:border-[#8ea989] focus:bg-[#f5f3ee]/10 transition-all resize-none"
                  ></textarea>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full sm:w-auto px-12 sm:px-16 md:px-20 py-3.5 sm:py-4 bg-[#8ea989] text-[#0a0e0d] text-base sm:text-lg font-semibold uppercase tracking-wide hover:bg-[#c8e5c0] transition-all flex items-center justify-center"
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