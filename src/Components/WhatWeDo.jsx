import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaShip, FaTruck, FaTrain, FaPlane, FaWarehouse, FaArrowRight } from 'react-icons/fa';

const ServicesSlider = () => {
  const navigate = useNavigate();

  const services = [
    { id: 'ocean-freight', name: 'Ocean Freight', icon: <FaShip />, image: 'assets/ocean.jpg' },
    { id: 'road-freight', name: 'Road Freight', icon: <FaTruck />, image: 'assets/road.jpg' },
    { id: 'train-freight', name: 'Train Freight', icon: <FaTrain />, image: 'assets/train.jpg' },
    { id: 'air-freight', name: 'Air Freight', icon: <FaPlane />, image: 'assets/air.jpg' },
    { id: 'smart-warehousing', name: 'Smart Warehousing', icon: <FaWarehouse />, image: 'assets/warehouse.jpg' },
  ];

  // Doubling the array for a seamless infinite scroll effect
  const duplicatedServices = [...services, ...services];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="text-center mb-16 px-6">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-[#FF7A00] font-extrabold tracking-widest uppercase text-sm"
        >
          // WHAT WE DO
        </motion.span>
        <h2 className="text-[#0B192C] text-4xl lg:text-5xl font-black mt-4">
          Moving Your Products <br className="hidden md:block" /> Across All Borders
        </h2>
        <div className="flex justify-center mt-6">
           <div className="w-16 h-1 bg-[#FF7A00] rounded-full"></div>
           <div className="w-4 h-1 bg-[#0B192C] ml-2 rounded-full"></div>
        </div>
      </div>

      {/* Slider Container */}
      <div className="relative w-full">
        <motion.div 
          className="flex gap-8 w-fit"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            ease: "linear", 
            duration: 30, 
            repeat: Infinity 
          }}
          whileHover={{ animationPlayState: 'paused' }}
        >
          {duplicatedServices.map((service, index) => (
            <div 
              key={`${service.id}-${index}`}
              onClick={() => navigate(`/services/${service.id}`)}
              className="relative w-[350px] h-[450px] group cursor-pointer overflow-hidden rounded-2xl shadow-xl flex-shrink-0"
            >
              {/* Service Image */}
              <img 
                src={service.image} 
                alt={service.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-90"></div>

              {/* Icon Badge - Positioned like Capture d’écran (51).jpg */}
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 transition-transform duration-500 group-hover:-translate-y-24">
                <div className="bg-white p-5 shadow-lg border-2 border-[#FF7A00] rounded-lg text-[#FF7A00] text-3xl">
                  {service.icon}
                </div>
                <h3 className="text-white font-black text-xl mt-4 text-center whitespace-nowrap uppercase tracking-tight">
                  {service.name}
                </h3>
              </div>

              {/* Hover Details Button */}
              <div className="absolute bottom-10 left-0 w-full flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-10 group-hover:translate-y-0">
                <button className="bg-[#FF7A00] text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 text-sm">
                  VIEW DETAILS <FaArrowRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSlider;