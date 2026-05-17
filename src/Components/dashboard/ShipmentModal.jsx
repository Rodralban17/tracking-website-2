import { useEffect } from "react";
import { motion } from "framer-motion";
import { X, Info, CalendarDays, User, MapPin, Mail, Phone, Package, Truck, CreditCard, ClipboardList, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import apiRequest from "../../lib/apiRequest";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* =======================
    VALIDATION SCHEMA
======================= */
const schema = yup.object({
  seller_name: yup.string().required("Seller name is required"),
  seller_location: yup.string().required("Seller location is required"),
  seller_email: yup.string().email("Invalid email").required("Seller email is required"),
  seller_phone: yup.string().required("Seller phone is required"),
  seller_address: yup.string().required("Seller address is required"),
  receiver_name: yup.string().required("Receiver name is required"),
  receiver_location: yup.string().required("Receiver location is required"),
  receiver_email: yup.string().email("Invalid email").required("Receiver email is required"),
  receiver_phone: yup.string().required("Receiver phone is required"),
  receiver_address: yup.string().required("Receiver address is required"),
  origin: yup.string().required("Origin is required"),
  destination: yup.string().required("Destination is required"),
  type_shipment: yup.string().required("Type shipment is required"),
  //courier: yup.string().required("A courier is required"),
  shipment_type: yup.string().required("Shipment type is required"),
  carrier: yup.string().required("Carrier is required"),
  carrier_reference_number: yup.string().required("Carrier reference number is required"),
  quantity: yup.number().typeError("Enter a valid number").positive().required(),
  package_number: yup.number().typeError("Enter a valid number").positive().required(),
  product_description: yup.string().required("A description is required"),
  weight_kg: yup.number().typeError("Enter a valid number").positive().required(),
  payment_method: yup.string().required("Select a payment method"),
  total_cost: yup.number().typeError("Enter a valid number").positive().required(),
  pickup_day: yup.string().required("Pickup Day is required"),
  pickup_time: yup.string().required("Pickup Time is required"),
  expected_delivery_date: yup.string().required("Expected Delivery date is required"),
  departure_time: yup.string().required("A departure time is required"),
  status:  yup.string().required("Select a status"),
  is_paid: yup.boolean().required(),
  comments: yup.string().required("A comment is required"),
});

const inputClass = "w-full rounded-xl bg-gray-50 border-2 border-gray-100 px-4 py-3 text-sm font-bold text-[#0B192C] outline-none transition-all focus:border-[#FF7A00] focus:bg-white";
const labelClass = "text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5 block ml-1";

const ErrorText = ({ error }) =>
  error ? <p className="text-[10px] font-black text-red-500 uppercase mt-1 ml-1">{error.message}</p> : null;

/* =======================
    COMPONENT
======================= */
const ShipmentModal = ({ onClose, onCreated, mode = "create", initialData, isFullPage = false }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      shipment_type: "SEA",
      payment_method: "CASH",
      is_paid: false,
    },
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      reset({
        ...initialData,
        departure_time: initialData.departure_time?.slice(0, 16) || "",
      });
    }
  }, [mode, initialData, reset]);

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    try {
      mode === "edit"
        ? await apiRequest.patch(`/shipments/${initialData.id}/`, data)
        : await apiRequest.post("/shipments/", data);

      toast.success(`MANIFEST ${mode === "edit" ? "UPDATED" : "INITIALIZED"}`);
      onCreated?.();
      if (!isFullPage) setTimeout(() => onClose(), 1200);
    } catch {
      toast.error("DATABASE SYNC FAILED");
    }
  };

  const formContent = (
    <motion.div
      initial={!isFullPage ? { y: 40, opacity: 0 } : {}}
      animate={{ y: 0, opacity: 1 }}
      className={`bg-white w-full ${
        isFullPage
          ? "rounded-[2.5rem] p-8 border border-gray-100 shadow-xl"
          : "max-w-6xl max-h-[95vh] overflow-y-auto rounded-[3rem] p-8 shadow-2xl"
      }`}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center border-b border-gray-100 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF7A00]/10 border border-[#FF7A00]/20 text-[#FF7A00] text-[10px] font-black uppercase tracking-widest mb-2">
            <ClipboardList size={12} /> Logistic Manifest
          </div>
          <h2 className="text-3xl font-black text-[#0B192C] tracking-tighter uppercase">
            {mode === "edit" ? "Update" : "Create"} <span className="text-[#FF7A00]">Shipment</span>
          </h2>
          <p className="text-[10px] font-black text-gray-400 flex items-center gap-1 uppercase tracking-widest mt-1">
            <Info size={12} />
            {mode === "edit" ? `REF: ${initialData?.tracking_number}` : "Manual Entry Protocol"}
          </p>
        </div>
        {!isFullPage && (
          <button onClick={onClose} className="p-3 rounded-2xl bg-gray-50 text-[#0B192C] hover:bg-[#FF7A00] hover:text-white transition-all">
            <X size={20} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        
        {/* ENTITY SECTION */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* SELLER */}
          <div className="bg-gray-50/50 p-6 rounded-[2rem] border-2 border-dashed border-gray-100">
            <h3 className="text-[#0B192C] text-xs font-black mb-6 flex items-center gap-2 uppercase tracking-widest">
              <div className="p-2 bg-[#0B192C] text-white rounded-lg"><Send size={14} /></div> Seller Registry
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2"><label className={labelClass}>Entity Name</label><input {...register("seller_name")} className={inputClass} /><ErrorText error={errors.seller_name} /></div>
              <div><label className={labelClass}>Email</label><input {...register("seller_email")} className={inputClass} /><ErrorText error={errors.seller_email} /></div>
              <div><label className={labelClass}>Phone</label><input {...register("seller_phone")} className={inputClass} /><ErrorText error={errors.seller_phone} /></div>
              <div className="sm:col-span-2"><label className={labelClass}>Location & Address</label><input {...register("seller_location")} placeholder="City, Country" className={`${inputClass} mb-2`} /><textarea {...register("seller_address")} placeholder="Full Street Address" className={`${inputClass} h-20 pt-3 resize-none`} /></div>
            </div>
          </div>

          {/* RECEIVER */}
          <div className="bg-gray-50/50 p-6 rounded-[2rem] border-2 border-dashed border-gray-100">
            <h3 className="text-[#FF7A00] text-xs font-black mb-6 flex items-center gap-2 uppercase tracking-widest">
              <div className="p-2 bg-[#FF7A00] text-white rounded-lg"><MapPin size={14} /></div> Receiver Registry
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2"><label className={labelClass}>Recipient Name</label><input {...register("receiver_name")} className={inputClass} /><ErrorText error={errors.receiver_name} /></div>
              <div><label className={labelClass}>Email</label><input {...register("receiver_email")} className={inputClass} /><ErrorText error={errors.receiver_email} /></div>
              <div><label className={labelClass}>Phone</label><input {...register("receiver_phone")} className={inputClass} /><ErrorText error={errors.receiver_phone} /></div>
              <div className="sm:col-span-2"><label className={labelClass}>Location & Address</label><input {...register("receiver_location")} placeholder="City, Country" className={`${inputClass} mb-2`} /><textarea {...register("receiver_address")} placeholder="Full Street Address" className={`${inputClass} h-20 pt-3 resize-none`} /></div>
            </div>
          </div>
        </div>

        {/* LOGISTICS TELEMETRY */}
        <div className="bg-[#0B192C] p-8 rounded-[2.5rem] text-white">
            <h3 className="text-[#FF7A00] text-xs font-black mb-8 flex items-center gap-2 uppercase tracking-widest">
                <Package size={18} /> Logistics Telemetry
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <div><label className={labelClass}>Shipment Type</label><select {...register("type_shipment")} className={`${inputClass} bg-white/10 border-white/10 text-white focus:bg-white focus:text-[#0B192C]`}>
                    <option value="">Select...</option>
                    <option value="Air Freight">Air Freight</option>
                    <option value="International Shipping">International Shipping</option>
                    <option value="Trackload">Trackload</option>
                    <option value="Trackload">Van move</option>
                </select><ErrorText error={errors.type_shipment} /></div>

                <div><label className={labelClass}>Transport Mode</label><select {...register("shipment_type")} className={`${inputClass} bg-white/10 border-white/10 text-white focus:bg-white focus:text-[#0B192C]`}>
                    <option value="Sea Transport">Sea Transport</option>
                    <option value="Air Freight">Air Freight</option>
                    <option value="Land Shipping">Land Shipping</option>
                </select></div>

                <div><label className={labelClass}>Carrier</label><select {...register("carrier")} className={`${inputClass} bg-white/10 border-white/10 text-white focus:bg-white focus:text-[#0B192C]`}>
                    <option value="DHL">DHL</option>
                    <option value="USPS">USPS</option>
                    <option value="FED EX">FED EX</option>
                    <option value="DELTA CARGO">DELTA CARGO</option>
                </select></div>

                <div><label className={labelClass}>Carrier Ref #</label><input {...register("carrier_reference_number")} className={`${inputClass} bg-white/10 border-white/10 text-white focus:bg-white focus:text-[#0B192C]`} /></div>

                <div><label className={labelClass}>Weight (KG)</label><input type="number" step="0.01" {...register("weight_kg")} className={`${inputClass} bg-white/10 border-white/10 text-white focus:bg-white focus:text-[#0B192C]`} /></div>
                <div><label className={labelClass}>Package Count</label><input type="number" {...register("package_number")} className={`${inputClass} bg-white/10 border-white/10 text-white focus:bg-white focus:text-[#0B192C]`} /></div>
                <div><label className={labelClass}>Quantity</label><input type="number" {...register("quantity")} className={`${inputClass} bg-white/10 border-white/10 text-white focus:bg-white focus:text-[#0B192C]`} /></div>
                <div><label className={labelClass}>Origin Port/City</label><input {...register("origin")} className={`${inputClass} bg-white/10 border-white/10 text-white focus:bg-white focus:text-[#0B192C]`} /></div>
                <div><label className={labelClass}>Dest. Port/City</label><input {...register("destination")} className={`${inputClass} bg-white/10 border-white/10 text-white focus:bg-white focus:text-[#0B192C]`} /></div>
                
                <div><label className={labelClass}>Current Status</label><select {...register("status")} className={`${inputClass} bg-orange-500 border-none text-white font-black uppercase`}>
                    <option value="PENDING">Deposited</option>
                    <option value="IN_TRANSIT">In Transit</option>
                    <option value="DELIVERED">Delivered</option>
                </select></div>
            </div>
        </div>

        {/* TIME & FINANCIALS */}
        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-6 rounded-[2rem]">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2"><CalendarDays size={14} /> Schedule</h4>
                    <div className="grid grid-cols-2 gap-3">
                        <div><label className={labelClass}>Pickup Day</label><input placeholder="YYYY/MM/DD" {...register("pickup_day")} className={inputClass} /></div>
                        <div><label className={labelClass}>Pickup Time</label><input placeholder="HH:MM" {...register("pickup_time")} className={inputClass} /></div>
                        <div className="col-span-2"><label className={labelClass}>Expected Delivery</label><input placeholder="YYYY/MM/DD" {...register("expected_delivery_date")} className={inputClass} /></div>
                        <div className="col-span-2"><label className={labelClass}>Departure Time</label><input placeholder="HH:MM" {...register("departure_time")} className={inputClass} /></div>
                    </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-[2rem]">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2"><CreditCard size={14} /> Billing</h4>
                    <div className="space-y-4">
                        <div><label className={labelClass}>Payment Method</label><select {...register("payment_method")} className={inputClass}>
                            <option value="CASH">Cash</option>
                            <option value="BANK TRANSFER">Bank Transfer</option>
                            <option value="CREDIT">Credit</option>
                            <option value="Zelle">Zelle</option>
                            <option value="PayPal">PayPal</option>
                            <option value="Apple Pay">Apple Pay</option>
                            <option value="Gift Card">Gift Card</option>
                            <option value="Chime">Chime</option>
                            <option value="E-Transfer">E-Transfer</option>
                            <option value="Cheque">Cheque</option>
                            <option value="Bacs">Bacs</option>
                            <option value="Bitcoin">Bitcoin</option>  
                            <option value="Venmo">Venmo</option>
                            <option value="Cash App">Cash App</option>
                            <option value="Virement Instantane">Virement Instantane</option>
                        </select></div>
                        <div><label className={labelClass}>Total Cost ($)</label><input type="number" step="0.01" {...register("total_cost")} className={`${inputClass} text-xl text-[#FF7A00]`} /></div>
                        <label className="flex items-center gap-3 font-black text-[#0B192C] text-[11px] uppercase cursor-pointer bg-white p-3 rounded-xl border border-gray-200">
                            <input type="checkbox" {...register("is_paid")} className="w-5 h-5 accent-[#FF7A00]" />
                            Transaction Verified
                        </label>
                    </div>
                </div>
            </div>
            
            <div className="space-y-4">
                <div>
                    <label className={labelClass}>Product Description</label>
                    <textarea {...register("product_description")} placeholder="Detailed inventory list..." className={`${inputClass} h-32 pt-4 resize-none`} />
                </div>
                <div>
                    <label className={labelClass}>Internal Notes</label>
                    <textarea {...register("comments")} placeholder="Private staff notes..." className={`${inputClass} h-32 pt-4 resize-none border-dashed`} />
                </div>
            </div>
        </div>

        <button
          disabled={isSubmitting}
          className="w-full bg-[#0B192C] text-white py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-[#FF7A00] transition-all disabled:bg-gray-300 shadow-2xl shadow-[#0B192C]/20 flex items-center justify-center gap-3"
        >
          {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <><Truck size={20}/> Finalize Logistic Manifest</>
          )}
        </button>
      </form>
    </motion.div>
  );

  if (isFullPage) return <div className="p-4 bg-gray-50 min-h-screen flex justify-center items-start pt-10">{formContent}</div>;

  return (
    <div className="fixed inset-0 z-[100] bg-[#0B192C]/80 flex items-center justify-center p-4 backdrop-blur-md">
      <ToastContainer position="top-right" autoClose={2000} />
      {formContent}
    </div>
  );
};

export default ShipmentModal;