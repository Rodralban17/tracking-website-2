import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
//import apiRequest from '../lib/apiRequest';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Ship, 
  AlertCircle,
  ShieldCheck
} from 'lucide-react';

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Full name must be at least 3 characters")
    .required("Full name is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Include at least one uppercase letter")
    .matches(/[0-9]/, "Include at least one number")
    .required("Password is required"),
});

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await apiRequest.post("/auth/register/", {
        username: data.name,
        password: data.password,
        email: data.email,
      });

      toast.success("Account created successfully! Redirecting...");
      reset(); 

      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      if (err.response && err.response.status === 400) {
        const backendErrors = err.response.data;
        Object.keys(backendErrors).forEach((field) => {
          toast.error(`${field}: ${backendErrors[field][0]}`);
        });
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 pt-20 pb-10">
      <ToastContainer position="top-right" autoClose={4000} />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100"
      >
        {/* Header - Navy & Orange Theme */}
        <div className="bg-[#0B192C] p-10 text-center relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute -top-6 -right-6 opacity-10">
            <Ship size={140} color="#FF7A00" />
          </div>

          <div className="relative z-10">
            <div className="bg-[#FF7A00] w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl rotate-3">
              <ShieldCheck size={28} className="text-white" />
            </div>
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Join the <span className="text-[#FF7A00]">Network</span></h2>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mt-2">
              Authorized Cargo Partner Registration
            </p>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-10 space-y-6">
          
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1 block">Full Name</label>
            <div className="relative">
              <User className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.name ? 'text-red-500' : 'text-gray-400'}`} size={18} />
              <input 
                {...register("name")}
                className={`w-full p-4 pl-12 rounded-xl bg-gray-50 border-2 outline-none transition-all font-bold text-[#0B192C] text-sm ${errors.name ? 'border-red-500 bg-red-50' : 'border-transparent focus:border-[#FF7A00] focus:bg-white'}`}
                placeholder="Ex: Marc Ngoumou"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-[10px] font-black ml-1 flex items-center gap-1 mt-1 uppercase tracking-wider">
                <AlertCircle size={12}/> {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Address */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1 block">Corporate Email</label>
            <div className="relative">
              <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.email ? 'text-red-500' : 'text-gray-400'}`} size={18} />
              <input 
                {...register("email")}
                className={`w-full p-4 pl-12 rounded-xl bg-gray-50 border-2 outline-none transition-all font-bold text-[#0B192C] text-sm ${errors.email ? 'border-red-500 bg-red-50' : 'border-transparent focus:border-[#FF7A00] focus:bg-white'}`}
                placeholder="name@deltacargo.com"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-[10px] font-black ml-1 flex items-center gap-1 mt-1 uppercase tracking-wider">
                <AlertCircle size={12}/> {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1 block">Access Keyphrase</label>
            <div className="relative">
              <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.password ? 'text-red-500' : 'text-gray-400'}`} size={18} />
              <input 
                {...register("password")}
                type={showPassword ? "text" : "password"}
                className={`w-full p-4 pl-12 pr-12 rounded-xl bg-gray-50 border-2 outline-none transition-all font-bold text-[#0B192C] text-sm ${errors.password ? 'border-red-500 bg-red-50' : 'border-transparent focus:border-[#FF7A00] focus:bg-white'}`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0B192C] transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-[10px] font-black ml-1 flex items-center gap-1 mt-1 uppercase tracking-wider">
                <AlertCircle size={12}/> {errors.password.message}
              </p>
            )}
          </div>

          {/* Submission Button */}
          <button 
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-[#0B192C] hover:bg-[#FF7A00] text-white font-black py-5 rounded-xl shadow-2xl shadow-[#0B192C]/20 transition-all duration-300 flex items-center justify-center gap-3 group mt-4 uppercase tracking-[0.2em] text-[10px] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Processing...
              </span>
            ) : (
              <>
                Initialize Account
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <p className="text-center text-gray-400 text-[10px] font-black uppercase tracking-widest mt-6">
            Already registered? <Link to="/login"> <span className="text-[#FF7A00] hover:text-[#0B192C] transition-colors cursor-pointer">Log in to Hub</span></Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default RegisterPage;