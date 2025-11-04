import React, { useState } from "react";
import GreentickIcon from "./assets/greentick.png";
import OtpSuccessImg from "./assets/otpSuccessful.png";
import { useNavigate } from "react-router-dom";
import api from "./utils/api";

export default function PasswordPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [otpPopup, setOtpPopup] = useState(false);
  const [otp, setOtp] = useState("");
  const [showOtpSuccessPopup, setShowOtpSuccessPopup] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);

  const navigate = useNavigate();

  // Handle Email OTP Request
  const handleVerify = async () => {
    if (!email.trim()) {
      setError("Please enter your email before verifying");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await api.post("/email/request-otp", { email });
      console.log("OTP requested:", res.data);
      setOtpPopup(true);
    } catch (err) {
      console.error("OTP request error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    if (!otp.trim()) {
      setError("Please enter the OTP");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/email/verify-otp", { email, otp });
      console.log("OTP verified:", res.data);

      setOtpPopup(false);
      setShowOtpSuccessPopup(true);

      setTimeout(() => setShowOtpSuccessPopup(false), 3000);
    } catch (err) {
      console.error("OTP verify error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // Handle Continue Button
  const handleContinue = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Email and Password are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Try login first
      const loginRes = await api.post("/auth/login", { email, password });
      console.log("Login successful:", loginRes.data);

      localStorage.setItem("accessToken", loginRes.data.accessToken);
      localStorage.setItem("refreshToken", loginRes.data.refreshToken);
      localStorage.setItem("userEmail", loginRes.data.user.email);
      // Inside handleContinue after login/signup success:
      setShowWelcomePopup(true);
      setTimeout(() => {
        setShowWelcomePopup(false);
        navigate("/landing-page");
      }, 3000);
    } catch (loginErr) {
      // If user not found, automatically sign up
      if (loginErr.response?.status === 404) {
        try {
          const signupRes = await api.post("/auth/signup", {
            email,
            password,
            address: "N/A",
          });

          console.log("Signup successful:", signupRes.data);
          localStorage.setItem("accessToken", signupRes.data.accessToken);
          localStorage.setItem("refreshToken", signupRes.data.refreshToken);
          localStorage.setItem("userEmail", signupRes.data.user.email);

          setShowWelcomePopup(true);
          setTimeout(() => {
            setShowWelcomePopup(false);
            navigate("/landing-page");
          }, 3000);
        } catch (signupErr) {
          console.error("Signup error:", signupErr.response?.data || signupErr.message);
          setError(signupErr.response?.data?.message || "Signup failed");
        }
      } else {
        console.error("Login error:", loginErr.response?.data || loginErr.message);
        setError(loginErr.response?.data?.message || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between px-6 py-4 relative">
      <div className="flex-1 flex flex-col justify-center">
        {/* App Name */}
        <div className="flex flex-col items-start mt-2 mb-10">
          <h1 className="text-5xl font-bold">
            <span className="text-black">Mend</span>
            <span className="text-orange-400">ora</span>
          </h1>
        </div>

        <p className="text-black font-bold mt-4 text-left">
          Verify to continue
        </p>

        {/* Email */}
        <div className="mt-3">
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 w-full"
            />
            <button
              onClick={handleVerify}
              disabled={loading}
              className={`absolute right-3 top-1/2 -translate-y-1/2 font-semibold text-sm ${
                loading ? "text-gray-400" : "text-blue-500"
              }`}
            >
              {loading ? "Sending..." : "Verify"}
            </button>
          </div>
        </div>

        {/* Password */}
        <div className="mt-3">
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 w-full"
          />
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      {/* Continue Button */}
      <div className="mb-6">
        <button
          onClick={handleContinue}
          className="w-full bg-orange-400 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-orange-600 transition"
        >
          Continue
        </button>
      </div>

      {/* OTP Input Popup */}
      {otpPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 px-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center max-w-xs w-full">
            <h2 className="text-lg font-bold text-black mb-3">Enter OTP</h2>
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
              maxLength={6}
              className="border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400 w-full text-center"
            />
            <div className="flex gap-3">
              <button
                onClick={handleOtpSubmit}
                disabled={loading}
                className="bg-orange-400 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600"
              >
                {loading ? "Verifying..." : "Submit"}
              </button>
              <button
                onClick={() => setOtpPopup(false)}
                className="bg-gray-200 text-black px-4 py-2 rounded-lg font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OTP Verified Popup */}
      {showOtpSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
          <div className="relative bg-orange-100 rounded-2xl shadow-lg p-6 flex flex-col items-center max-w-xs w-full overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-400 rounded-full blur-2xl opacity-70 transform translate-x-8 -translate-y-8"></div>

            <img
              src={OtpSuccessImg}
              alt="Success"
              className="w-20 h-20 mb-4 relative z-10"
            />
            <p className="text-black font-bold flex items-center text-lg relative z-10">
              <img src={GreentickIcon} alt="Verified" className="w-5 h-5 mr-2" />
              OTP verified successfully!
            </p>
          </div>
        </div>
      )}

      {/* Welcome Popup for Login/Signup */}
      {showWelcomePopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
          <div className="relative bg-orange-100 rounded-2xl shadow-lg p-6 flex flex-col items-center max-w-xs w-full overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-400 rounded-full blur-2xl opacity-70 transform translate-x-8 -translate-y-8"></div>

            <img
              src={GreentickIcon}
              alt="Success"
              className="w-20 h-20 mb-4 relative z-10"
            />
            <p className="text-black font-bold flex items-center text-lg relative z-10">
              Welcome to Mendora!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
