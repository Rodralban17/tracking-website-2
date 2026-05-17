import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Anchor, Plane, Truck, Copy, CheckCircle2, TrendingUp, Box, Activity, CheckCircle } from 'lucide-react';

const Overview = ({ shipments = [] }) => {
  const totalOrders = shipments.length;
  const inTransit = shipments.filter(s => s.status === "IN_TRANSIT").length;
  const delivered = shipments.filter(s => s.status === "DELIVERED").length;
  const pending = shipments.filter(s => s.status === "PENDING").length;

  return (
    <div className="p-2">
      {/* HEADER INFO */}
      <div className="mb-8">
        <h2 className="text-3xl font-black text-[#0B192C] tracking-tighter uppercase">
          Operational <span className="text-[#FF7A00]">Overview</span>
        </h2>
        <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
          Real-time logistics telemetry
        </p>
      </div>

      {/* STAT CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard 
          title="Total Shipments" 
          value={totalOrders} 
          trend="+12.5%" 
          icon={<Box size={20} />}
          color="border-l-[#0B192C]"
        />
        <StatCard 
          title="In Transit" 
          value={inTransit} 
          trend="Active" 
          icon={<Activity size={20} />}
          color="border-l-[#FF7A00]"
          trendBg="bg-[#FF7A00]/10 text-[#FF7A00]"
        />
        <StatCard 
          title="Delivered" 
          value={delivered} 
          trend={delivered ? `${Math.round((delivered / totalOrders) * 100)}%` : "0%"} 
          icon={<CheckCircle size={20} />}
          color="border-l-green-500"
          trendBg="bg-green-100 text-green-600"
        />
        <StatCard 
          title="Pending Queue" 
          value={pending} 
          trend={pending ? `${Math.round((pending / totalOrders) * 100)}%` : "0%"} 
          icon={<TrendingUp size={20} />}
          color="border-l-amber-500"
          trendBg="bg-amber-100 text-amber-600"
        />
      </div>

      {/* ADDITIONAL CONTENT SPACE (Generator or Charts would go here) */}
      <div className="rounded-[2.5rem] border-2 border-dashed border-gray-200 h-48 flex items-center justify-center bg-gray-50/50">
        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
          Fleet Analytics Module Ready
        </p>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, trend, icon, color, trendBg = "bg-gray-100 text-gray-600" }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`bg-white p-6 rounded-3xl shadow-xl shadow-gray-200/50 border-l-[6px] ${color} transition-all`}
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 rounded-2xl bg-gray-50 text-[#0B192C]">
        {icon}
      </div>
      <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter ${trendBg}`}>
        {trend}
      </span>
    </div>
    
    <div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{title}</p>
      <h4 className="text-4xl font-black text-[#0B192C] tracking-tighter">{value}</h4>
    </div>
  </motion.div>
);

const TransportBtn = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`p-6 rounded-[2rem] flex flex-col items-center gap-3 border-2 transition-all duration-300
      ${active 
        ? 'bg-[#0B192C] text-white border-[#0B192C] shadow-xl shadow-[#0B192C]/20' 
        : 'bg-white text-gray-400 border-gray-100 hover:border-[#FF7A00]/30 hover:bg-gray-50'}`}
  >
    <div className={`${active ? 'text-[#FF7A00]' : 'text-gray-300'}`}>
      {icon}
    </div>
    <span className="text-[10px] font-black uppercase tracking-[0.2em]">{label}</span>
  </button>
);

export default Overview;