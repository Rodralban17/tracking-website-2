import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import apiRequest from "../../lib/apiRequest";
import { toast } from "react-toastify";
import { UserCheck, Plus, Edit, Users, Globe, Mail, MapPin } from "lucide-react";
import { PartyModal } from "./PartyModal";

const SellersReceiver = () => {
  const [parties, setParties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentParty, setCurrentParty] = useState(null);

  const fetchParties = async () => {
    try {
      const res = await apiRequest.get("/parties/");
      setParties(res.data);
    } catch (err) {
      toast.error("Failed to load global directory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParties();
  }, []);

  const handleAdd = () => {
    setCurrentParty(null);
    setModalOpen(true);
  };

  const handleEdit = (party) => {
    setCurrentParty(party);
    setModalOpen(true);
  };

  const handleSaved = (savedParty) => {
    if (currentParty) {
      setParties(parties.map((p) => (p.id === savedParty.id ? savedParty : p)));
    } else {
      setParties([savedParty, ...parties]);
    }
    setModalOpen(false);
  };

  return (
    <div className="p-2">
      {/* HEADER SECTION */}
      <div className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B192C]/5 border border-[#0B192C]/10 text-[#0B192C] text-[10px] font-black uppercase tracking-widest mb-2">
            <Users size={12} /> Registry Database
          </div>
          <h2 className="text-3xl font-black text-[#0B192C] tracking-tighter uppercase">
            Sellers & <span className="text-[#FF7A00]">Receivers</span>
          </h2>
        </div>
        
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-[#0B192C] text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#FF7A00] transition-all shadow-xl shadow-[#0B192C]/20"
        >
          <Plus size={16} /> Register New Entity
        </button>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#0B192C] text-white">
              <th className="p-6 text-left text-[10px] font-black uppercase tracking-[0.2em]">Partner Name</th>
              <th className="p-6 text-left text-[10px] font-black uppercase tracking-[0.2em]">Contact Details</th>
              <th className="p-6 text-left text-[10px] font-black uppercase tracking-[0.2em]">Location</th>
              <th className="p-6 text-left text-[10px] font-black uppercase tracking-[0.2em]">Full Address</th>
              <th className="p-6 text-right text-[10px] font-black uppercase tracking-[0.2em]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {parties.map((p) => (
              <motion.tr 
                key={p.id} 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="hover:bg-gray-50/80 transition-colors group"
              >
                <td className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-[#0B192C] font-black text-xs group-hover:bg-[#FF7A00] group-hover:text-white transition-all">
                      {p.name.charAt(0)}
                    </div>
                    <span className="font-black text-[#0B192C] tracking-tight">{p.name}</span>
                  </div>
                </td>
                <td className="p-6">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                      <Mail size={12} className="text-[#FF7A00]" /> {p.email}
                    </div>
                    <div className="text-[10px] font-black text-gray-400">{p.phone}</div>
                  </div>
                </td>
                <td className="p-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-100 text-[#0B192C] text-[10px] font-black uppercase tracking-wider">
                    <Globe size={12} /> {p.location}
                  </div>
                </td>
                <td className="p-6 text-xs font-bold text-gray-400 max-w-[200px] truncate">
                  {p.address}
                </td>
                <td className="p-6 text-right">
                  <button
                    onClick={() => handleEdit(p)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#0B192C] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#FF7A00] transition-all"
                  >
                    <Edit size={12} /> Modify
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="md:hidden space-y-4">
        {parties.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2rem] p-6 shadow-lg border border-gray-100 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5">
               <UserCheck size={80} color="#0B192C" />
            </div>
            <div className="relative z-10">
              <p className="text-[10px] font-black text-[#FF7A00] uppercase tracking-widest mb-1">{p.location}</p>
              <h4 className="font-black text-[#0B192C] text-lg mb-4">{p.name}</h4>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                  <Mail size={14} /> {p.email}
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                  <MapPin size={14} /> {p.address}
                </div>
              </div>

              <button
                onClick={() => handleEdit(p)}
                className="w-full py-3 bg-gray-100 text-[#0B192C] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#0B192C] hover:text-white transition-all"
              >
                Update Profile
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Party Modal */}
      {modalOpen && (
        <PartyModal
          party={currentParty}
          onClose={() => setModalOpen(false)}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
};

export default SellersReceiver;