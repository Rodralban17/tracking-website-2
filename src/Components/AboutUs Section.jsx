import React from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaPlane, FaShip, FaCheckCircle } from 'react-icons/fa';

const AboutUsSection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Image Composition */}
            <div className="relative flex flex-col items-center">
            {/* Main Large Image */}
            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-b-8 border-[#FF7A00] w-full"
            >
                <img 
                src="assets/about1.jpg" 
                alt="Our Operations" 
                className="w-full h-[350px] md:h-[500px] object-cover"
                />
            </motion.div>

            {/* Talk to Expert Badge - Responsive Positioning */}
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="relative mt-6 md:mt-0 md:absolute md:top-20 md:-left-6 z-20 bg-[#FF7A00] p-5 md:p-6 rounded-2xl shadow-xl flex items-center gap-4 text-white w-full max-w-[280px] md:w-auto"
            >
                <div className="bg-white p-3 rounded-full text-[#FF7A00] shrink-0">
                <FaPhoneAlt size={18} />
                </div>
                <div>
                <p className="text-[10px] md:text-xs font-bold opacity-80 uppercase tracking-tighter">Talk to an expert</p>
                <p className="text-base md:text-lg font-black whitespace-nowrap">+ Professional Advisor</p>
                </div>
            </motion.div>

            {/* Secondary Circular Image - Hidden on very small screens to avoid clutter */}
            <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="absolute -bottom-10 -left-10 z-30 w-40 h-40 lg:w-48 lg:h-48 rounded-full border-8 border-white overflow-hidden shadow-2xl hidden lg:block"
            >
                <img 
                src="assets/about2.jpg" 
                alt="Team member" 
                className="w-full h-full object-cover"
                />
            </motion.div>
            </div>

        {/* Right Side: Content */}
        <div className="flex flex-col gap-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <span className="text-[#FF7A00] font-extrabold tracking-widest uppercase text-sm">
              // ABOUT OUR COMPANY
            </span>
            <h2 className="text-[#0B192C] text-4xl lg:text-5xl font-black mt-4 leading-tight">
              Pioneering the Future of <br />
              <span className="text-[#FF7A00]">Global Supply Chains</span>
            </h2>
            <div className="w-20 h-1.5 bg-[#FF7A00] mt-6 rounded-full"></div>
          </motion.div>

          <motion.p 
            variants={fadeIn}
            className="text-gray-600 text-lg leading-relaxed mt-4"
          >
            From complex warehousing and fulfillment to strategic freight planning and last-mile delivery, we manage every step of your logistics journey with absolute precision.
          </motion.p>

          <motion.p 
            variants={fadeIn}
            className="text-gray-500 text-sm italic border-l-4 border-gray-200 pl-4"
          >
            We don't just move cargo; we optimize performance and drive long-term growth for businesses worldwide by eliminating supply chain friction.
          </motion.p>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="flex items-center gap-4 bg-[#F9FAFB] p-4 rounded-xl border-l-4 border-[#FF7A00]">
              <div className="bg-[#FF7A00]/10 p-3 rounded-lg text-[#FF7A00]">
                <FaPlane size={24} />
              </div>
              <p className="font-bold text-[#0B192C]">Premium Air <br/>Freight Services</p>
            </div>
            <div className="flex items-center gap-4 bg-[#F9FAFB] p-4 rounded-xl border-l-4 border-[#0B192C]">
              <div className="bg-[#0B192C]/10 p-3 rounded-lg text-[#0B192C]">
                <FaShip size={24} />
              </div>
              <p className="font-bold text-[#0B192C]">Optimized Ocean <br/>Cargo Solutions</p>
            </div>
          </div>

          {/* Checklist */}
          <ul className="space-y-3 mt-4">
            {['Advanced real-time tracking systems', 'Tailored solutions for every industry', '24/7 dedicated customer support'].map((item, idx) => (
              <li key={idx} className="flex items-center gap-3 text-[#0B192C] font-semibold">
                <FaCheckCircle className="text-[#FF7A00]" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;