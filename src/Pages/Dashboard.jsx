import React, { useState, useContext } from 'react';
import {
  LayoutDashboard, Package, Wallet, Users, Truck,
  Settings, Anchor, Bell, Menu, Activity, ShieldCheck, LogOut
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import Shipments from '../Components/dashboard/Shipments';
import Overview from '../Components/dashboard/Overview';
import { useLoaderData } from 'react-router-dom';
import AllUsers from '../Components/Users';
import ShipmentModal from '../Components/dashboard/ShipmentModal';
import Destinations from '../Components/dashboard/Destinations';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser, updateUser } = useContext(AuthContext); // Added logout capability
  const data = useLoaderData();

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans overflow-x-hidden">

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-[#0B192C] text-white p-6 
          transform transition-transform duration-500 ease-in-out border-r border-white/5
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:flex flex-col z-[60]`}
      >
        {/* LOGO AREA */}
        <div className="flex items-center gap-4 mb-14 px-2">
          <div className="bg-[#FF7A00] p-3 rounded-2xl shadow-lg shadow-[#FF7A00]/20">
            <Anchor className="text-[#0B192C]" size={28} strokeWidth={3} />
          </div>
          <div>
            <span className="text-xl font-black block tracking-tighter leading-none">DELTAL CARGO</span>
            <span className="text-[9px] text-[#FF7A00] font-black uppercase tracking-[0.3em]">
              Logistics OS
            </span>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="space-y-2 flex-1">
          <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-4 ml-4">Main Menu</p>
          <SidebarItem icon={<LayoutDashboard size={20} />} label="Overview" active={activeTab} setActive={setActiveTab} />
          <SidebarItem icon={<Truck size={20} />} label="Manage Shipments" active={activeTab} setActive={setActiveTab} />
          <SidebarItem icon={<Package size={20} />} label="Add new Shipment" active={activeTab} setActive={setActiveTab}/>
          
          <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mt-10 mb-4 ml-4">Administration</p>
          <SidebarItem icon={<Wallet size={20}/>} label="Shipment Deposits" active={activeTab} setActive={setActiveTab}/>
          <SidebarItem icon={<Users size={20} />} label="Users" active={activeTab} setActive={setActiveTab} />
        </nav>

        {/* USER FOOTER */}
        <div className="mt-auto pt-6 border-t border-white/5">
          <div className="bg-white/5 p-4 rounded-[2rem] flex items-center justify-between">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FF7A00] rounded-full flex items-center justify-center font-black text-[#0B192C]">
                    {currentUser.username.charAt(0).toUpperCase()}
                </div>
                <div>
                    <p className="text-xs font-black truncate max-w-[100px]">{currentUser.username}</p>
                    <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest">Admin Access</p>
                </div>
             </div>
             <button onClick={() => updateUser(null)} className="p-2 hover:bg-red-500/20 hover:text-red-500 rounded-lg transition-colors">
                <LogOut size={18} />
             </button>
          </div>
        </div>
      </aside>

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-[#0B192C]/80 backdrop-blur-sm z-[55] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* TOP BAR */}
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 lg:px-10 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-6">
            <button
              className="lg:hidden bg-[#0B192C] text-white p-3 rounded-2xl shadow-lg"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-[#0B192C] uppercase tracking-tighter">
                {activeTab}
              </h1>
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Terminal Active</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 mr-4 bg-[#0B192C]/5 px-4 py-2 rounded-full border border-[#0B192C]/5">
                <ShieldCheck size={14} className="text-[#0B192C]" />
                <span className="text-[10px] font-black text-[#0B192C] uppercase tracking-widest">Secure Link</span>
            </div>
            <div className="relative cursor-pointer hover:scale-105 transition-transform bg-white border border-gray-100 p-3 rounded-2xl shadow-sm">
              <Bell size={20} className="text-[#0B192C]" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#FF7A00] border-2 border-white rounded-full"></span>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="p-6 lg:p-10 flex-1 overflow-y-auto">
          {activeTab === 'Overview' && <Overview shipments={data.shipments}/>}
          {activeTab === 'Manage Shipments' && <Shipments shipments={data.shipments} />}
          {activeTab === 'Users' && <AllUsers />}
          
          {activeTab === 'Add new Shipment' && (
            <div className="max-w-6xl mx-auto">
              <ShipmentModal 
                mode="create" 
                isFullPage={true} 
                onCreated={() => setActiveTab('Manage Shipments')} 
              />
            </div>
          )}
          {activeTab === 'Shipment Deposits' && <Destinations shipments={data.shipments}/> }
        </div>
      </main>
    </div>
  );
};

// ---------------- STYLED COMPONENTS ----------------

const SidebarItem = ({ icon, label, active, setActive }) => (
  <button
    onClick={() => setActive?.(label)}
    className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.15em] transition-all duration-300 group
      ${active === label 
        ? 'bg-[#FF7A00] text-[#0B192C] shadow-lg shadow-[#FF7A00]/20 translate-x-2' 
        : 'text-white/40 hover:text-white hover:bg-white/5'}
    `}
  >
    <span className={`${active === label ? 'text-[#0B192C]' : 'text-white/20 group-hover:text-[#FF7A00]'} transition-colors`}>
        {icon}
    </span>
    <span>{label}</span>
  </button>
);

export default Dashboard;