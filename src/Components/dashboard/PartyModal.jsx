import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import apiRequest from "../../lib/apiRequest";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  location: yup.string().required("Location is required"),
  phone: yup.string().required("Phone is required"),
  address: yup.string().required("Address is required"),
});

export const PartyModal = ({ party, onClose, onSaved }) => {
  const isEdit = !!party;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: party || {},
  });

  const onSubmit = async (data) => {
    try {
      let res;
      if (isEdit) {
        res = await apiRequest.put(`/parties/${party.id}/`, data);
        toast.success("Party updated successfully");
      } else {
        res = await apiRequest.post("/parties/", data);
        toast.success("Party added successfully");
      }
      onSaved(res.data);
      reset();
    } catch (err) {
      const errorData = err.response?.data;

      // Si c'est un objet (ex: { email: ["message"] })
      if (typeof errorData === "object" && errorData !== null) {
        // On récupère le premier message d'erreur trouvé dans l'objet
        const firstError = Object.values(errorData)[0];
        
        // Si c'est un tableau (comme dans ton log console), on prend le premier élément
        const message = Array.isArray(firstError) ? firstError[0] : firstError;
        
        toast.error(message || "An error occurred");
      } else {
        // Si c'est déjà une string ou autre chose
        toast.error(errorData || "Something went wrong");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <ToastContainer position="top-center" autoClose={3000} />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative bg-white rounded-2xl p-8 w-full max-w-md shadow-xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 transition-all shadow-lg font-bold"
          aria-label="Close modal"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">
          {isEdit ? "Edit Party" : "Add New Party"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            {...register("name")}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <p className="text-red-500 text-xs">{errors.name?.message}</p>

          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <p className="text-red-500 text-xs">{errors.email?.message}</p>

          <input
            type="text"
            placeholder="Country"
            {...register("location")}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <p className="text-red-500 text-xs">{errors.location?.message}</p>

          <input
            type="text"
            placeholder="Phone"
            {...register("phone")}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <p className="text-red-500 text-xs">{errors.phone?.message}</p>

          <textarea
            placeholder="Address"
            {...register("address")}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <p className="text-red-500 text-xs">{errors.address?.message}</p>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 rounded-xl font-bold transition-all 
              ${isSubmitting
                ? "bg-blue-400 cursor-not-allowed text-white"
                : "bg-blue-900 hover:bg-blue-800 text-white"
              }`}
          >
            {isSubmitting
              ? isEdit
                ? "Updating..."
                : "Adding..."
              : isEdit
                ? "Update Party"
                : "Add Party"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};
