import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaFacebookF, FaInstagram, FaWhatsapp, FaMapMarkerAlt, 
  FaEnvelope, FaPhoneAlt, FaPaperPlane 
} from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="relative bg-[#0B192C] text-white pt-24 pb-10 overflow-hidden">
      {/* Background Image with Blur and Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-20 blur-sm scale-105"
        style={{ 
          backgroundImage: 'url("/path-to-your-footer-bg.jpg")', 
          backgroundSize: 'cover',
          backgroundPosition: 'center' 
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-[#0B192C]/80 to-transparent z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Newsletter Section - Overlapping style
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="bg-[#FF7A00] p-8 md:p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 mb-20 shadow-2xl"
        >
          <div className="max-w-md">
            <h3 className="text-3xl font-black leading-tight">Subscribe to Our <br/>Newsletter</h3>
            <p className="text-white/80 mt-2 font-medium">Get the latest updates on global shipping and logistics trends.</p>
          </div>
          <div className="flex w-full md:w-auto bg-white/10 p-2 rounded-2xl backdrop-blur-md">
            <input 
              type="email" 
              placeholder="Your Email Address" 
              className="bg-transparent border-none outline-none px-4 py-3 text-white placeholder:text-white/60 w-full"
            />
            <button className="bg-white text-[#FF7A00] p-4 rounded-xl hover:scale-105 transition-transform">
              <FaPaperPlane />
            </button>
          </div>
        </motion.div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <img src="/logo.jpeg" alt="Delta Logo" className="h-10 w-auto" />
              <span className="text-2xl font-black tracking-tighter">DELTA <span className="text-[#FF7A00]">CARGO</span></span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Leading the way in global logistics with a focus on precision, technology, and reliability. We move the world, one shipment at a time.
            </p>
            <div className="flex gap-4">
              {[FaFacebookF, FaXTwitter, FaInstagram, FaWhatsapp].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-[#FF7A00] hover:border-[#FF7A00] transition-all">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 border-l-4 border-[#FF7A00] pl-4">Company</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="/" className="hover:text-[#FF7A00] transition-colors">Home</a></li>
              <li><a href="/about-us" className="hover:text-[#FF7A00] transition-colors">About Us</a></li>
              <li><a href="/contact-us" className="hover:text-[#FF7A00] transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 border-l-4 border-[#FF7A00] pl-4">Our Services</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="services/air-freight" className="hover:text-[#FF7A00] transition-colors">Air Freight Logistics</a></li>
              <li><a href="services/sea-freight" className="hover:text-[#FF7A00] transition-colors">Ocean Cargo Shipping</a></li>
              <li><a href="services/train-freight" className="hover:text-[#FF7A00] transition-colors">Train Transport</a></li>
              <li><a href="services/road-freight" className="hover:text-[#FF7A00] transition-colors">Road Transport</a></li>
              <li><a href="services/smart-warehousing" className="hover:text-[#FF7A00] transition-colors">Smart Warehousing</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xl font-bold mb-6 border-l-4 border-[#FF7A00] pl-4">Contact Info</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-[#FF7A00] mt-1 shrink-0" />
                <span>Atlanta, Georgia, USA
Address: 1021 N Outer Loop Road, Atlanta, GA 30354, United States,<br/>Cameroon</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-[#FF7A00] shrink-0" />
                <span>+1 (385) 235-3442</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-[#FF7A00] shrink-0" />
                <span>deltacargologisticss@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-[#FF7A00] shrink-0" />
                <span>deltalcargo@icloud.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs font-bold uppercase tracking-widest">
          <p>© 2026 Delta Cargo Logistics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;