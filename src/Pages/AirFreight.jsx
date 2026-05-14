import React from 'react';
import { motion } from 'framer-motion';
import { 
  Plane, 
  ShieldCheck, 
  Clock, 
  Globe, 
  ArrowRight, 
  Phone, 
  Mail,
  Zap,
  BarChart3
} from 'lucide-react';

const AirFreightPage = () => {
  const contactInfo = {
    phone: "+1 (385) 235-3442",
    email: "support@deltacargo.com"
  };

  const performanceStats = [
    { label: "On-Time Delivery", value: "99.2%" },
    { label: "Global Reach", value: "180+ Countries" },
    { label: "Avg. Transit Time", value: "3-5 Days" }
  ];

  return (
    <div className="min-h-screen bg-white font-sans py-15">
      {/* 1. ULTRA-MODERN HERO SECTION */}
      <section className="relative h-[85vh] flex items-center bg-[#0B192C] overflow-hidden">
        {/* Background Image with Technical Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/air.jpg" // Use a high-quality cargo plane shot
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
            alt="Air Cargo Logistics"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B192C] via-[#0B192C]/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#FF7A00]/10 border border-[#FF7A00]/20 text-[#FF7A00] text-xs font-black uppercase tracking-[0.2em] mb-8">
              <Zap size={14} /> Priority Air Solutions
            </div>
            <h1 className="text-6xl lg:text-8xl font-black text-white leading-[0.9] mb-8">
              SPEED IS <br />
              <span className="text-[#FF7A00]">OUR DATA.</span>
            </h1>
            <p className="text-gray-400 text-xl font-medium max-w-md leading-relaxed mb-10">
              Moving high-value assets across continents with algorithmic precision and zero-margin for error.
            </p>
            <div className="flex flex-wrap gap-4">
              
              <div className="flex items-center gap-4 px-6 text-white border-l border-white/10">
                <BarChart3 className="text-[#FF7A00]" />
                <span className="text-sm font-bold tracking-widest uppercase">Live Tracking Active</span>
              </div>
            </div>
          </motion.div>

          {/* Floating Performance Cards */}
          <div className="hidden lg:flex flex-col justify-center gap-6">
            {performanceStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 * i }}
                className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl w-64 self-end"
              >
                <p className="text-[#FF7A00] text-3xl font-black">{stat.value}</p>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. CORE CAPABILITIES (The "New Text") */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            <div className="space-y-6">
              <div className="w-16 h-16 bg-[#0B192C] rounded-2xl flex items-center justify-center text-[#FF7A00] shadow-xl">
                <Globe size={32} />
              </div>
              <h3 className="text-2xl font-black text-[#0B192C]">Global Hub Network</h3>
              <p className="text-gray-600 font-medium leading-relaxed">
                We operate through a network of 150+ strategic airport hubs, ensuring that your cargo bypasses traditional congestion points via optimized flight routing.
              </p>
            </div>

            <div className="space-y-6">
              <div className="w-16 h-16 bg-[#FF7A00] rounded-2xl flex items-center justify-center text-white shadow-xl">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-2xl font-black text-[#0B192C]">Secure Chain of Custody</h3>
              <p className="text-gray-600 font-medium leading-relaxed">
                From electronics to pharmaceuticals, our air freight solutions include end-to-end security protocols and real-time environmental monitoring for sensitive loads.
              </p>
            </div>

            <div className="space-y-6">
              <div className="w-16 h-16 bg-[#0B192C] rounded-2xl flex items-center justify-center text-[#FF7A00] shadow-xl">
                <Clock size={32} />
              </div>
              <h3 className="text-2xl font-black text-[#0B192C]">Time-Critical Logistics</h3>
              <p className="text-gray-600 font-medium leading-relaxed">
                When every minute costs money, our "Next Flight Out" (NFO) service ensures your urgent components are prioritized and processed through express channels.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. TECHNICAL EXPLANATION & CONTACT */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          
          <div className="lg:col-span-7">
            <h2 className="text-4xl font-black text-[#0B192C] mb-10 leading-tight">
              A Higher Standard for <br />
              <span className="text-[#FF7A00]">Aerospace Logistics</span>
            </h2>
            <div className="prose prose-lg text-gray-600 font-medium">
              <p className="mb-6">
                Delta Cargo’s air freight division isn’t just a transport service; it’s an engineered solution. We treat every shipment as a unique data point in a vast global matrix. By integrating directly with airline manifests and ground handling systems, we provide a level of transparency that was previously impossible.
              </p>
              <p>
                Our specialized team in Yaoundé coordinates with international partners to manage the heavy lifting of documentation, allowing you to focus on your core business while we handle the complexities of the stratosphere.
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["Full Charter Services", "Express Door-to-Door", "Dangerous Goods Handling", "Consolidated Air Volume"].map((item, i) => (
                <div key={i} className="flex items-center gap-3 font-black text-[#0B192C]">
                  <div className="w-2 h-2 rounded-full bg-[#FF7A00]" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* STICKY CONTACT CARD */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="bg-[#0B192C] p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
              <div className="relative z-10 text-white">
                <h4 className="text-2xl font-black mb-2">Speak to an Expert</h4>
                <p className="text-gray-400 mb-10 font-medium text-sm italic">Immediate assistance for Air Freight inquiries</p>
                
                <div className="space-y-8">
                  <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-[#FF7A00] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Phone className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#FF7A00]">Phone Line</p>
                      <p className="text-xl font-black group-hover:text-[#FF7A00] transition-colors">{contactInfo.phone}</p>
                    </div>
                  </a>

                  <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#FF7A00] transition-colors">
                      <Mail className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Email Support</p>
                      <p className="text-xl font-black group-hover:text-[#FF7A00] transition-colors lowercase">{contactInfo.email}</p>
                    </div>
                  </a>
                </div>

                <hr className="my-10 border-white/5" />

              
              </div>
              
              {/* Decorative Blur */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#FF7A00]/20 rounded-full blur-[100px]" />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default AirFreightPage;