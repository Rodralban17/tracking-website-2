import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom'; // Added useLocation and Link
import { 
  FaPhoneAlt, FaClock, FaFacebookF, FaInstagram, 
  FaWhatsapp, FaSearch, FaBars, FaTimes 
} from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation(); // Hook to get the current URL path

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'HOME', path: '/' },
    { name: 'TRACK PACKAGE', path: '/track-package' },
    { name: 'ABOUT US', path: '/about-us' },
  ];

  return (
    <nav className="fixed w-full z-50 font-sans">
      {/* Top Bar */}
      <div className="hidden lg:flex justify-between items-center px-12 py-2 bg-[#F9EFEF] text-[#2D333A] text-sm border-b border-gray-200">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2">
            <FaClock className="text-[#FF7A00]" /> Mon – Sun: 9.00 am – 8.00 pm
          </span>
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
        {/* Logo Section */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative h-12 w-auto overflow-hidden">
              <img src="/logo.jpeg" alt="Delta Cargo Logo" className="h-full w-full object-contain group-hover:scale-105 transition-transform" />
            </div>
            <div className="hidden sm:block border-l-2 border-[#FF7A00] pl-3 ml-1">
              <h1 className="text-white font-black text-xl tracking-tighter leading-none">DELTA CARGO</h1>
              <p className="text-[#FF7A00] text-[9px] font-bold tracking-[0.2em] uppercase">Logistics</p>
            </div>
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path; // Check if current path matches link path
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`relative text-sm font-bold tracking-wide transition-colors ${
                  isActive ? 'text-[#FF7A00]' : 'text-white hover:text-[#FF7A00]'
                }`}
              >
                {item.name}
                {isActive && (
                  <motion.div 
                    layoutId="underline" 
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#FF7A00]" 
                  />
                )}
              </Link>
            );
          })}
          
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
            {menuItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path} 
                onClick={() => setIsMobileMenuOpen(false)}
                className={location.pathname === item.path ? 'text-[#FF7A00]' : 'text-white'}
              >
                {item.name}
              </Link>
            ))}
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