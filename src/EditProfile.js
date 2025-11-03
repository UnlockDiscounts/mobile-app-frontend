import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfileEditPage() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [mobile, setMobile] = useState("");
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    countryCode: "",
    mobile: "",
  });

  useEffect(() => {
    const savedName = localStorage.getItem("userName") || "";
    const savedEmail = localStorage.getItem("userEmail") || "";
    const savedMobile = localStorage.getItem("userMobile") || "";

    setFullName(savedName);
    setEmail(savedEmail);
    setMobile(savedMobile);
  }, []);

  const handleSave = () => {
    const newErrors = {
      fullName: fullName.trim() ? "" : "Full name is required",
      email: email.trim() ? "" : "Email is required",
      countryCode: countryCode.trim() ? "" : "Country code is required",
      mobile: /^\d{10}$/.test(mobile.trim())
        ? ""
        : "Enter a valid 10-digit mobile number",
    };
    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((err) => err !== "");
    if (hasError) return;

    console.log("Profile Saved:", { fullName, email, countryCode, mobile });
    navigate("/landing-page");
  };

  const handleBack = () => {
    console.log("Back button clicked");
    navigate("/landing-page");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between px-6 py-4">
      {/* Header */}
      <div className="flex items-center mb-3">
        <button onClick={handleBack} className="text-black-400 mr-5">
          <ArrowLeft size={28} />
        </button>
        <h2 className="flex-1 text-left font-medium text-[20px] text-gray-800">
          Profile
        </h2>
      </div>

      <div className="-mx-6 mb-5">
        <hr className="border-t border-gray-300 shadow-lg" />
      </div>

      <p className="text-black-600 text-lg font-bold mt-5 mb-5 text-left">
        Edit Profile
      </p>

      {/* Form */}
      <div className="flex-1 flex flex-col">
        <p className="text-black-600 mb-2 text-left text-sm">Full Name</p>
        <input
          type="text"
          value={fullName}
          onChange={(e) =>
            setFullName(e.target.value.replace(/[^A-Za-z ]/g, ""))
          }
          className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
        )}

        <p className="text-black-600 mt-3 mb-2 text-left text-sm">Email</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}

        <p className="text-black-600 mt-3 mb-2 text-left text-sm">Phone Number</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 w-24 focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          <input
            type="tel"
            value={mobile}
            onChange={(e) =>
              setMobile(e.target.value.replace(/[^0-9]/g, ""))
            }
            className="border border-gray-300 rounded-lg px-4 py-3 flex-1 focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
        </div>
        {errors.mobile && (
          <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
        )}
      </div>

      {/* Save Button */}
      <div className="mb-6">
        <button
          onClick={handleSave}
          className="w-full bg-orange-400 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-orange-500"
        >
          Save Information
        </button>
      </div>
    </div>
  );
}
