import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  MessageSquare, 
  X, 
  Headphones 
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
const FloatingActionContact = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { 
      icon: <FaWhatsapp size={24} />, 
      color: 'bg-[#25D366]', 
      label: 'WhatsApp',
      link: 'https://wa.me/13852353442' 
    },
    // { 
    //   icon: <Phone size={24} />, 
    //   color: 'bg-[#00E676]', 
    //   label: 'Call Us',
    //   link: 'tel:+13613883484' 
    // },
    { 
      icon: <Mail size={24} />, 
      color: 'bg-[#FF5252]', 
      label: 'Email',
      link: 'mailto:deltacargologisticss@gmail.com' 
    },
    // { 
    //   icon: <MessageSquare size={24} />, 
    //   color: 'bg-[#FF4081]', 
    //   label: 'iMessage',
    //   link: 'imessage://deltallogistics8@icloud.com'
    // },
  ];

  return (
    <div className="fixed bottom-8 left-8 z-[9999] flex flex-col items-center">
      {/* Action Buttons Pop-up */}
      <div className="flex flex-col-reverse gap-4 mb-4">
        <AnimatePresence>
          {isOpen && actions.map((action, index) => (
            <motion.a
              key={index}
              href={action.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              transition={{ delay: index * 0.05, type: 'spring', stiffness: 260, damping: 20 }}
              className={`${action.color} text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center group relative`}
            >
              {action.icon}
              {/* Tooltip Label */}
              <span className="absolute left-16 bg-blue-900 text-white text-xs font-bold px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
                {action.label}
              </span>
            </motion.a>
          ))}
        </AnimatePresence>
      </div>

      {/* Main Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`${isOpen ? 'bg-slate-400' : 'bg-red-900'} text-white p-5 rounded-full shadow-2xl flex items-center justify-center transition-colors duration-300`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={32} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageSquare size={32} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default FloatingActionContact;