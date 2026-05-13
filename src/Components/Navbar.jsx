import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPhoneAlt, FaClock, FaFacebookF, FaInstagram, 
  FaWhatsapp, FaSearch, FaBars, FaTimes 
} from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed w-full z-50 font-sans">
      {/* Top Bar - Hidden on small screens to keep it clean */}
      <div className="hidden lg:flex justify-between items-center px-12 py-2 bg-[#F9EFEF] text-[#2D333A] text-sm border-b border-gray-200">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2">
            <FaClock className="text-[#FF7A00]" /> Mon – Sun: 9.00 am – 8.00 pm
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-4 border-r border-gray-300 pr-6">
            <a href="/about-us" className="hover:text-[#FF7A00] transition-colors">About Us</a>
            <a href="#" className="hover:text-[#FF7A00] transition-colors">Faq</a>
            <a href="#" className="hover:text-[#FF7A00] transition-colors">Blog</a>
          </div>
          <div className="flex gap-4 text-lg">
            <FaFacebookF className="cursor-pointer hover:text-[#FF7A00]" />
            <FaXTwitter className="cursor-pointer hover:text-[#FF7A00]" />
            <FaInstagram className="cursor-pointer hover:text-[#FF7A00]" />
            <FaWhatsapp className="cursor-pointer hover:text-[#FF7A00]" />
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`px-6 lg:px-12 py-4 flex justify-between items-center transition-all duration-300 ${
          isScrolled ? 'bg-[#0B192C]/95 backdrop-blur-md shadow-lg' : 'bg-[#2D333A]'
        }`}
      >
        {/* Logo Section - Modified for your Image */}
            <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
            >
            <a href="/" className="flex items-center gap-3 group">
                {/* Image Container */}
                <div className="relative h-12 w-auto overflow-hidden">
                <img 
                    src="/logo.jpeg" // Replace with your actual file path
                    alt="Delta Cargo Logo"
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
                </div>
                
                {/* Optional Branding Text - Remove if your logo image already includes text */}
                <div className="hidden sm:block border-l-2 border-[#FF7A00] pl-3 ml-1">
                <h1 className="text-white font-black text-xl tracking-tighter leading-none">DELTA CARGO</h1>
                <p className="text-[#FF7A00] text-[9px] font-bold tracking-[0.2em] uppercase">Logistics</p>
                </div>
            </a>
            </motion.div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {['HOME', 'TRACK PACKAGE', 'ABOUT US', 'ACCOUNT'].map((item, idx) => (
            <motion.a
              key={item}
              href={`/${item.toLowerCase().replace(' ', '-')}`}
              whileHover={{ scale: 1.05 }}
              className={`relative text-sm font-bold tracking-wide transition-colors ${
                idx === 0 ? 'text-[#FF7A00]' : 'text-white hover:text-[#FF7A00]'
              }`}
            >
              {item}
              {idx === 0 && (
                <motion.div layoutId="underline" className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#FF7A00]" />
              )}
            </motion.a>
          ))}
          
          <div className="flex items-center gap-2 text-white font-bold border-l border-gray-600 pl-8">
            <FaPhoneAlt className="text-[#FF7A00]" />
            <span>+1 (385) 235-3442</span>
          </div>
          
          
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-4 text-white">
          <FaSearch />
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0 bg-[#0B192C] z-40 flex flex-col items-center justify-center gap-8 text-white text-2xl font-bold lg:hidden"
          >
            <a href="#" onClick={() => setIsMobileMenuOpen(false)}>HOME</a>
            <a href="#" onClick={() => setIsMobileMenuOpen(false)}>TRACK PACKAGE</a>
            <a href="/about-us" onClick={() => setIsMobileMenuOpen(false)}>ABOUT US</a>
            <a href="#" onClick={() => setIsMobileMenuOpen(false)}>ACCOUNT</a>
            <div className="flex gap-6 mt-10">
                <FaFacebookF /> <FaXTwitter /> <FaInstagram /> <FaWhatsapp />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;