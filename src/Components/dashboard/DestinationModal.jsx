import { motion } from "framer-motion";
import { X, MapPin, Navigation, Info, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import apiRequest from "../../lib/apiRequest";
import { toast } from "react-toastify";

/* =======================
   VALIDATION SCHEMA
======================= */
const schema = yup.object().shape({
  address: yup.string().required("Address is required"),
  status: yup.string().required("Please select a status"),
  remarks: yup.string().required("Remarks are required"),
  arrived: yup.boolean(),
  gps: yup.string().nullable(),
});

/* =======================
   GEOCODING (Functionality preserved)
======================= */
const getCoordinates = async (address) => {
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=YOUR_API_KEY`
    );
    const data = await res.json();
    if (data.results?.length > 0) {
      const loc = data.results[0].geometry.location;
      return `${loc.lat},${loc.lng}`;
    }
    return "";
  } catch {
    return "";
  }
};

/* =======================
   NEW STYLES
======================= */
const inputClass =
  "w-full rounded-xl border-2 border-gray-100 bg-gray-50 px-4 py-3.5 text-sm font-bold text-[#0B192C] outline-none transition-all focus:border-[#FF7A00] focus:bg-white";

const labelClass =
  "text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 mb-2 block ml-1";

const errorClass = "text-red-500 text-[10px] font-black uppercase tracking-wider mt-1.5 ml-1 flex items-center gap-1";

/* =======================
   COMPONENT
======================= */
const DestinationModal = ({
  mode = "add",
  shipmentId,
  destination,
  onClose,
  onSaved,
}) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      address: "",
      status: "PENDING",
      remarks: "",
      arrived: false,
      gps: "",
    },
  });

  useEffect(() => {
    if (mode === "edit" && destination) {
      reset({
        address: destination.address || "",
        status: destination.status || "PENDING",
        remarks: destination.remarks || "",
        arrived: destination.arrived || false,
        gps: destination.gps || "",
      });
    }
  }, [mode, destination, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const gpsValue = data.gps || (await getCoordinates(data.address));
      const payload = {
        ...data,
        gps: gpsValue || null,
        shipment: shipmentId,
      };

      let res;
      if (mode === "add") {
        res = await apiRequest.post("/destinations/", payload);
        toast.success("Destination Logged Successfully");
      } else {
        res = await apiRequest.patch(`/destinations/${destination.id}/`, payload);
        toast.success("Log Updated");
      }
      onSaved?.(res.data);
      onClose();
    } catch (err) {
      toast.error("Telemetry update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#0B192C]/80 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ y: 20, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20"
      >
        {/* DESIGNER HEADER */}
        <div className="bg-[#0B192C] p-8 relative overflow-hidden">
          <div className="absolute -top-4 -right-4 opacity-10">
            <Navigation size={120} color="#FF7A00" />
          </div>
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF7A00]/10 border border-[#FF7A00]/20 text-[#FF7A00] text-[10px] font-black uppercase tracking-widest mb-2">
                <MapPin size={12} /> Milestone Tracker
              </div>
              <h3 className="text-2xl font-black text-white tracking-tighter uppercase">
                {mode === "add" ? "Log New Stop" : "Update Checkpoint"}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-3 rounded-xl bg-white/5 text-white hover:bg-[#FF7A00] transition-all"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* FORM BODY */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            
            {/* ADDRESS */}
            <div>
              <label className={labelClass}>Transit Point Address</label>
              <div className="relative">
                <input
                  {...register("address")}
                  placeholder="Street, City, Country"
                  className={`${inputClass} pr-12 ${errors.address ? "border-red-500" : ""}`}
                />
                <MapPin size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" />
              </div>
              {errors.address && (
                <p className={errorClass}><Info size={12}/> {errors.address.message}</p>
              )}
            </div>

            {/* STATUS */}
            <div>
              <label className={labelClass}>Operational Status</label>
              <select 
                {...register("status")}
                className={`${inputClass} appearance-none ${errors.status ? "border-red-500" : ""}`}
              >
                <option value="">Select Status Code...</option>
                <option value="PENDING">Deposited</option>
                <option value="IN_TRANSIT">In Transit</option>
                <option value="DELIVERED">Delivered</option>
                <option value="PICKED UP">Picked Up</option>
                <option value="ON HOLD">On Hold</option>
                <option value="OUT OF DELIVERY">Out for Delivery</option>
                <option value="ENROUTE">Enroute</option>
                <option value="CANCELLED">Cancelled</option>
                <option value="RETURNED">Returned</option>
                <option value="REGISTERED">Registered</option>
              </select>
              {errors.status && (
                <p className={errorClass}><Info size={12}/> {errors.status.message}</p>
              )}
            </div>

            {/* REMARKS */}
            <div>
              <label className={labelClass}>Technical Remarks</label>
              <textarea
                {...register("remarks")}
                placeholder="Log any specific handling instructions or anomalies..."
                className={`${inputClass} h-28 resize-none ${errors.remarks ? "border-red-500" : ""}`}
              />
              {errors.remarks && (
                <p className={errorClass}><Info size={12}/> {errors.remarks.message}</p>
              )}
            </div>

            {/* ARRIVED CHECKBOX */}
            <label className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 border-2 border-transparent hover:border-[#FF7A00]/20 transition-all cursor-pointer group">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  {...register("arrived")}
                  className="peer w-5 h-5 opacity-0 absolute cursor-pointer"
                />
                <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:bg-[#FF7A00] peer-checked:border-[#FF7A00] transition-all flex items-center justify-center">
                  <CheckCircle2 size={14} className="text-white opacity-0 peer-checked:opacity-100" />
                </div>
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-[#0B192C]">CONFIRM ARRIVAL AT THIS POINT</span>
            </label>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-[#0B192C] text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-[#0B192C]/20 hover:bg-[#FF7A00] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Syncing...
              </span>
            ) : (
              mode === "add" ? "Commit New Destination" : "Update Telemetry Data"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default DestinationModal;