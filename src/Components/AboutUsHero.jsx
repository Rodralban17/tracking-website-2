import React from 'react';
import { motion } from 'framer-motion';

const AboutUsHero = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center bg-[#0B192C] overflow-hidden py-40">
      {/* Right Side Image with Angle Mask */}
      <div className="absolute right-0 top-0 w-full lg:w-2/3 h-full z-0">
        <img 
          src="assets/hero1.jpg" 
          alt="Delta Cargo Operations" 
          className="w-full h-full object-cover opacity-60 lg:opacity-100"
        />
        {/* Gradient Overlay for blending into the dark navy */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B192C] via-[#0B192C]/50 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="lg:w-1/2">
          {/* Animated Accent Line */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ duration: 1 }}
            className="h-1.5 bg-[#FF7A00] mb-8"
          />

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-white text-5xl lg:text-7xl font-black leading-none tracking-tighter">
              BEYOND <br />
              <span className="text-[#FF7A00]">LOGISTICS.</span>
            </h1>
            
            <p className="mt-8 text-gray-300 text-lg md:text-xl max-w-lg leading-relaxed font-medium">
              A journey of precision, starting from our roots in Yaoundé and expanding into a global network of trust and reliability.
            </p>

            <div className="mt-10 flex flex-wrap gap-6">
              <button className="bg-[#FF7A00] text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-[#0B192C] transition-all duration-300">
                Our Journey
              </button>
              
              {/* Floating Stat Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-center gap-4"
              >
                <div className="bg-[#FF7A00] w-12 h-12 rounded-lg flex items-center justify-center font-black text-white text-xl">
                  24
                </div>
                <div>
                  <p className="text-white font-bold text-sm uppercase">Established</p>
                  <p className="text-[#FF7A00] text-xs font-black">OCTOBER 2024</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Geometric Element */}
      <div className="absolute bottom-[-10%] left-[-5%] w-64 h-64 bg-[#FF7A00] rounded-full blur-[120px] opacity-20"></div>
    </section>
  );
};

export default AboutUsHero;