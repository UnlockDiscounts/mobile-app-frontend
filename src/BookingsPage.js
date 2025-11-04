import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import FeedbackForm from "./FeedbackForm";
import HomeIcon from "./assets/home.png";
import BookingsIcon from "./assets/bookings.png";
import AccountIcon from "./assets/account.png";
import GreentickIcon from "./assets/greentick.png";
import { useNavigate } from "react-router-dom";

const BookingsPage = () => {
  const [bookingsData, setBookingsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();

    // Auto-refresh when coming back to this page
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchBookings();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const fetchBookings = async () => {
    try {
      // Get email from localStorage
      let userEmail = localStorage.getItem("userEmail");

      // If not in localStorage, try to get from URL params or session
      if (!userEmail) {
        const urlParams = new URLSearchParams(window.location.search);
        userEmail = urlParams.get("email");
      }

      if (!userEmail) {
        setError("Email not found. Please login or create a booking first.");
        setLoading(false);
        return;
      }

      console.log("Fetching bookings for email:", userEmail);

      const response = await fetch(
        `http://localhost:3000/api/booking/user/${encodeURIComponent(
          userEmail
        )}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await response.json();
      console.log("Bookings data received:", data);

      // Handle different response structures
      if (Array.isArray(data)) {
        setBookingsData(data);
      } else if (data.bookings && Array.isArray(data.bookings)) {
        setBookingsData(data.bookings);
      } else if (data.data && Array.isArray(data.data)) {
        setBookingsData(data.data);
      } else {
        setBookingsData([]);
      }

      setLoading(false);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleTapToRate = (booking) => {
    setSelectedBooking(booking);
    setShowFeedback(true);
  };

  const handleFeedbackSubmit = ({ review, stars }) => {
    console.log("Feedback for", selectedBooking, ":", review, stars);
  };

  const handleBack = () => {
    navigate("/landing-page");
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading bookings...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center px-6">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => navigate("/landing-page")}
            className="px-4 py-2 bg-orange-400 text-white rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-6 py-4 flex flex-col relative pb-20">
      {/* Header */}
      <div className="flex items-center mb-3">
        <button onClick={handleBack} className="text-black-400 mr-5">
          <ArrowLeft size={28} />
        </button>
        <h2 className="flex-1 text-left font-medium text-[20px] text-black-600">
          Bookings
        </h2>
      </div>
      <div className="-mx-6 mb-5">
        <hr className="border-t border-gray-300 shadow-lg" />
      </div>

      {/* No Bookings Message */}
      {bookingsData.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <p className="text-gray-500 text-lg mb-2">No bookings yet</p>
          <p className="text-gray-400 text-sm mb-6">
            Start exploring services!
          </p>
          <button
            onClick={() => navigate("/landing-page")}
            className="px-6 py-2 bg-orange-400 text-white rounded-lg"
          >
            Browse Services
          </button>
        </div>
      ) : (
        /* Booking Cards */
        bookingsData.map((booking) => (
          <div
            key={booking._id || booking.id}
            className="relative border border-gray-300 rounded-xl p-4 mb-4 shadow-sm flex flex-col"
          >
            {/* Status at top-right */}
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
              <img
                src={GreentickIcon}
                alt="Greentick"
                className="w-4 h-4 cursor-pointer"
              />
              <span>{booking.status || "PENDING"}</span>
            </div>

            {/* Service Info */}
            <p className="text-black-600 font-semibold text-base">
              {booking.service || booking.serviceName}
            </p>
            <p className="text-gray-600 text-sm mt-1">{booking.businessName}</p>
            <p className="text-gray-500 text-sm mt-1">
              Provider: {booking.providerName}
            </p>
            <p className="text-orange-600 font-medium text-sm mt-1">
              ₹{booking.price}
            </p>
            <p className="text-gray-500 text-xs mt-2">
              {booking.date
                ? new Date(booking.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : new Date(booking.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
            </p>

            {/* Address */}
            {booking.address && (
              <p className="text-gray-500 text-xs mt-1">📍 {booking.address}</p>
            )}

            {/* Tap to Rate at bottom-right */}
            <button
              onClick={() => handleTapToRate(booking)}
              className="absolute bottom-3 right-3 text-gray-600 text-sm font-medium hover:text-orange-500"
            >
              Tap to rate
            </button>
          </div>
        ))
      )}

      {/* Feedback Modal */}
      {showFeedback && selectedBooking && (
        <FeedbackForm
          providerId={
            selectedBooking.providerId || selectedBooking.provider?._id
          }
          token={localStorage.getItem("token")}
          bookingId={selectedBooking._id}
          onClose={() => setShowFeedback(false)}
        />
      )}

      {/* Bottom Navigation */}
      <div className="bg-white flex justify-around items-center p-3 shadow-inner fixed bottom-0 left-0 w-full">
        <div
          className="flex flex-col items-center text-gray-700 hover:text-orange-500 transition-colors duration-200 cursor-pointer"
          onClick={() => navigate("/landing-page")}
        >
          <img src={HomeIcon} alt="Home" className="w-6 h-6" />
          <span className="text-xs font-medium mt-1">Home</span>
        </div>
        <div
          className="flex flex-col items-center text-orange-500 transition-colors duration-200 cursor-pointer"
          onClick={() => navigate("/bookings")}
        >
          <img src={BookingsIcon} alt="Bookings" className="w-6 h-6" />
          <span className="text-xs font-medium mt-1">Bookings</span>
        </div>
        <div
          className="flex flex-col items-center text-gray-700 hover:text-orange-500 transition-colors duration-200 cursor-pointer"
          onClick={() => navigate("/edit-profile")}
        >
          <img src={AccountIcon} alt="Account" className="w-6 h-6" />
          <span className="text-xs font-medium mt-1">Account</span>
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;
