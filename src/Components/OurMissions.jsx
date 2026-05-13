import React from 'react';
import { motion } from 'framer-motion';
import { FaBullseye, FaEye, FaGlobe, FaShieldAlt } from 'react-icons/fa';

const MissionCard = ({ icon: Icon, title, text, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    viewport={{ once: true }}
    className="bg-white p-8 rounded-2xl border-b-4 border-transparent hover:border-[#FF7A00] shadow-sm hover:shadow-xl transition-all duration-300 group"
  >
    <div className="w-14 h-14 bg-[#F9FAFB] rounded-xl flex items-center justify-center text-[#FF7A00] mb-6 group-hover:bg-[#FF7A00] group-hover:text-white transition-colors duration-300">
      <Icon size={28} />
    </div>
    <h3 className="text-[#0B192C] font-black text-xl mb-3 uppercase tracking-tighter">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
  </motion.div>
);

const Missions = () => {
  return (
    <section className="py-24 px-6 bg-[#F9FAFB] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Bold Statement */}
          <div className="lg:col-span-5">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[#FF7A00] font-extrabold tracking-widest uppercase text-sm"
            >
              // OUR PURPOSE
            </motion.span>
            <h2 className="text-[#0B192C] text-4xl lg:text-5xl font-black mt-4 leading-tight">
              Driven by <span className="text-[#FF7A00]">Integrity</span>, <br />
              Powered by Excellence.
            </h2>
            <p className="text-gray-600 mt-6 text-lg leading-relaxed">
              At Delta Cargo, our mission is more than just moving goods; it's about building the infrastructure for global commerce with a commitment to local expertise in the Yaoundé region and beyond.
            </p>
            
            <div className="mt-10 space-y-6">
              <div className="flex gap-4 items-start">
                <div className="mt-1 bg-[#0B192C] p-2 rounded-full text-white">
                  <FaBullseye size={14} />
                </div>
                <div>
                  <h4 className="font-bold text-[#0B192C]">Our Mission</h4>
                  <p className="text-gray-500 text-sm">To provide seamless, tech-driven logistics solutions that empower businesses to scale globally without borders.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="mt-1 bg-[#FF7A00] p-2 rounded-full text-white">
                  <FaEye size={14} />
                </div>
                <div>
                  <h4 className="font-bold text-[#0B192C]">Our Vision</h4>
                  <p className="text-gray-500 text-sm">To be the most reliable logistics bridge between Africa and the world, setting the standard for data-literate supply chains.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Mission Pillars Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            <MissionCard 
              icon={FaGlobe} 
              title="Global Reach" 
              text="Expanding your business horizons by connecting every major trade hub with precision." 
              delay={0.1}
            />
            <MissionCard 
              icon={FaShieldAlt} 
              title="Safety First" 
              text="Utilizing advanced tracking to ensure every shipment arrives in pristine condition." 
              delay={0.2}
            />
            <MissionCard 
              icon={FaBullseye} 
              title="Tech-Driven" 
              text="Leveraging full-stack solutions to optimize routes and reduce delivery times." 
              delay={0.3}
            />
            <div className="bg-[#0B192C] p-8 rounded-2xl flex flex-col justify-center items-center text-center text-white">
              <p className="font-black text-3xl text-[#FF7A00]">100%</p>
              <p className="font-bold uppercase tracking-widest text-xs mt-2">Commitment to Reliability</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Missions;