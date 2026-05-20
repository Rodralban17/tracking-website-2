import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react';

const contactDetails = [
  {
    title: "Phone",
    info: "+1 (385) 235-3442",
    description: "Our dedicated support line is open 24/7 to assist with your global logistics inquiries.",
    icon: <Phone className="w-8 h-8 text-amber-500" />,
    action: "Call Now",
    link: "tel:+1 (385) 235-3442"
  },
  {
    title: "Email",
    info: "deltacargologisticss@gmail.com",
    description: "Send us your requirements and our team will get back to you with a tailored solution within 24 hours.",
    icon: <Mail className="w-8 h-8 text-amber-500" />,
    action: "Send Email",
    link: "mailto:deltacargologisticss@gmail.com"
  },
  // {
  //   title: "Location",
  //   info: "4 apt. Flaming Street, The Grand Avenue",
  //   description: "Liverpool, UK 33342. Visit our regional headquarters for in-person consultations.",
  //   icon: <MapPin className="w-8 h-8 text-amber-500" />,
  //   action: "View On Google Map",
  //   link: "https://maps.google.com"
  // }
];

const ContactSection = () => {
  return (
    <section className="bg-white">
      {/* 1. Contact Hero Header */}
      <div className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80" 
            alt="Contact ShipGlobal" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-950/80 mix-blend-multiply" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center space-y-4"
        >
          <h1 className="text-5xl md:text-6xl font-black text-white">Contact Us</h1>
          <p className="text-amber-500 font-bold tracking-[0.4em] uppercase text-sm">Get In Touch</p>
        </motion.div>
      </div>

      {/* 2. Contact Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactDetails.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/60 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="mb-6 p-4 rounded-2xl bg-slate-50 group-hover:bg-amber-50 transition-colors">
                {item.icon}
              </div>
              
              <h3 className="text-xl font-black text-blue-900 mb-2 uppercase tracking-tight">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                {item.description}
              </p>
              
              <div className="mt-auto space-y-4">
                <span className="block text-blue-900 font-bold text-lg">{item.info}</span>
                <a 
                  href={item.link}
                  className="inline-flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-widest hover:text-blue-900 transition-colors"
                >
                  {item.action} <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;