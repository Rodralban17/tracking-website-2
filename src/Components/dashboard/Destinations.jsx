import { useState } from "react";
import { Plus, Edit, Package, MapPin, Navigation, ArrowRight } from "lucide-react";
import DestinationModal from "./DestinationModal";

const Destinations = ({ shipments: initialShipments }) => {
  const [shipments, setShipments] = useState(initialShipments || []);

  // Destination Modal
  const [openDestModal, setOpenDestModal] = useState(false);
  const [destMode, setDestMode] = useState("add");
  const [currentShipmentId, setCurrentShipmentId] = useState(null);
  const [currentDestination, setCurrentDestination] = useState(null);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF7A00]/10 border border-[#FF7A00]/20 text-[#FF7A00] text-[10px] font-black uppercase tracking-widest mb-2">
            <Navigation size={12} /> Logistics Hub
          </div>
          <h2 className="text-3xl font-black text-[#0B192C] flex items-center gap-3 tracking-tighter">
            DESTINATION <span className="text-[#FF7A00]">CONTROL</span>
          </h2>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Manifests</p>
          <p className="text-2xl font-black text-[#0B192C]">{shipments.length}</p>
        </div>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#0B192C] text-white">
              <th className="p-6 text-left text-[10px] font-black uppercase tracking-[0.2em]">Shipment Identifier</th>
              <th className="p-6 text-left text-[10px] font-black uppercase tracking-[0.2em]">Journey Telemetry & Milestones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {shipments.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50/80 transition-colors group">
                <td className="p-6 align-top">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-[#0B192C] group-hover:bg-[#FF7A00] group-hover:text-white transition-all">
                      <Package size={20} />
                    </div>
                    <div>
                      <div className="font-black text-[#0B192C] text-lg tracking-tight">{s.tracking_number}</div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{s.shipment_type}</div>
                    </div>
                  </div>
                </td>
                <td className="p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => { setDestMode("add"); setCurrentShipmentId(s.id); setOpenDestModal(true); }}
                        className="text-[10px] inline-flex items-center gap-2 font-black text-[#FF7A00] bg-[#FF7A00]/5 border border-[#FF7A00]/20 px-4 py-2 rounded-xl hover:bg-[#FF7A00] hover:text-white transition-all uppercase tracking-widest"
                      >
                        <Plus size={14} /> Add Milestone
                      </button>
                      <span className="text-[10px] font-bold text-gray-400">{s.destinations?.length || 0} Steps Logged</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {s.destinations?.map((d) => (
                        <div 
                          key={d.id} 
                          className={`flex justify-between items-center p-3 rounded-xl border-2 transition-all ${d.arrived ? 'bg-green-50/50 border-green-100' : 'bg-gray-50 border-transparent'}`}
                        >
                          <div className="flex items-center gap-3 overflow-hidden">
                            <div className={`w-2 h-2 rounded-full shrink-0 ${d.arrived ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
                            <span className="font-bold text-[#0B192C] text-[11px] truncate uppercase tracking-tight">
                              {d.address}
                            </span>
                          </div>
                          <button
                            onClick={() => { setDestMode("edit"); setCurrentDestination(d); setOpenDestModal(true); }}
                            className="p-2 text-gray-400 hover:text-[#FF7A00] transition-colors"
                          >
                            <Edit size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="md:hidden space-y-4">
        {shipments.map((s) => (
          <div key={s.id} className="bg-white p-6 rounded-[2rem] shadow-lg border border-gray-100 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tracking ID</p>
                <h4 className="font-black text-[#0B192C] text-xl">{s.tracking_number}</h4>
              </div>
              <div className="bg-[#0B192C] p-2 rounded-lg text-white">
                <Package size={18} />
              </div>
            </div>
            
            <button
              onClick={() => { setDestMode("add"); setCurrentShipmentId(s.id); setOpenDestModal(true); }}
              className="w-full py-4 text-[10px] font-black bg-[#0B192C] text-white rounded-2xl flex items-center justify-center gap-2 uppercase tracking-widest shadow-lg shadow-[#0B192C]/20"
            >
              Adjust Manifest ({s.destinations?.length || 0}) <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>

      {openDestModal && (
        <DestinationModal
          mode={destMode}
          shipmentId={currentShipmentId}
          destination={currentDestination}
          onClose={() => setOpenDestModal(false)}
          onSaved={(savedDest) => {
            setShipments(shipments.map(s => s.id === (savedDest.shipment_id || savedDest.shipment) 
              ? { ...s, destinations: destMode === "add" ? [...(s.destinations || []), savedDest] : s.destinations.map(d => d.id === savedDest.id ? savedDest : d) } 
              : s
            ));
          }}
        />
      )}
    </div>
  );
};

export default Destinations;