import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, X } from 'lucide-react';
import emailjs from '@emailjs/browser';
// Validation Schema
const schema = yup.object().shape({
  user_name: yup.string().required('Full name is required'),
  user_email: yup.string().email('Invalid email format').required('Email is required'),
  user_phone: yup.string().matches(/^(6[5-9]\d{7})$/, "Phone must be numbers only").required('Phone is required'),
  subject: yup.string().required('Please select a subject'),
  message: yup.string().min(20, 'Message must be at least 20 characters').required('Message is required'),
});

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    // Simulate API Call
    try {
      await emailjs.sendForm(
        'service_mumfgug',
        'template_5wwp8xu',
        formRef.current,
        { publicKey: 'GCrCGrB_nyc_CDNsa' }
      );

      // 3. Update toast to success
      setIsSubmitted(true);
      reset(); 
    } catch (error) {
      console.error('Email sending failed:', error);
    }
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl shadow-blue-900/5 overflow-hidden"
        >
          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-black text-blue-900 mb-8 flex items-center gap-3">
              Send us a <span className="text-amber-500">Message</span>
            </h2>

            <form ref={formRef}onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-blue-900 uppercase tracking-wider">Full Name</label>
                <input
                  name='user_name'
                  id='user_name'
                  {...register('user_name')}
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all outline-none ${errors.user_name ? 'border-red-400' : 'border-slate-100 focus:border-amber-500'}`}
                />
                {errors.user_name && <p className="text-red-500 text-xs font-bold">{errors.user_name.message}</p>}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-blue-900 uppercase tracking-wider">Email Address</label>
                <input 
                    name='user_email'
                    id='user_email'
                  {...register('user_email')}
                  placeholder="john@example.com"
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all outline-none ${errors.user_email ? 'border-red-400' : 'border-slate-100 focus:border-amber-500'}`}
                />
                {errors.user_email && <p className="text-red-500 text-xs font-bold">{errors.user_email.message}</p>}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-blue-900 uppercase tracking-wider">Phone Number</label>
                <input 
                    name='user_phone'
                    id='user_phone'
                  {...register('user_phone')}
                  placeholder="+1 (555) 000-0000"
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all outline-none ${errors.user_phone ? 'border-red-400' : 'border-slate-100 focus:border-amber-500'}`}
                />
                {errors.user_phone && <p className="text-red-500 text-xs font-bold">{errors.user_phone.message}</p>}
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-blue-900 uppercase tracking-wider">Subject</label>
                <select 
                    name='subject'
                    id='subject'
                  {...register('subject')}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all outline-none bg-white appearance-none ${errors.subject ? 'border-red-400' : 'border-slate-100 focus:border-amber-500'}`}
                >
                  <option value="">Select Service</option>
                  <option value="air">Air Freight</option>
                  <option value="sea">Sea Freight</option>
                  <option value="road">Road Transport</option>
                  <option value="other">General Inquiry</option>
                </select>
                {errors.subject && <p className="text-red-500 text-xs font-bold">{errors.subject.message}</p>}
              </div>

              {/* Message */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-blue-900 uppercase tracking-wider">Message</label>
                <textarea 
                    name='message'
                    id='message'
                  {...register('message')}
                  rows="5"
                  placeholder="How can we help your logistics needs?"
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all outline-none resize-none ${errors.message ? 'border-red-400' : 'border-slate-100 focus:border-amber-500'}`}
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs font-bold">{errors.message.message}</p>}
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-10 py-4 bg-blue-900 text-white font-black rounded-xl hover:bg-amber-500 transition-all flex items-center justify-center gap-3 disabled:bg-slate-300 shadow-xl shadow-blue-950/10"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send size={18} />
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {isSubmitted && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-blue-950/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 md:p-12 max-w-sm w-full text-center relative shadow-2xl"
            >
              <button 
                onClick={() => setIsSubmitted(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-blue-900 transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={48} className="text-amber-500" />
              </div>
              
              <h3 className="text-2xl font-black text-blue-900 mb-2">Message Sent!</h3>
              <p className="text-slate-500 mb-8">Thank you for reaching out. Our team will review your inquiry and contact you shortly.</p>
              
              <button 
                onClick={() => setIsSubmitted(false)}
                className="w-full py-3 bg-blue-900 text-white font-bold rounded-xl hover:bg-amber-600 transition-colors"
              >
                Great, thanks!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ContactForm;