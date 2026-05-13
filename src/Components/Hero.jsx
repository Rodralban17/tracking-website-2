import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaStar, FaChevronRight } from 'react-icons/fa';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      tagline: "DRIVE YOUR SUCCESS",
      title: "Global Logistics & Freight Solutions, Delivered with Precision.",
      buttonText: "TRACK YOUR CARGO",
      image: "assets/hero1.jpg" // Placeholder for your first slide image
    },
    {
      id: 2,
      tagline: "BEYOND BOUNDARIES",
      title: "Seamless Air and Sea Transport for the Modern World.",
      buttonText: "TRACK YOUR CARGO",
      image: "assets/hero2.jpg" // Placeholder for your second slide image
    }
  ];

  // Auto-play logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0B192C]">
      {/* Background Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B192C] via-[#0B192C]/60 to-transparent z-10" />
          <img 
            src={slides[currentSlide].image} 
            alt="Logistic Hero" 
            className="h-full w-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Content Container */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-center">
        <motion.div
          key={`text-${currentSlide}`}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="max-w-2xl"
        >
          <span className="text-[#FF7A00] font-bold tracking-widest text-sm uppercase flex items-center gap-2">
            <span className="w-8 h-[2px] bg-[#FF7A00]"></span>
            {slides[currentSlide].tagline}
          </span>
          
          <h2 className="text-white text-5xl lg:text-7xl font-black mt-6 leading-tight">
            {slides[currentSlide].title}
          </h2>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-10 bg-[#FF7A00] text-white px-8 py-4 font-bold flex items-center gap-3 group hover:bg-white hover:text-[#0B192C] transition-all duration-300"
          >
            {slides[currentSlide].buttonText}
            <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
          </motion.button>
        </motion.div>

        {/* Slide Indicators */}
        <div className="absolute bottom-12 left-12 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 rounded-full transition-all duration-500 ${
                currentSlide === index ? 'w-12 bg-[#FF7A00]' : 'w-3 bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Persistent Service Box - Bottom Right */}
      <div className="absolute bottom-0 right-0 z-30 hidden md:block">
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="bg-[#FF7A00] p-8 lg:p-12 max-w-sm shadow-2xl relative overflow-hidden"
        >
          {/* Decorative Shine Effect */}
          <div className="absolute top-0 left-0 w-full h-1 bg-white/20"></div>
          
          <h3 className="text-white text-2xl font-black leading-tight">
            DELTA CARGO<br />SERVICE 24/7 HOURS
          </h3>
          <p className="text-white/80 text-sm mt-4 font-medium italic">
            "Reliable distribution and expert tracking for every single shipment."
          </p>
          
          <div className="flex items-center gap-1 mt-6">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-white text-xs" />
            ))}
            <span className="text-white text-xs font-bold ml-2">TRUST SCORE 4.9</span>
          </div>
        </motion.div>
      </div>

      {/* Abstract Design Elements */}
      <div className="absolute top-1/2 left-6 -translate-y-1/2 hidden lg:flex flex-col gap-1">
        {[...Array(5)].map((_, i) => (
          <FaChevronRight key={i} className="text-[#FF7A00] opacity-30 text-xl" />
        ))}
      </div>
    </section>
  );
};

export default Hero;