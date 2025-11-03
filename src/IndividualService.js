import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, ArrowLeft, MapPin } from "lucide-react";
import PlumberImg from "./assets/plu.png";
import ProfileImg from "./assets/profile.png";
import ShareIcon from "./assets/share.png";
import WhatsAppIcon from "./assets/whatsapp.png";
import BookingForm from "./BookingForm";

const services = [
  {
    id: 1,
    name: "Waste pipe replacement",
    description:
      "Remove damaged or leaking waste pipes and install new, durable piping to ensure smooth drainage.",
    img: PlumberImg,
  },
  {
    id: 2,
    name: "Water hose installation",
    description:
      "Safe and precise setup of water inlet/outlet hoses for appliances or fixtures to prevent leaks and maintain steady flow.",
    img: PlumberImg,
  },
];

const reviews = [
  {
    id: 1,
    name: "Nisha Mann",
    date: "Sep 12, 2025",
    description:
      "Quick and professional-he fixed my leaking sink pipe in no time and left everything spotless.",
  },
  {
    id: 2,
    name: "Amit Sharma",
    date: "Oct 1, 2025",
    description:
      "Safe and precise setup of water inlet/outlet hoses for appliances or fixtures to prevent leaks and maintain steady flow.",
  },
  {
    id: 3,
    name: "Sonal Verma",
    date: "Oct 5, 2025",
    description: "Excellent service, punctual, and very clean work.",
  },
  {
    id: 4,
    name: "Ravi Kumar",
    date: "Oct 8, 2025",
    description: "Highly recommend Rakesh Plumbing for all plumbing emergencies.",
  },
];

export default function IndividualService() {
  const navigate = useNavigate();
  const [showBooking, setShowBooking] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col relative pb-24">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 bg-white flex justify-between items-center px-5 py-4 shadow-md z-10">
        <ArrowLeft
          className="text-black cursor-pointer"
          size={24}
          onClick={() => navigate("/landing-page")}
        />
        <img src={ShareIcon} alt="Share" className="w-5 h-5 cursor-pointer" />
      </div>

      {/* Main Content */}
      <div className="pt-16 px-4 space-y-6">
        {/* Rakesh Plumbing Service Card */}
        <div className="bg-white rounded-2xl shadow-md p-4">
          <img
            src={PlumberImg}
            alt="Rakesh Plumbing Service"
            className="w-full h-48 rounded-xl object-cover mb-3"
          />

          <div className="flex items-center space-x-2 mb-2">
            <img src={ProfileImg} alt="Profile" className="w-6 h-6" />
            <h2 className="text-lg font-semibold text-black">
              Rakesh Plumbing Service
            </h2>
          </div>

          <div className="flex items-center text-sm text-gray-600 space-x-2 mb-3">
            <div className="flex items-center space-x-1">
              <Star className="text-yellow-500 w-4 h-4 fill-yellow-500" />
              <span>4.5 (25 reviews)</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4 text-pink-500" />
              <span>Warangal, Telangana</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <button className="flex items-center space-x-2 border border-blue-400 bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium">
                📞 <span>Call Now</span>
              </button>
              <button className="flex items-center space-x-2 border border-green-400 bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-sm font-medium">
                <img src={WhatsAppIcon} alt="whatsapp" className="w-4 h-4" />
                <span>WhatsApp</span>
              </button>
            </div>
            <button 
              onClick={() => setShowBooking(true)} // 👈 open modal
              className="px-4 py-1.5 border-2 border-orange-400 text-black rounded-full font-medium hover:bg-orange-500 hover:text-white"
            >
              Book
            </button>
          </div>
        </div>

        {/* Services Section */}
        <div>
          <h1 className="text-xl font-bold text-black mb-4 px-1">Services</h1>

          <div className="space-y-5">
            {services.map((service) => (
              <div
                key={service.id}
                className="flex justify-between items-center bg-white rounded-2xl shadow-md p-3"
              >
                <div className="flex flex-col space-y-1">
                  <h2 className="text-base font-semibold text-black">
                    {service.name}
                  </h2>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </div>
                <div className="ml-4 mr-4 flex-shrink-0 rounded-xl overflow-hidden">
                  <img
                    src={service.img}
                    alt={service.name}
                    className="w-24 h-24 rounded-xl object-cover mb-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div>
          <h1 className="text-xl font-bold text-black mb-4 px-1">Reviews</h1>

          <div className="flex space-x-4 overflow-x-auto pb-2">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="flex-shrink-0 w-72 bg-white rounded-2xl shadow-md p-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex flex-col">
                    <h2 className="text-base font-semibold text-black">
                      {review.name}
                    </h2>
                    <span className="text-gray-500 text-sm">{review.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium text-black">4.3</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{review.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Information Section */}
        <div className="mt-6 bg-white rounded-2xl shadow-md p-4">
          <h2 className="text-lg font-semibold text-black mb-2">
            Quick Information
          </h2>
          <p className="text-gray-600 text-sm">
            Quick Info: Rakesh Plumbing Service provides professional plumbing
            solutions, specializing in fixing leaks, installing fixtures, and
            handling all types of plumbing emergencies for residential and
            commercial clients.
          </p>
        </div>
      </div>

      {/* Booking Form */}
      {showBooking && <BookingForm onClose={() => setShowBooking(false)} />}
    </div>
  );
}
