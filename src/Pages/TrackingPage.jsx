import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Package, ArrowRight, ShieldCheck } from 'lucide-react';

const TrackingPage = () => {
  const [trackingId, setTrackingId] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleTrack = (e) => {
    e.preventDefault();
    console.log("Tracking Shipment:", trackingId);
    // Add your tracking logic or navigation here
  };

  return (
    <section className="relative py-40 bg-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent opacity-20"></div>
      
      <div className="max-w-5xl mx-auto px-6">
        <div className="relative bg-[#0B192C] rounded-[2.5rem] p-8 md:p-16 shadow-2xl overflow-hidden">
          
          {/* Background Glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#FF7A00] opacity-10 blur-[80px] rounded-full"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#FF7A00] opacity-5 blur-[80px] rounded-full"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            
            {/* Text Content */}
            <div className="lg:col-span-2 text-white">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-2 text-[#FF7A00] mb-4">
                  <ShieldCheck size={20} />
                  <span className="text-xs font-black uppercase tracking-[0.2em]">Secure Tracking</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black leading-tight mb-4">
                  Track Your <br />
                  <span className="text-[#FF7A00]">Shipment</span>
                </h2>
                <p className="text-gray-400 font-medium">
                  Enter your tracking number to get real-time updates on your cargo status and location.
                </p>
              </motion.div>
            </div>

            {/* Input Form */}
            <div className="lg:col-span-3">
              <motion.form 
                onSubmit={handleTrack}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="relative group"
              >
                <div className={`relative flex flex-col md:flex-row gap-4 p-3 rounded-2xl border-2 transition-all duration-300 ${
                  isHovered ? 'border-[#FF7A00] bg-white/5' : 'border-white/10 bg-white/5'
                }`}>
                  <div className="flex-1 relative flex items-center">
                    <Package className="absolute left-4 text-gray-500" size={20} />
                    <input 
                      type="text"
                      placeholder="Enter Tracking ID (e.g. DELTA-12345)"
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                      onFocus={() => setIsHovered(true)}
                      onBlur={() => setIsHovered(false)}
                      className="w-full bg-transparent py-4 pl-12 pr-4 text-white font-bold placeholder:text-gray-600 focus:outline-none"
                      required
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    className="bg-[#FF7A00] hover:bg-white hover:text-[#0B192C] text-white px-8 py-4 rounded-xl font-black transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-xl shadow-[#FF7A00]/20"
                  >
                    TRACK NOW
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Status Helpers */}
                <div className="flex gap-6 mt-6 ml-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Global Network Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Search size={12} className="text-[#FF7A00]" />
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">24/7 Real-time Monitoring</span>
                  </div>
                </div>
              </motion.form>
            </div>

          </div>
        </div>
        
        {/* Support Link */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm font-medium">
            Lost your tracking number? <a href="/contact" className="text-[#0B192C] font-black hover:text-[#FF7A00] underline decoration-[#FF7A00]/30 transition-colors">Contact Support</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrackingPage;