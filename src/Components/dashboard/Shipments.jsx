import { useState, useEffect, useCallback } from "react";
import { Plus, Edit, FileText, Package, Loader2, Ship, MapPin, ArrowRight, Download } from "lucide-react";
import ShipmentModal from "./ShipmentModal";
import apiRequest from "../../lib/apiRequest";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/* ===================== HELPER ===================== */
const formatTimeToAMPM = (time) => {
  if (!time) return "N/A";
  const [hours, minutes] = time.split(':');
  const h = parseInt(hours);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const displayHours = h % 12 || 12;
  return `${displayHours}:${minutes} ${ampm}`;
};

const Shipments = () => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openShipmentModal, setOpenShipmentModal] = useState(false);
  const [shipmentMode, setShipmentMode] = useState("add");
  const [currentShipment, setCurrentShipment] = useState(null);

  const fetchShipments = useCallback(async () => {
    try {
      setLoading(true);
      const res = await apiRequest.get("/shipments/");
      setShipments(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchShipments();
  }, [fetchShipments]);

  /* ===================== PDF GENERATION (Industrial Style) ===================== */
  const generatePDF = (shipment) => {
    const doc = new jsPDF();
    
    // Header Corporate
    doc.setFillColor(11, 25, 44); // #0B192C
    doc.rect(0, 0, 210, 40, "F");
    
    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text("DELTA CARGO LOGISTICS - MANIFEST", 14, 25);
    
    doc.setFontSize(10);
    doc.setTextColor(255, 122, 0); // #FF7A00
    doc.text(`TRACKING ID: ${shipment.tracking_number}`, 14, 32);

    autoTable(doc, {
      startY: 50,
      head: [["Classification", "Specification"]],
      body: [
        ["SENDER / SELLER", shipment.seller_name || "N/A"],
        ["RECEIVER / RECIPIENT", shipment.receiver_name || "N/A"],
        ["ITEM DESCRIPTION", shipment.product_description || "N/A"],
        ["GROSS WEIGHT", `${shipment.weight_kg} KG`],
        ["LOGISTICS STATUS", shipment.status.replace("_", " ")],
        ["TOTAL FREIGHT", `$${shipment.total_cost}`],
        ["PICKUP SCHEDULE", `${shipment.pickup_day} @ ${formatTimeToAMPM(shipment.pickup_time)}`],
      ],
      headStyles: { fillColor: [255, 122, 0], textColor: [255, 255, 255], fontStyle: 'bold' },
      bodyStyles: { textColor: [11, 25, 44], fontStyle: 'bold', fontSize: 9 },
      alternateRowStyles: { fillColor: [245, 245, 245] },
    });

    if (shipment.destinations && shipment.destinations.length > 0) {
      const finalY = doc.lastAutoTable.finalY + 15;
      doc.setFontSize(12);
      doc.setTextColor(11, 25, 44);
      doc.text("TRANSIT LOGS", 14, finalY);

      autoTable(doc, {
        startY: finalY + 5,
        head: [["STEP", "TRANSIT HUB", "STATUS"]],
        body: shipment.destinations.map((d, index) => [
          `#0${index + 1}`,
          d.address,
          d.status,
        ]),
        headStyles: { fillColor: [11, 25, 44] },
      });
    }

    doc.save(`Manifest_${shipment.tracking_number}.pdf`);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="animate-spin text-[#FF7A00] mb-4 mx-auto" size={48} />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0B192C]">Syncing Global Manifest...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B192C]/5 border border-[#0B192C]/10 text-[#0B192C] text-[10px] font-black uppercase tracking-widest mb-2">
            <Ship size={12} /> Operations Center
          </div>
          <h2 className="text-4xl font-black text-[#0B192C] tracking-tighter uppercase">
            Global <span className="text-[#FF7A00]">Shipments</span>
          </h2>
        </div>
        
        <button
          onClick={() => { setShipmentMode("add"); setCurrentShipment(null); setOpenShipmentModal(true); }}
          className="flex items-center justify-center gap-3 bg-[#0B192C] text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#FF7A00] transition-all shadow-xl shadow-[#0B192C]/20"
        >
          <Plus size={18} /> Initialize Manifest
        </button>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden lg:block bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#0B192C] text-white">
              <th className="p-6 text-left text-[10px] font-black uppercase tracking-[0.2em]">Manifest / ID</th>
              <th className="p-6 text-left text-[10px] font-black uppercase tracking-[0.2em]">Logistics Chain</th>
              <th className="p-6 text-left text-[10px] font-black uppercase tracking-[0.2em]">Operational Status</th>
              <th className="p-6 text-right text-[10px] font-black uppercase tracking-[0.2em]">Control</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {shipments.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-[#0B192C] group-hover:bg-[#FF7A00] group-hover:text-white transition-all">
                      <Package size={20} />
                    </div>
                    <div>
                      <div className="font-black text-[#0B192C] text-sm tracking-tight">{s.tracking_number}</div>
                      <div className="text-[10px] font-black text-[#FF7A00] uppercase tracking-widest">{s.shipment_type}</div>
                    </div>
                  </div>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-[10px] font-black text-gray-400 uppercase">From</p>
                      <p className="text-xs font-bold text-[#0B192C]">{s.seller_name || "---"}</p>
                    </div>
                    <ArrowRight size={14} className="text-gray-300" />
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase">To</p>
                      <p className="text-xs font-bold text-[#0B192C]">{s.receiver_name || "---"}</p>
                    </div>
                  </div>
                </td>
                <td className="p-6">
                  <StatusSelect shipment={s} shipments={shipments} setShipments={setShipments} />
                </td>
                <td className="p-6">
                  <div className="flex justify-end gap-3">
                    <button 
                      onClick={() => { setShipmentMode("edit"); setCurrentShipment(s); setOpenShipmentModal(true); }}
                      className="p-3 bg-gray-100 text-[#0B192C] rounded-xl hover:bg-[#0B192C] hover:text-white transition-all"
                      title="Edit Manifest"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => generatePDF(s)}
                      className="p-3 bg-gray-100 text-[#0B192C] rounded-xl hover:bg-[#FF7A00] hover:text-white transition-all"
                      title="Download PDF"
                    >
                      <Download size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="lg:hidden space-y-4">
        {shipments.map((s) => (
          <div key={s.id} className="bg-white p-6 rounded-[2rem] shadow-lg border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-black text-[#FF7A00] uppercase tracking-[0.2em]">{s.shipment_type}</span>
                <h4 className="font-black text-[#0B192C] text-lg leading-none">{s.tracking_number}</h4>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setShipmentMode("edit"); setCurrentShipment(s); setOpenShipmentModal(true); }} className="p-3 bg-gray-50 text-[#0B192C] rounded-xl"><Edit size={16}/></button>
                <button onClick={() => generatePDF(s)} className="p-3 bg-gray-50 text-[#FF7A00] rounded-xl"><FileText size={16}/></button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-50 mb-4">
               <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Origin</p>
                  <p className="text-xs font-bold text-[#0B192C]">{s.seller_name}</p>
               </div>
               <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Destination</p>
                  <p className="text-xs font-bold text-[#0B192C]">{s.receiver_name}</p>
               </div>
            </div>
            
            <StatusSelect shipment={s} shipments={shipments} setShipments={setShipments} />
          </div>
        ))}
      </div>

      {openShipmentModal && (
        <ShipmentModal
          mode={shipmentMode}
          initialData={currentShipment}
          onClose={() => setOpenShipmentModal(false)}
          onCreated={fetchShipments}
        />
      )}
    </div>
  );
};

/* ===================== STATUS SELECT (Themed) ===================== */
const StatusSelect = ({ shipment, shipments, setShipments }) => {
  const handleChange = async (e) => {
    const newStatus = e.target.value;
    const originalShipments = [...shipments];
    
    setShipments(shipments.map((s) => (s.id === shipment.id ? { ...s, status: newStatus } : s)));

    try {
      await apiRequest.patch(`/shipments/${shipment.id}/`, { status: newStatus });
    } catch (error) {
      alert("Database error: Sync failed.");
      setShipments(originalShipments);
    }
  };

  const getStatusColor = (status) => {
      if (status === 'DELIVERED') return 'bg-green-500 text-white';
      if (status === 'CANCELLED') return 'bg-red-500 text-white';
      return 'bg-amber-100 text-amber-700'; // Default Pending/Transit
  };

  return (
    <select
      value={shipment.status}
      onChange={handleChange}
      className={`w-full max-w-[180px] p-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border-none outline-none cursor-pointer transition-all ${getStatusColor(shipment.status)}`}
    >
      <option value="PENDING">Deposited</option>
      <option value="IN_TRANSIT">In Transit</option>
      <option value="DELIVERED">Delivered</option>
      <option value="PICKED UP">PICKED UP</option>
      <option value="ON HOLD">ON HOLD</option>
      <option value="OUT OF DELIVERY">OUT OF DELIVERY</option>
      <option value="ENROUTE">ENROUTE</option>
      <option value="CANCELLED">CANCELLED</option>
      <option value="RETURNED">RETURNED</option>
      <option value="REGISTERED">REGISTERED</option>
    </select>
  );
};

export default Shipments;