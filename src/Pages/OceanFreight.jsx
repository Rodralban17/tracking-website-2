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

const OceanFreightPage = () => {
  const contactInfo = {
    phone: "+1 (385) 235-3442",
    email: "support@deltacargo.com"
  };

  const performanceStats = [
    { label: "Projects Delivered", value: "500+" },
    { label: "Client Satisfaction", value: "98%" },
    { label: "Support Availability", value: "24/7" }
  ];

  return (
    <div className="min-h-screen bg-white font-sans py-20">
      {/* HERO SECTION */}
      <section className="relative h-[85vh] flex items-center bg-[#0B192C] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/ocean.jpg"
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
            alt="Professional Services"
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
              <Zap size={14} /> Professional Solutions
            </div>

            <h1 className="text-6xl lg:text-8xl font-black text-white leading-[0.9] mb-8">
              SMARTER <br />
              <span className="text-[#FF7A00]">BUSINESS SERVICES.</span>
            </h1>

            <p className="text-gray-400 text-xl font-medium max-w-md leading-relaxed mb-10">
              We help businesses and individuals achieve their goals through reliable, modern, and efficient professional services tailored to their needs.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-4 px-6 text-white border-l border-white/10">
                <BarChart3 className="text-[#FF7A00]" />
                <span className="text-sm font-bold tracking-widest uppercase">
                  Trusted By Growing Businesses
                </span>
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
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE SERVICES */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            <div className="space-y-6">
              <div className="w-16 h-16 bg-[#0B192C] rounded-2xl flex items-center justify-center text-[#FF7A00] shadow-xl">
                <Globe size={32} />
              </div>

              <h3 className="text-2xl font-black text-[#0B192C]">
                Global Business Support
              </h3>

              <p className="text-gray-600 font-medium leading-relaxed">
                We provide reliable solutions designed to help businesses expand, operate efficiently, and connect with opportunities across international markets.
              </p>
            </div>

            <div className="space-y-6">
              <div className="w-16 h-16 bg-[#FF7A00] rounded-2xl flex items-center justify-center text-white shadow-xl">
                <ShieldCheck size={32} />
              </div>

              <h3 className="text-2xl font-black text-[#0B192C]">
                Trusted & Secure Services
              </h3>

              <p className="text-gray-600 font-medium leading-relaxed">
                Our team is committed to professionalism, transparency, and quality service delivery, ensuring every client receives dependable support from start to finish.
              </p>
            </div>

            <div className="space-y-6">
              <div className="w-16 h-16 bg-[#0B192C] rounded-2xl flex items-center justify-center text-[#FF7A00] shadow-xl">
                <Clock size={32} />
              </div>

              <h3 className="text-2xl font-black text-[#0B192C]">
                Fast & Efficient Execution
              </h3>

              <p className="text-gray-600 font-medium leading-relaxed">
                We understand the importance of time. Our streamlined processes ensure projects and services are delivered efficiently without compromising quality.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ABOUT & CONTACT */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          
          <div className="lg:col-span-7">
            <h2 className="text-4xl font-black text-[#0B192C] mb-10 leading-tight">
              Professional Excellence <br />
              <span className="text-[#FF7A00]">Built Around Your Needs</span>
            </h2>

            <div className="prose prose-lg text-gray-600 font-medium">
              <p className="mb-6">
                Our mission is to deliver modern and effective solutions that help businesses and individuals move forward with confidence. We combine expertise, innovation, and customer-focused strategies to create services that truly make a difference.
              </p>

              <p>
                From consultation to execution, our dedicated team works closely with every client to ensure high-quality results, seamless communication, and long-term value.
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Professional Consulting",
                "Customer Support Services",
                "Project Management",
                "Business Growth Solutions"
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 font-black text-[#0B192C]"
                >
                  <div className="w-2 h-2 rounded-full bg-[#FF7A00]" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* CONTACT CARD */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="bg-[#0B192C] p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
              <div className="relative z-10 text-white">
                <h4 className="text-2xl font-black mb-2">
                  Speak to an Expert
                </h4>

                <p className="text-gray-400 mb-10 font-medium text-sm italic">
                  Contact our team for professional assistance and personalized solutions
                </p>
                
                <div className="space-y-8">
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="flex items-center gap-6 group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#FF7A00] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Phone className="text-white" size={24} />
                    </div>

                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#FF7A00]">
                        Phone Line
                      </p>

                      <p className="text-xl font-black group-hover:text-[#FF7A00] transition-colors">
                        {contactInfo.phone}
                      </p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center gap-6 group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#FF7A00] transition-colors">
                      <Mail className="text-white" size={24} />
                    </div>

                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                        Email Support
                      </p>

                      <p className="text-xl font-black group-hover:text-[#FF7A00] transition-colors lowercase">
                        {contactInfo.email}
                      </p>
                    </div>
                  </a>
                </div>

                <hr className="my-10 border-white/5" />
              </div>

              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#FF7A00]/20 rounded-full blur-[100px]" />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default OceanFreightPage;