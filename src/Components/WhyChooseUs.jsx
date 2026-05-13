import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaChartLine, FaCogs } from 'react-icons/fa';

const WhyChooseUs = () => {
  return (
    <section className="relative bg-[#0B192C] overflow-hidden min-h-[600px] flex items-center">
      {/* Background Decorative Elements from Capture d’écran (55).jpg */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/assets/world-map-dots.png')] bg-center bg-no-repeat"></div>
      </div>

      {/* Large Curved Accent - Reimagining the red curve from Capture d’écran (55).jpg */}
      <div className="absolute right-0 top-0 h-full w-1/2 hidden lg:block">
        <svg viewBox="0 0 500 800" className="h-full w-full preserve-3d" preserveAspectRatio="none">
          <path 
            d="M500,0 L150,0 C250,200 50,600 300,800 L500,800 Z" 
            fill="#FF7A00" 
            className="opacity-90"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Content Side */}
          <div className="text-white">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[#FF7A00] font-extrabold tracking-widest uppercase text-sm">// WHY WE SPECIAL</span>
              <h2 className="text-4xl lg:text-6xl font-black mt-4 leading-tight">
                Engineered for <br />
                <span className="text-[#FF7A00]">Predictable</span> Success.
              </h2>
              <p className="mt-6 text-gray-400 text-lg leading-relaxed max-w-xl">
                Combining a deep foundation in Software Engineering with advanced Data Science planning to ensure your logistics are never left to chance.
              </p>
            </motion.div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Feature 1 */}
              <div className="group">
                <div className="w-14 h-14 bg-[#FF7A00] rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                  <FaShieldAlt size={24} />
                </div>
                <h4 className="text-xl font-bold mb-2">Secure Systems</h4>
                <p className="text-gray-400 text-sm">Full-stack security for your cargo data and tracking reliability.</p>
              </div>

              {/* Feature 2 */}
              <div className="group">
                <div className="w-14 h-14 bg-white/10 border border-white/20 rounded-full flex items-center justify-center mb-4 transition-all group-hover:bg-[#FF7A00] group-hover:border-[#FF7A00]">
                  <FaChartLine size={24} className="text-[#FF7A00] group-hover:text-white" />
                </div>
                <h4 className="text-xl font-bold mb-2">Data Literacy</h4>
                <p className="text-gray-400 text-sm">Translating complex logistics data into clear, actionable business insights.</p>
              </div>
            </div>
          </div>

          {/* Image Side - Replaces the warehouse crew from Capture d’écran (55).jpg */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative lg:h-[500px] flex items-center justify-center"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden border-8 border-[#0B192C] shadow-2xl">
              <img 
                src="assets/group.jpg" 
                alt="Modern Warehouse Management" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating Experience Badge */}
            {/* <div className="absolute -top-10 -right-4 lg:-right-10 bg-white p-6 rounded-2xl shadow-2xl z-20">
              <div className="flex items-center gap-4">
                <div className="text-[#0B192C]">
                  <p className="text-4xl font-black leading-none">B2</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest">Italian Certified</p>
                </div>
                <div className="h-10 w-[2px] bg-gray-200"></div>
                <FaCogs className="text-[#FF7A00] text-3xl animate-spin-slow" />
              </div>
            </div> */}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;