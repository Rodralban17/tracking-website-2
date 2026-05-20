import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Package,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import apiRequest from "../lib/apiRequest";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/* ---------------- MAP ICONS ---------------- */

const blinkStyle = `
@keyframes blinker { 50% { opacity: 0; } }
.blinking-icon { animation: blinker 1s linear infinite; }
`;

const shipmentSteps = [
  {
    key: "PENDING",
    label: "Pending",
    icon: "📦",
    color: "green",
  },
  {
    key: "IN_TRANSIT",
    label: "In Transit",
    icon: "🚚",
    color: "green",
  },
  {
    key: "ON HOLD",
    label: "On Hold",
    icon: "⚠️",
    color: "red",
  },
  {
    key: "DELIVERED",
    label: "Delivered",
    icon: "✅",
    color: "green",
  },
];

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const StartIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [30, 40],
  iconAnchor: [15, 40],
});

const ArrivedIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const BlinkingIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [30, 40],
  iconAnchor: [15, 40],
  className: "blinking-icon",
});

function ChangeView({ center }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, 6);
    map.invalidateSize();
  }, [center, map]);

  return null;
}

/* ---------------- HELPERS ---------------- */

const formatTimeToAMPM = (time) => {
  if (!time) return "N/A";

  const [hours, minutes] = time.split(":");
  const h = parseInt(hours);

  const ampm = h >= 12 ? "PM" : "AM";
  const displayHours = h % 12 || 12;

  return `${displayHours}:${minutes} ${ampm}`;
};

const getCoordsFromLocation = async (locationText) => {
  try {
    const res = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        locationText
      )}&limit=1`
    );

    if (res.data?.length) {
      return {
        lat: +res.data[0].lat,
        lng: +res.data[0].lon,
      };
    }
  } catch {}

  return null;
};

const generatePDF = (shipment) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.setTextColor(30, 58, 138);

  doc.text("DELTAL CARGO LOGISTICS - Tracking result", 105, 20, {
    align: "center",
  });

  autoTable(doc, {
    startY: 35,
    head: [["Detail", "Value"]],
    body: [
      ["Tracking Number", shipment.tracking_number],
      ["From (Seller)", shipment.seller_name || "N/A"],
      ["To (Receiver)", shipment.receiver_name || "N/A"],
      ["Product", shipment.product_description],
      ["Weight", `${shipment.weight_kg} kg`],
      [
        "Pickup",
        `${shipment.pickup_day} at ${formatTimeToAMPM(
          shipment.pickup_time
        )}`,
      ],
      ["Total Cost", `$${shipment.total_cost}`],
      ["Status", shipment.status],
    ],
    headStyles: {
      fillColor: [30, 58, 138],
    },
  });

  if (shipment.destinations && shipment.destinations.length > 0) {
    const finalY = doc.lastAutoTable.finalY + 10;

    doc.setFontSize(14);

    doc.text("Shipment Journey / Tracking Details", 14, finalY);

    autoTable(doc, {
      startY: finalY + 5,
      head: [["Step", "Location / Address", "Status"]],
      body: shipment.destinations.map((d, index) => [
        index + 1,
        d.address,
        d.status,
      ]),
      headStyles: {
        fillColor: [51, 65, 85],
      },
    });
  }

  doc.save(`Tracking-result_${shipment.tracking_number}.pdf`);
};

/* ---------------- UI HELPERS ---------------- */

const InfoBlock = ({ title, children }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-4">
    <h3 className="text-sm font-bold text-slate-700 mb-3 border-b pb-2">
      {title}
    </h3>

    <div className="text-sm text-slate-600 space-y-1">
      {children}
    </div>
  </div>
);

const InfoItem = ({ label, value }) => (
  <div>
    <p className="text-xs font-bold text-slate-500">{label}</p>
    <p className="text-sm text-slate-800">{value || "N/A"}</p>
  </div>
);

/* ---------------- MAIN PAGE ---------------- */

const TrackingPage = () => {
  const [trackingId, setTrackingId] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const [shipmentData, setShipmentData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();

    if (!trackingId) {
      return toast.error("Enter tracking number");
    }

    setLoading(true);

    try {
      const res = await apiRequest.get(`/track/${trackingId}/`);

      const shipment = res.data;

      const destinations = await Promise.all(
        (shipment.destinations || []).map(async (d) => {
          if (!d.gps) {
            const geo = await getCoordsFromLocation(d.address);

            return geo ? { ...d, ...geo } : d;
          }

          const [lat, lng] = d.gps.split(",").map(Number);

          return { ...d, lat, lng };
        })
      );

      destinations.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );

      setShipmentData({
        ...shipment,
        destinations,
      });

      toast.success("Shipment found");
    } catch {
      toast.error("Tracking failed");
    } finally {
      setLoading(false);
    }
  };

  const validDestinations =
    shipmentData?.destinations?.filter(
      (d) =>
        typeof d.lat === "number" &&
        typeof d.lng === "number"
    ) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{blinkStyle}</style>
      <style>
      {`
      @keyframes pulseStatus {
        0% {
          transform: scale(1);
          box-shadow: 0 0 0px rgba(255,255,255,0.3);
        }

        50% {
          transform: scale(1.08);
          box-shadow: 0 0 25px rgba(255,122,0,0.9);
        }

        100% {
          transform: scale(1);
          box-shadow: 0 0 0px rgba(255,255,255,0.3);
        }
      }

      .status-active {
        animation: pulseStatus 1.2s infinite;
      }
      `}
      </style>

      {/* HERO SECTION */}
      <section className="relative py-40 bg-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent opacity-20"></div>

        <div className="max-w-5xl mx-auto px-6">
          <div className="relative bg-[#0B192C] rounded-[2.5rem] p-8 md:p-16 shadow-2xl overflow-hidden">
            {/* Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#FF7A00] opacity-10 blur-[80px] rounded-full"></div>

            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#FF7A00] opacity-5 blur-[80px] rounded-full"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
              {/* TEXT */}
              <div className="lg:col-span-2 text-white">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center gap-2 text-[#FF7A00] mb-4">
                    <ShieldCheck size={20} />

                    <span className="text-xs font-black uppercase tracking-[0.2em]">
                      Secure Tracking
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-black leading-tight mb-4">
                    Track Your <br />
                    <span className="text-[#FF7A00]">
                      Shipment
                    </span>
                  </h2>

                  <p className="text-gray-400 font-medium">
                    Enter your tracking number to get
                    real-time updates on your cargo
                    status and location.
                  </p>
                </motion.div>
              </div>

              {/* FORM */}
              <div className="lg:col-span-3">
                <motion.form
                  onSubmit={handleTrack}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="relative group"
                >
                  <div
                    className={`relative flex flex-col md:flex-row gap-4 p-3 rounded-2xl border-2 transition-all duration-300 ${
                      isHovered
                        ? "border-[#FF7A00] bg-white/5"
                        : "border-white/10 bg-white/5"
                    }`}
                  >
                    <div className="flex-1 relative flex items-center">
                      <Package
                        className="absolute left-4 text-gray-500"
                        size={20}
                      />

                      <input
                        type="text"
                        placeholder="Enter Tracking ID (e.g. DELTA-12345)"
                        value={trackingId}
                        onChange={(e) =>
                          setTrackingId(e.target.value)
                        }
                        onFocus={() => setIsHovered(true)}
                        onBlur={() => setIsHovered(false)}
                        className="w-full bg-transparent py-4 pl-12 pr-4 text-white font-bold placeholder:text-gray-600 focus:outline-none"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-[#FF7A00] hover:bg-white hover:text-[#0B192C] text-white px-8 py-4 rounded-xl font-black transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-xl shadow-[#FF7A00]/20"
                    >
                      {loading ? "SEARCHING..." : "TRACK NOW"}

                      {!loading && (
                        <ArrowRight
                          size={18}
                          className="group-hover/btn:translate-x-1 transition-transform"
                        />
                      )}
                    </button>
                  </div>

                  {/* STATUS */}
                  <div className="flex gap-6 mt-6 ml-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>

                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        Global Network Active
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Search
                        size={12}
                        className="text-[#FF7A00]"
                      />

                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        24/7 Real-time Monitoring
                      </span>
                    </div>
                  </div>
                </motion.form>
              </div>
            </div>
          </div>

          {/* SUPPORT */}
          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm font-medium">
              Lost your tracking number?{" "}
              <a
                href="/contact-us"
                className="text-[#0B192C] font-black hover:text-[#FF7A00] underline decoration-[#FF7A00]/30 transition-colors"
              >
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      {shipmentData && (
        <div className="max-w-6xl mx-auto px-4 pb-20 space-y-6">
          {/* PDF BUTTON */}
          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={() => generatePDF(shipmentData)}
              className="w-full bg-blue-900 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-900/20 flex items-center justify-center gap-3 transition-all group hover:bg-blue-800"
            >
              Print Track result
            </button>

            {/* BARCODE */}
            <div className="flex flex-col items-center pt-4 w-full">
              <img
                src="assets/barcode.png"
                alt="Barcode"
                className="h-16 md:h-20 w-full object-contain"
              />

              <p className="text-slate-600 font-mono text-sm md:text-base tracking-widest mt-1">
                {shipmentData.tracking_number}
              </p>
            </div>

            {/* TRACKING STEPS */}
<div className="bg-white border border-gray-200 rounded-2xl p-6 w-full mt-6">
  <h3 className="text-center text-2xl font-black text-[#0B192C] mb-8 uppercase">
    Shipment Status
  </h3>

  <div className="flex items-center justify-between gap-2">
    {shipmentSteps.map((step, index) => {
      const isActive = shipmentData.status === step.key;

      return (
        <React.Fragment key={step.key}>
          <div className="flex flex-col items-center flex-1">
            
            <div
              className={`
                w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-2xl md:text-3xl border-4 transition-all duration-300
                ${
                  isActive
                    ? step.color === "red"
                      ? "bg-red-500 border-red-500 text-white status-active shadow-red-500/50"
                      : "bg-green-500 border-green-500 text-white status-active shadow-green-500/50"
                    : "bg-gray-100 border-gray-300 text-gray-500"
                }
              `}
            >
              {step.icon}
            </div>

            <p
              className={`mt-3 text-xs md:text-sm font-black uppercase tracking-wider text-center ${
                isActive
                  ? step.color === "red"
                    ? "text-red-500"
                    : "text-green-600"
                  : "text-gray-400"
              }`}
            >
              {step.label}
            </p>
          </div>

          {/* LINE */}
          {index !== shipmentSteps.length - 1 && (
            <div className="flex-1 h-2 bg-gray-200 rounded-full hidden md:block">
              <div className="h-full w-full bg-gradient-to-r from-green-400 to-gray-300 rounded-full"></div>
            </div>
          )}
        </React.Fragment>
      );
    })}
  </div>
</div>
          </div>

          {/* SHIPPER / RECEIVER */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoBlock title="Shipper Information">
              <p className="font-semibold">
                {shipmentData.seller_name}
              </p>

              <p>{shipmentData.seller_address}</p>

              <p>{shipmentData.seller_phone}</p>
            </InfoBlock>

            <InfoBlock title="Receiver Information">
              <p className="font-semibold">
                {shipmentData.receiver_name}
              </p>

              <p>{shipmentData.receiver_address}</p>

              <p>{shipmentData.receiver_phone}</p>

              <p>{shipmentData.receiver_email}</p>
            </InfoBlock>
          </div>

          {/* STATUS */}
          <div className="bg-slate-300 text-center font-bold py-3 rounded-md">
            SHIPMENT STATUS:{" "}
            {shipmentData.status.replace("_", " ")}
          </div>

          {/* SHIPMENT INFO */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-700 mb-6 border-b pb-2">
              Shipment Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-4">
              <div className="space-y-6">
                <InfoItem
                  label="Origin:"
                  value={shipmentData.origin}
                />

                <InfoItem
                  label="Destination:"
                  value={shipmentData.destination}
                />

                <InfoItem
                  label="Weight:"
                  value={`${shipmentData.weight_kg} kg`}
                />

                <InfoItem
                  label="Product:"
                  value={shipmentData.product_description}
                />

                <InfoItem
                  label="Total Freight:"
                  value={
                    shipmentData.is_paid
                      ? "Paid"
                      : "Not Paid"
                  }
                />

                <InfoItem
                  label="Pick Up Date:"
                  value={shipmentData.pickup_day}
                />

                <InfoItem
                  label="Comments:"
                  value={shipmentData.comments}
                />
              </div>

              <div className="space-y-6">
                <InfoItem
                  label="Package:"
                  value={shipmentData.package_number}
                />

                <InfoItem
                  label="Carrier:"
                  value={shipmentData.carrier}
                />

                <InfoItem
                  label="Shipment Mode:"
                  value={shipmentData.type_shipment}
                />

                <InfoItem
                  label="Qty:"
                  value={shipmentData.quantity}
                />

                <InfoItem
                  label="Expected Delivery Date:"
                  value={
                    shipmentData.expected_delivery_date
                  }
                />

                <InfoItem
                  label="Pick Up Time:"
                  value={shipmentData.pickup_time}
                />
              </div>

              <div className="space-y-6">
                <InfoItem
                  label="Status:"
                  value={shipmentData.status.replace(
                    "_",
                    " "
                  )}
                />

                <InfoItem
                  label="Type of Shipment:"
                  value={shipmentData.shipment_type}
                />

                <InfoItem
                  label="Carrier Reference No.:"
                  value={shipmentData.tracking_number}
                />

                <InfoItem
                  label="Payment Mode:"
                  value={shipmentData.payment_method}
                />

                <InfoItem
                  label="Departure Time:"
                  value={shipmentData.departure_time}
                />
              </div>
            </div>
          </div>

          {/* PACKAGES */}
          <div className="bg-white rounded-xl border p-4 overflow-x-auto">
            <h3 className="font-bold text-slate-700 mb-3 border-b pb-2">
              Packages
            </h3>

            <table className="min-w-full text-sm">
              <thead className="bg-red-600 text-white">
                <tr>
                  <th className="p-2 text-left">Qty</th>
                  <th className="p-2 text-left">
                    Description
                  </th>
                  <th className="p-2 text-left">
                    Weight
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b">
                  <td className="p-2">1</td>

                  <td className="p-2">
                    {shipmentData.product_description}
                  </td>

                  <td className="p-2">
                    {shipmentData.weight_kg} kg
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* MAP */}
          {validDestinations.length > 0 ? (
            <div className="bg-white rounded-xl shadow p-2 h-[300px] sm:h-[400px] md:h-[500px]">
              <MapContainer
                center={[
                  validDestinations[0].lat,
                  validDestinations[0].lng,
                ]}
                zoom={6}
                className="h-full w-full rounded-xl"
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {validDestinations.length > 1 && (
                  <Polyline
                    positions={validDestinations.map(
                      (d) => [d.lat, d.lng]
                    )}
                    pathOptions={{
                      color: "blue",
                      weight: 3,
                    }}
                  />
                )}

                {validDestinations.map((d, i) => {
                  const isFirst = i === 0;
                  const isLast =
                    i === validDestinations.length - 1;

                  const icon = isFirst
                    ? StartIcon
                    : isLast
                    ? BlinkingIcon
                    : ArrivedIcon;

                  return (
                    <Marker
                      key={d.id || i}
                      position={[d.lat, d.lng]}
                      icon={icon}
                    >
                      <Popup>
                        <p className="font-semibold">
                          {d.address}
                        </p>
                      </Popup>
                    </Marker>
                  );
                })}

                <ChangeView
                  center={[
                    validDestinations[
                      validDestinations.length - 1
                    ].lat,
                    validDestinations[
                      validDestinations.length - 1
                    ].lng,
                  ]}
                />
              </MapContainer>
            </div>
          ) : (
            <div className="bg-white rounded-xl border p-6 text-center text-slate-500">
              No location data available for this shipment
              yet.
            </div>
          )}

          {/* SHIPMENT HISTORY */}
          <div className="bg-white rounded-xl border p-4">
            <h3 className="text-xl font-bold text-slate-700 mb-4 border-b pb-2">
              Shipment History
            </h3>

            <div className="flex flex-col gap-4">
              {validDestinations
                .slice()
                .reverse()
                .map((d, i) => {
                  const dateObj = new Date(d.created_at);

                  const dateStr = dateObj
                    .toISOString()
                    .split("T")[0];

                  const timeStr =
                    dateObj.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    });

                  return (
                    <div
                      key={d.id || i}
                      className="border border-gray-200 rounded overflow-hidden"
                    >
                      <div className="flex border-b">
                        <div className="w-1/3 p-2 bg-gray-50 font-semibold text-slate-700 border-r">
                          Date
                        </div>

                        <div className="w-2/3 p-2 text-slate-700">
                          {dateStr}
                        </div>
                      </div>

                      <div className="flex border-b">
                        <div className="w-1/3 p-2 bg-gray-50 font-semibold text-slate-700 border-r">
                          Time
                        </div>

                        <div className="w-2/3 p-2 text-slate-700">
                          {timeStr}
                        </div>
                      </div>

                      <div className="flex border-b">
                        <div className="w-1/3 p-2 bg-gray-50 font-semibold text-slate-700 border-r">
                          Location
                        </div>

                        <div className="w-2/3 p-2 text-slate-700">
                          {d.address}
                        </div>
                      </div>

                      <div className="flex border-b">
                        <div className="w-1/3 p-2 bg-gray-50 font-semibold text-slate-700 border-r">
                          Status
                        </div>

                        <div className="w-2/3 p-2 text-slate-700">
                          {d.status ||
                            shipmentData.status.replace(
                              "_",
                              " "
                            )}
                        </div>
                      </div>

                      <div className="flex border-b">
                        <div className="w-1/3 p-2 bg-gray-50 font-semibold text-slate-700 border-r">
                          Updated By
                        </div>

                        <div className="w-2/3 p-2 text-slate-700">
                          Admin
                        </div>
                      </div>

                      <div className="flex">
                        <div className="w-1/3 p-2 bg-gray-50 font-semibold text-slate-700 border-r">
                          Remarks
                        </div>

                        <div className="w-2/3 p-2 text-slate-700 italic">
                          {d.remarks || "In Transit"}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackingPage;