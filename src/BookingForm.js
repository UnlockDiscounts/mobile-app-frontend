import React, { useState, useEffect } from "react";

const BookingForm = ({ onClose }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [service, setService] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem("userName") || "";
    const savedEmail = localStorage.getItem("userEmail") || "";
    const savedAddress = localStorage.getItem("userAddress") || "";
    const savedBusiness = localStorage.getItem("userBusinessName") || "";

    setFullName(savedName);
    setEmail(savedEmail);
    setAddress(savedAddress);
    setBusinessName(savedBusiness);
  }, []);

  const handleSubmit = async () => {
    
    setLoading(true);
    try {
      const bookingData = {
        fullName,
        email,
        address,
        businessName,
        service,
      };

      console.log("Booking submitted:", bookingData);
      alert("Booking submitted successfully!");
      onClose();
    } catch (err) {
      console.error("Booking error:", err);
      alert("Failed to submit booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 mx-4">
        <h3 className="text-[20px] font-medium text-black mb-4">
          Booking Form
        </h3>

        <div className="space-y-2">
          {/* Full Name */}
          <p className="text-black-600 text-left text-sm">Full Name</p>
          <input
            type="text"
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value.replace(/[^A-Za-z ]/g, ""))
            }
            placeholder="Full Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          {/* Email */}
          <p className="text-black-600 mb-2 text-left text-sm">Email</p>
          <input
            type="text"
            value={email}
            placeholder="Email"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          {/* Address */}
          <p className="text-black-600 mb-2 text-left text-sm">Address</p>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          {/* Business Name */}
          <p className="text-black-600 mb-2 text-left text-sm">Business Name</p>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Business Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          {/* Services Requested */}
          <p className="text-black-600 mb-2 text-left text-sm">
            Services Requested
          </p>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="">Select Service</option>
            <option value="Service 1">Service 1</option>
            <option value="Service 2">Service 2</option>
            <option value="Service 3">Service 3</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 font-semibold border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-orange-400 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-500 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
