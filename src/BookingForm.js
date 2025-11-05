import React, { useState, useEffect } from "react";

const BookingForm = ({ onClose, businessName, providerName, services, category }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [service, setService] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState("");

  useEffect(() => {
    const savedName = localStorage.getItem("userName") || "";
    const savedEmail = localStorage.getItem("userEmail") || "";
    const savedAddress = localStorage.getItem("userAddress") || "";

    setFullName(savedName);
    setEmail(savedEmail);
    setAddress(savedAddress);
  }, []);

  // When service is selected, auto set price
  const handleServiceChange = (e) => {
    const selectedServiceName = e.target.value;
    setService(selectedServiceName);

    const selected = services.find(
      (item) => item.serviceName === selectedServiceName
    );
    if (selected) {
      setSelectedPrice(selected.price);
    } else {
      setSelectedPrice("");
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!fullName.trim()) return alert("Please enter your full name!");
    if (!email.trim()) return alert("Please enter your email!");
    if (!address.trim()) return alert("Please enter your address!");
    if (!service) return alert("Please select a service!");

    setLoading(true);
    try {
      const bookingData = {
        fullName: fullName.trim(),
        email: email.trim(),
        address: address.trim(),
        businessName,
        providerName,
        service,
        price: selectedPrice,
        category
      };

      // POST request to backend
      const response = await fetch("https://mobile-app-backend-1-ntir.onrender.com/api/booking/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Booking submitted successfully:", result);
        
        // Save email to localStorage for fetching bookings
        if (email) {
          localStorage.setItem("userEmail", email);
        }
        
        alert("Booking confirmed! Thank you.");
        onClose();
        
        // Redirect to bookings page after successful booking
        setTimeout(() => {
          window.location.href = "/bookings";
        }, 500);
      } else {
        console.error("Backend error:", result);
        alert(result.message || "Failed to submit booking. Please try again.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("Network error. Please check your connection and try again.");
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
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            readOnly
            className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 cursor-not-allowed"
          />

          {/* Provider Name */}
          <p className="text-black-600 mb-2 text-left text-sm">Provider Name</p>
          <input
            type="text"
            value={providerName}
            readOnly
            className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 cursor-not-allowed"
          />

          {/* Services Requested */}
          <p className="text-black-600 mb-2 text-left text-sm">
            Services Requested
          </p>
          <select
            value={service}
            onChange={handleServiceChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="">Select Service</option>
            {services && services.map((item) => (
              <option key={item.serviceId} value={item.serviceName}>
                {item.serviceName} — ₹{item.price}
              </option>
            ))}
          </select>

          {/* Show price if service selected */}
          {selectedPrice && (
            <div className="mt-2 text-sm text-gray-700">
              <strong>Price:</strong> ₹{selectedPrice}
            </div>
          )}
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