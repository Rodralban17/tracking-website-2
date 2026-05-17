import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, ShieldCheck, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import apiRequest from '../lib/apiRequest';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../lib/constants';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const schema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });


  const onSubmit = async (data) => {
    const username = data.email;
    const password = data.password;

    try {
      const res = await apiRequest.post("/auth/login/", { username, password });
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      updateUser(res.data);
      toast.success("Login successful!");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      const errorData = err.response?.data;
      if (errorData) {
        if (errorData.detail) {
          const msg = Array.isArray(errorData.detail) ? errorData.detail[0] : errorData.detail;
          toast.error(msg);
        } else {
          Object.keys(errorData).forEach((key) => {
            const msg = Array.isArray(errorData[key]) ? errorData[key][0] : errorData[key];
            toast.error(`${key}: ${msg}`);
          });
        }
      } else {
        toast.error("Connection failed. Is the server running?");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <ToastContainer position="top-center" autoClose={3000} />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100"
      >
        {/* Modern Industrial Header */}
        <div className="bg-[#0B192C] p-12 text-center relative overflow-hidden">
          {/* Animated Background Element */}
          <div className="absolute -top-10 -right-10 opacity-10 rotate-12">
            <ShieldCheck size={180} color="#FF7A00" />
          </div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF7A00]/10 border border-[#FF7A00]/20 text-[#FF7A00] text-[10px] font-black uppercase tracking-widest mb-4">
              <Lock size={12} /> Secure Gateway
            </div>
            <h2 className="text-4xl font-black text-white mb-2 tracking-tighter">
              PORTAL <span className="text-[#FF7A00]">LOGIN</span>
            </h2>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
              Delta Cargo Admin Systems
            </p>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-10 space-y-8">
          <div className="space-y-5">
            
            {/* Email Field */}
            <div className="relative">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1 mb-2 block">
                Auth Identifier (Email)
              </label>
              <div className="relative">
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.email ? 'text-red-500' : 'text-gray-400'}`} size={18} />
                <input 
                  {...register("email")}
                  type="email" 
                  className={`w-full p-4 pl-12 rounded-xl bg-gray-50 border-2 outline-none transition-all font-bold text-[#0B192C] text-sm ${errors.email ? 'border-red-500 bg-red-50' : 'border-transparent focus:border-[#FF7A00] focus:bg-white'}`}
                  placeholder="admin@deltacargo.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-[10px] font-black mt-2 ml-1 flex items-center gap-1 uppercase tracking-wider">
                  <AlertCircle size={12} /> {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1 mb-2 block">
                Secure Keyphrase
              </label>
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
                <p className="text-red-500 text-[10px] font-black mt-2 ml-1 flex items-center gap-1 uppercase tracking-wider">
                  <AlertCircle size={12} /> {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-[#0B192C] hover:bg-[#FF7A00] text-white font-black py-5 rounded-xl shadow-2xl shadow-[#0B192C]/20 flex items-center justify-center gap-3 transition-all duration-300 uppercase tracking-widest text-xs group ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? "Syncing Credentials..." : "Access Dashboard"}
            {!isSubmitting && <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />}
          </button>

          <p className="text-center text-gray-400 text-[10px] font-bold uppercase tracking-[0.1em]">
            Authorized Personnel Only
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;