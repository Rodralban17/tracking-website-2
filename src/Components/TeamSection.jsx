import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";

const TeamMember = ({ member }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="bg-[#FDF7F4] p-8 rounded-2xl flex flex-col items-center shadow-sm hover:shadow-xl transition-shadow duration-300"
  >
    <h3 className="text-[#0B192C] font-black text-xl mb-1">{member.name}</h3>
    <p className="text-[#FF7A00] font-bold text-xs uppercase tracking-wider mb-6">{member.role}</p>
    
    <div className="relative group">
      {/* Decorative Border Ring */}
      <div className="absolute inset-[-8px] border-2 border-[#FF7A00] rounded-full opacity-40 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="w-48 h-60 rounded-full overflow-hidden border-4 border-white shadow-lg">
        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
      </div>
    </div>

    {/* <div className="flex gap-3 mt-8">
      {[FaFacebookF, FaXTwitter, FaInstagram, FaYoutube].map((Icon, i) => (
        <button key={i} className="w-10 h-10 bg-[#FF7A00] text-white rounded-full flex items-center justify-center hover:bg-[#0B192C] transition-colors duration-300">
          <Icon size={16} />
        </button>
      ))}
    </div> */}
  </motion.div>
);

const TeamSection = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const team = [
    { name: "Ethan Walker", role: "Founder & CEO", image: "assets/ethan.jpg" },
    { name: "Jason Mitchell", role: "Warehouse Manager", image: "assets/Jason.jpg" },
    { name: "Madison Carter", role: "Managing Director", image: "assets/carter.jpg" },
    { name: "Sarah Jenkins", role: "Logistics Analyst", image: "assets/sarah.jpg" },
    { name: "Michael Chen", role: "Fleet Supervisor", image: "assets/michael.jpg" },
    { name: "Elena Rodriguez", role: "Operations Head", image: "assets/elena.jpg" },
  ];

  const pages = [team.slice(0, 3), team.slice(3, 6)];

  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="text-center mb-16">
        <span className="text-[#FF7A00] font-extrabold tracking-widest uppercase text-sm">// OUR TEAM</span>
        <h2 className="text-[#0B192C] text-4xl lg:text-5xl font-black mt-4">
          Our Experts Team Member <br /> Safety and Reliability
        </h2>
        <div className="flex justify-center mt-6">
           <div className="w-12 h-1 bg-[#FF7A00] rounded-full"></div>
           <div className="w-4 h-1 bg-[#0B192C] ml-2 rounded-full"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentPage}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {pages[currentPage].map((member, index) => (
              <TeamMember key={index} member={member} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination Indicators (Lines) */}
        <div className="flex justify-center gap-3 mt-16">
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`h-2 rounded-full transition-all duration-500 ${
                currentPage === i ? 'w-16 bg-[#FF7A00]' : 'w-8 bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;