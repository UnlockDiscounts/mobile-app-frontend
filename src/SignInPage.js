import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignInPage() {
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [nameError, setNameError] = useState("");
  const navigate = useNavigate();

  const handleConfirm = () => {
    let valid = true;

    if (!fullName.trim()) {
      setNameError("Full name is required");
      valid = false;
    } else {
      setNameError("");
    }

    if (valid) {
    // Save user details locally
      localStorage.setItem("userName", fullName);
      localStorage.setItem("userMobile", mobile);
      localStorage.setItem("userAddress", address);

      console.log("Confirm clicked:", fullName, mobile, address);
      navigate("/password", { state: { fullName, mobile, address } });
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between px-6 py-4">
      <div className="flex-1 flex flex-col justify-center">
        {/* App Name */}
        <div className="flex flex-col items-start mt-2 mb-10">
          <h1 className="text-5xl font-bold">
            <span className="text-black">Mend</span>
            <span className="text-orange-400">ora</span>
          </h1>
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-4">
          <p className="text-black font-bold mt-4 text-left">
            Please enter your details
          </p>

          {/* Full Name */}
          <input
            type="text"
            placeholder="Enter Full Name"
            value={fullName}
            onChange={(e) => {
              const val = e.target.value.replace(/[^A-Za-z\s]/g, "");
              setFullName(val);
              setNameError("");
            }}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          {nameError && <p className="text-red-500 text-sm mt-0">{nameError}</p>}

          {/* Mobile Number */}
          <div className="relative">
            <input
              type="tel"
              placeholder="Enter Mobile Number"
              value={mobile}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, "");
                setMobile(val.slice(0, 10));
              }}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              Optional
            </span>
          </div>

          {/* Address */}
          <div className="relative">
            <input
              type="text"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              Optional
            </span>
          </div>

          <p className="text-black text-sm mt-2">
            Are you a service provider?{" "}
            <span
              onClick={() => navigate("/provider-registration")}
              className="text-blue-500 cursor-pointer"
            >
              Register here
            </span>
          </p>
        </div>
      </div>

      {/* Confirm button */}
      <div className="mb-6">
        <button
          onClick={handleConfirm}
          className="w-full bg-orange-400 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-orange-600"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
