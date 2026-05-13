import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "How can I track my shipment?",
    answer: "You can track your shipment in real-time by entering your tracking number on our 'Track & Trace' page. Our system provides status updates from pickup to final delivery."
  },
  {
    question: "What types of cargo do you handle?",
    answer: "We specialize in a wide range of cargo, including Air and Sea freight, 3PL warehouse solutions, and specialized transportation for oversized or sensitive items."
  },
  {
    question: "Do you provide international customs clearance?",
    answer: "Yes, we have dedicated experts who handle customs clearing and documentation to ensure your goods move across borders without unnecessary delays."
  },
  {
    question: "How are your shipping costs calculated?",
    answer: "Costs are based on weight, dimensions, destination, and the level of service required. We strive to provide streamlined solutions to minimize your costs."
  }
];

const AccordionItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className={`border-b border-gray-100 transition-all duration-300 ${isOpen ? 'bg-[#F9FAFB] px-4 rounded-xl' : 'bg-transparent'}`}>
      <button
        className="w-full py-6 flex items-center justify-between text-left group"
        onClick={onClick}
      >
        <span className={`text-lg font-black tracking-tight transition-colors ${isOpen ? 'text-[#FF7A00]' : 'text-[#0B192C] group-hover:text-[#FF7A00]'}`}>
          {question}
        </span>
        <div className={`shrink-0 ml-4 p-2 rounded-lg transition-all duration-300 ${isOpen ? 'bg-[#FF7A00] text-white rotate-180' : 'bg-gray-100 text-[#0B192C]'}`}>
          {isOpen ? <Minus size={16} strokeWidth={3} /> : <Plus size={16} strokeWidth={3} />}
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-500 font-medium leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF7A00]/10 text-[#FF7A00] text-xs font-black uppercase tracking-widest">
            <HelpCircle size={14} />
            Common Questions
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-[#0B192C]">
            Frequently Asked <span className="text-[#FF7A00]">Questions</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto font-medium">
            Find quick answers to the most common inquiries about our logistics services and global shipping processes.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>

        {/* Support CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-10 bg-[#0B192C] rounded-[2rem] text-center text-white relative overflow-hidden shadow-2xl"
        >
          <div className="relative z-10">
            <h3 className="text-2xl font-black mb-2 text-white">Still have questions?</h3>
            <p className="text-gray-400 mb-8 font-medium">Our support team is available 24/7 to help with your logistics needs.</p>
            <button className="bg-[#FF7A00] hover:bg-white hover:text-[#0B192C] text-white font-black px-10 py-4 rounded-xl transition-all duration-300 uppercase tracking-widest text-sm shadow-xl shadow-[#FF7A00]/20">
              Contact Support
            </button>
          </div>
          {/* Decorative background blur */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#FF7A00]/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 bg-[#FF7A00]/10 rounded-full blur-[80px]" />
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;