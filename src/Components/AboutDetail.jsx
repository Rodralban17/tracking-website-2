import React from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaCheckCircle } from 'react-icons/fa';

const AboutDetail = () => {
  return (
    <section className="py-24 px-6 bg-white overflow-hidden mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Image Side with Decorative Elements */}
          < div className="w-full lg:w-1/2 relative ">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="assets/about1.jpg" 
                alt="Logistics Professional" 
                className="w-full h-auto object-cover"
              />
            </div>
            {/* The "Floating Experience Box" from Capture d’écran (54).jpg reimagined */}
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="absolute -bottom-10 -right-6 lg:right-10 z-20 bg-[#FF7A00] text-white p-8 rounded-2xl shadow-xl max-w-[280px]"
            >
              <p className="text-sm font-bold uppercase tracking-widest opacity-80">Tech-Enabled</p>
              <h4 className="text-2xl font-black mt-1">Reliable Solutions Delivered Daily</h4>
              <div className="mt-4 flex items-center gap-3 border-t border-white/20 pt-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <FaPhoneAlt size={16} />
                </div>
                <div>
                  <p className="text-xs font-bold opacity-80 uppercase">Call for Inquiry</p>
                  <p className="text-lg font-black">+1 (385) 235-3442</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2 pt-4">
            <span className="text-[#FF7A00] font-extrabold tracking-widest uppercase text-sm">// About Us</span>
            <h2 className="text-[#0B192C] text-4xl lg:text-6xl font-black mt-4 leading-[1.1]">
              Pioneering Data-Driven <br />
              Logistics
            </h2>
            
            <p className="text-gray-600 mt-8 text-lg leading-relaxed">
              Leveraging a background in software engineering, we bring a unique technical edge to contract logistics. We don't just move boxes; we optimize supply chains using real-time data literacy.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                "Full-Stack Shipment Tracking Systems",
                "Optimized Route Planning",
                "Professional Warehousing Management"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[#0B192C] font-bold">
                  <FaCheckCircle className="text-[#FF7A00]" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Stats Bar - Replacing the large red block in Capture d’écran (54).jpg */}
            <div className="mt-12 grid grid-cols-3 gap-4 bg-[#0B192C] p-8 rounded-2xl text-white">
              <div className="text-center border-r border-gray-700">
                <p className="text-[#FF7A00] text-3xl font-black">2+</p>
                <p className="text-[10px] uppercase font-bold tracking-widest mt-1 text-gray-400">Years Dev <br/>Exp.</p>
              </div>
              <div className="text-center border-r border-gray-700">
                <p className="text-[#FF7A00] text-3xl font-black">100%</p>
                <p className="text-[10px] uppercase font-bold tracking-widest mt-1 text-gray-400">Project <br/>Success</p>
              </div>
              <div className="text-center">
                <p className="text-[#FF7A00] text-3xl font-black">24/7</p>
                <p className="text-[10px] uppercase font-bold tracking-widest mt-1 text-gray-400">System <br/>Uptime</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutDetail;