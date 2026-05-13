import React from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { FaPlay } from 'react-icons/fa';

const CounterItem = ({ target, label, suffix = "" }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest) + suffix);
  const ref = useRef(null);

  useEffect(() => {
    const controls = animate(count, target, { duration: 2, ease: "easeOut" });
    return controls.stop;
  }, [target]);

  return (
    <div className="flex flex-col items-center justify-center border-r last:border-r-0 border-gray-200 px-4 md:px-8">
      <motion.span className="text-4xl md:text-5xl font-black text-[#FF7A00] tracking-tighter">
        {rounded}
      </motion.span>
      <span className="text-[#0B192C] font-bold text-xs md:text-sm uppercase mt-2 text-center">
        {label}
      </span>
    </div>
  );
};

const StatisticsSection = () => {
  return (
    <section className="relative pt-20 pb-32">
      {/* Floating Counter Bar */}
      <div className="max-w-6xl mx-auto px-6 relative z-10 -mt-32">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="bg-white shadow-2xl rounded-xl py-12 grid grid-cols-2 lg:grid-cols-4 gap-y-8"
        >
          <CounterItem target={23} suffix="k" label="Active Partners" />
          <CounterItem target={162} suffix="k" label="Deliveries Made" />
          <CounterItem target={95} suffix="%" label="On-Time Rate" />
          <CounterItem target={12} suffix="k" label="Delta Experts" />
        </motion.div>
      </div>

      {/* Video/Text Section with Dark Pattern Background */}
      <div className="bg-[#0B192C] mt-20 py-24 relative overflow-hidden">
        {/* Subtle pattern overlay - simplified for Tailwind */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#FF7A00 1px, transparent 0)', backgroundSize: '40px 40px' }}>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="max-w-xl"
          >
            <h2 className="text-white text-4xl lg:text-6xl font-black leading-tight">
              Innovative Tactics, <br />
              Dedicated <span className="text-[#FF7A00]">Logistics <br />Network.</span>
            </h2>
          </motion.div>

          {/* Animated Video Button */}
          <motion.div 
             initial={{ scale: 0.8, opacity: 0 }}
             whileInView={{ scale: 1, opacity: 1 }}
             className="relative"
          >
            {/* Pulsing rings */}
            <div className="absolute inset-0 bg-[#FF7A00] rounded-2xl animate-ping opacity-20"></div>
            <div className="absolute inset-0 bg-[#FF7A00] rounded-2xl animate-pulse opacity-40"></div>
            
            <button className="relative bg-[#FF7A00] p-10 lg:p-14 rounded-2xl text-white shadow-2xl group transition-transform hover:scale-105">
              <FaPlay size={30} className="group-hover:scale-110 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;