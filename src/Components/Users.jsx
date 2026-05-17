import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import apiRequest from "../lib/apiRequest";
import { toast } from "react-toastify";
import { UserCheck, UserX, UserPlus, ShieldAlert, Users, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await apiRequest.get("/auth/allusers/");
      // Filtering out the master admin for security
      const filteredUsers = res.data.filter(
        u => u.email !== "alban@gmail.com"
      );
      setUsers(filteredUsers);
    } catch (err) {
      toast.error("SYSTEM: Failed to synchronize user database");
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (userId, currentStatus) => {
    try {
      // Note: Using DELETE for a status toggle is unusual, but keeping your logic as requested
      await apiRequest.delete(`/auth/activate/${userId}/`, {
        is_active: !currentStatus,
      });

      setUsers(users.map(u =>
        u.id === userId ? { ...u, is_active: !currentStatus } : u
      ));

      toast.success(`ACCESS ${!currentStatus ? "GRANTED" : "REVOKED"}`);
    } catch (err) {
      toast.error("PROTOCOL ERROR: Status update failed");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="animate-spin text-[#FF7A00] mb-4" size={40} />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0B192C]">Accessing Registry...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B192C]/5 border border-[#0B192C]/10 text-[#0B192C] text-[10px] font-black uppercase tracking-widest mb-2">
            <ShieldAlert size={12} /> Security Clearance
          </div>
          <h2 className="text-4xl font-black text-[#0B192C] tracking-tighter uppercase">
            Personnel <span className="text-[#FF7A00]">Directory</span>
          </h2>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-1">Authorized system operators only</p>
        </div>

        <Link 
          to="/register" 
          className="flex items-center gap-2 bg-[#0B192C] text-white px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#FF7A00] transition-all shadow-xl shadow-[#0B192C]/10 group"
        >
          <UserPlus size={18} className="group-hover:scale-110 transition-transform" />
          Provision New User
        </Link>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#0B192C] text-white">
              <th className="p-6 text-left text-[10px] font-black uppercase tracking-[0.2em]">Operator</th>
              <th className="p-6 text-left text-[10px] font-black uppercase tracking-[0.2em]">Digital ID</th>
              <th className="p-6 text-left text-[10px] font-black uppercase tracking-[0.2em]">Registry Date</th>
              <th className="p-6 text-left text-[10px] font-black uppercase tracking-[0.2em]">Status</th>
              <th className="p-6 text-right text-[10px] font-black uppercase tracking-[0.2em]">Clearance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.map((u) => (
              <motion.tr
                key={u.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="hover:bg-gray-50/50 transition-colors group"
              >
                <td className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-[#0B192C] font-black group-hover:bg-[#FF7A00] group-hover:text-white transition-all">
                      {u.username.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-black text-[#0B192C] tracking-tight">{u.username}</span>
                  </div>
                </td>
                <td className="p-6 text-sm text-slate-500 font-medium">{u.email}</td>
                <td className="p-6 text-[11px] font-black text-slate-400 uppercase tracking-tighter">
                  {new Date(u.date_joined).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                </td>
                <td className="p-6">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest
                      ${u.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${u.is_active ? "bg-green-600 animate-pulse" : "bg-red-600"}`}></span>
                    {u.is_active ? "Verified" : "Restricted"}
                  </span>
                </td>
                <td className="p-6 text-right">
                  <button
                    onClick={() => toggleStatus(u.id, u.is_active)}
                    className={`px-5 py-2.5 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all
                      ${u.is_active
                        ? "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white"
                        : "bg-green-50 text-green-600 hover:bg-green-600 hover:text-white"}`}
                  >
                    {u.is_active ? "Revoke Access" : "Grant Access"}
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="md:hidden space-y-4">
        {users.map((u) => (
          <motion.div
            key={u.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-[2rem] p-6 shadow-lg border border-gray-100"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#0B192C] text-[#FF7A00] rounded-2xl flex items-center justify-center font-black">
                  {u.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-black text-[#0B192C] uppercase tracking-tight">{u.username}</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{u.email}</p>
                </div>
              </div>
              {u.is_active ? (
                <UserCheck className="text-green-600" size={20} />
              ) : (
                <UserX className="text-red-600" size={20} />
              )}
            </div>

            <div className="bg-gray-50 rounded-xl p-3 mb-4">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Enrollment Date</p>
                <p className="text-xs font-bold text-[#0B192C]">{new Date(u.date_joined).toLocaleDateString()}</p>
            </div>

            <button
              onClick={() => toggleStatus(u.id, u.is_active)}
              className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-sm
                ${u.is_active
                  ? "bg-red-50 text-red-600 border border-red-100"
                  : "bg-green-50 text-green-600 border border-green-100"}`}
            >
              {u.is_active ? "Deactivate Operator" : "Activate Operator"}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;