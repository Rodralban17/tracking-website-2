import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteRight } from 'react-icons/fa';

const testimonials = [
  {
    name: "Marcus Thorne",
    company: "Global Retail Inc.",
    text: "Delta Cargo has completely transformed our supply chain efficiency. Their real-time tracking is second to none.",
    rating: 5,
    size: "lg" // Large card for variety
  },
  {
    name: "Sarah Lindon",
    company: "Swift Auto Parts",
    text: "Reliable, fast, and professional. The best freight partners we've had in a decade.",
    rating: 5,
    size: "sm"
  },
  {
    name: "Julian Vane",
    company: "TechWorld Logistics",
    text: "Exceptional service from the warehouse to final delivery.",
    rating: 4,
    size: "sm"
  },
  {
    name: "Amara Okoro",
    company: "EcoDistribution",
    text: "The smart warehousing solutions helped us reduce overhead by 15% in the first quarter.",
    rating: 5,
    size: "md"
  },
  {
    name: "Robert Chen",
    company: "Peak Manufacturing",
    text: "Their team handled our sensitive cargo with extreme care. Not a single delay recorded.",
    rating: 5,
    size: "md"
  },
  {
    name: "Linda G.",
    company: "Fashion Forward",
    text: "Fast response times and clear communication every step of the way.",
    rating: 5,
    size: "sm"
  }
];

const TestimonialCard = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ y: -5 }}
    className={`relative p-8 rounded-3xl shadow-xl overflow-hidden group 
      ${item.size === 'lg' ? 'md:col-span-2 bg-[#0B192C] text-white' : 'bg-white text-[#0B192C]'}`}
  >
    {/* Large Quote Icon Watermark */}
    <FaQuoteRight className={`absolute -top-4 -right-4 text-8xl opacity-5 transition-transform group-hover:scale-110 
      ${item.size === 'lg' ? 'text-white' : 'text-[#FF7A00]'}`} 
    />

    <div className="flex gap-1 mb-4">
      {[...Array(item.rating)].map((_, i) => (
        <FaStar key={i} className="text-[#FF7A00]" size={14} />
      ))}
    </div>

    <p className={`text-lg font-medium leading-relaxed mb-6 italic`}>
      "{item.text}"
    </p>

    <div className="flex flex-col">
      <span className="font-black uppercase tracking-tighter text-xl">{item.name}</span>
      <span className={`text-xs font-bold uppercase tracking-widest mt-1 
        ${item.size === 'lg' ? 'text-[#FF7A00]' : 'text-gray-400'}`}>
        {item.company}
      </span>
    </div>

    {/* Bottom Accent Bar */}
    <div className={`absolute bottom-0 left-0 h-1.5 w-0 group-hover:w-full transition-all duration-500 bg-[#FF7A00]`}></div>
  </motion.div>
);

const Reviews = () => {
  return (
    <section className="py-24 px-6 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-[#FF7A00] font-extrabold tracking-widest uppercase text-sm">// CLIENT REVIEWS</span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-4">
            <h2 className="text-[#0B192C] text-4xl lg:text-5xl font-black leading-tight max-w-2xl">
              Trusted by Hundreds of <span className="text-[#FF7A00]">Global Partners</span>
            </h2>
            <p className="text-gray-500 max-w-md pb-2">
              Don't just take our word for it. Here is how we've helped businesses move beyond their expectations.
            </p>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <TestimonialCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;