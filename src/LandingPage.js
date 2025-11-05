import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlumberImg from "./assets/plu.png";
import CarpenterImg from "./assets/carpenter.png";
import PaintingImg from "./assets/painter.png";
import BathroomImg from "./assets/bathroom.png";
import BedroomImg from "./assets/bedroom.png";
import KitchenImg from "./assets/kitchen.png";
import SearchIcon from "./assets/search.png";
import HomeIcon from "./assets/home.png";
import BookingsIcon from "./assets/bookings.png";
import AccountIcon from "./assets/account.png";
import ServicePage from "./ServicePage";
import YellowImg from "./assets/yellow.png";
import BlueImg from "./assets/blue.png";
import RedImg from "./assets/red.png";
import GreenImg from "./assets/green.png";

const popularServices = [
  { id: 1, name: "Plumber", img: PlumberImg, category: "Plumbing" },
  { id: 2, name: "Carpenter", img: CarpenterImg, category: "Carpentry" },
  { id: 3, name: "Painting", img: PaintingImg, category: "Painting" },
];

const trendingHighlights = [
  { id: 1, name: "Bathroom Renovation", img: BathroomImg, category: "Bathroom Renovation" },
  { id: 2, name: "Kitchen Renovation", img: KitchenImg, category: "Kitchen Renovation" },
  { id: 3, name: "Bedroom Renovation", img: BedroomImg, category: "Bedroom Renovation" },
];

const whyChooseMendora = [
  {
    id: 1,
    title: "Your Feedback our Priority",
    desc: "We value your feedback, using it to deliver smarter deals and a smoother experience.",
    border: "border-yellow-500",
    bg: "bg-yellow-50",
    glow: "bg-yellow-400",
    img: YellowImg,
  },
  {
    id: 2,
    title: "Top-Rated Professionals",
    desc: "Our pros consistently receive excellent reviews from satisfied customers.",
    border: "border-blue-500",
    bg: "bg-blue-50",
    glow: "bg-blue-400",
    img: BlueImg,
  },
  {
    id: 3,
    title: "Flexible Scheduling",
    desc: "Book appointments at your convenience, with flexible scheduling options.",
    border: "border-red-500",
    bg: "bg-red-50",
    glow: "bg-red-400",
    img: RedImg,
  },
  {
    id: 4,
    title: "Background-Checked Pros",
    desc: "We thoroughly vet all our pros to ensure they meet our high standards.",
    border: "border-green-500",
    bg: "bg-green-50",
    glow: "bg-green-400",
    img: GreenImg,
  },
];

const LandingPage = () => {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeService, setActiveService] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [allServices, setAllServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef(null);

  // Backend se saari services fetch karo
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://mobile-app-backend-1-ntir.onrender.com/api/provider/services');
        const data = await response.json();
        setAllServices(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching services:', error);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Jab category select ho, tab filter karo
  useEffect(() => {
    if (selectedCategory && allServices.length > 0) {
      const filtered = allServices.filter(
        service => service.service_category === selectedCategory
      );
      setFilteredServices(filtered);
      console.log('Filtered Services:', filtered);
    }
  }, [selectedCategory, allServices]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const cards = Array.from(scrollContainer.children);
    if (cards.length === 0) return;

    const cardGap = 16;
    const cardWidth = cards[0].offsetWidth + cardGap;

    let index = 0;

    const scrollStep = () => {
      index++;
      scrollContainer.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });

      if (index >= cards.length) {
        index = 0;
        scrollContainer.scrollTo({
          left: 0,
          behavior: "auto",
        });
      }
    };

    const interval = setInterval(scrollStep, 3000);
    return () => clearInterval(interval);
  }, []);

  // Jab koi service pe click kare
  const handleServiceClick = (service) => {
    setActiveService(service);
    setSelectedCategory(service.category); // Category set karo
    setIsServiceOpen(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col relative">
      {/* Top Header */}
      <div
        className="w-full h-20 px-4 flex items-center shadow-md"
        style={{
          background:
            "radial-gradient(98.34% 98.34% at 108.85% 95%, #FF9800 15.38%, #FFF3C5 64.92%), linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02))",
        }}
      >
        <div className="flex items-center gap-3">
          <img
            src={require("./assets/logo.jpg")}
            alt="Mendora Logo"
            className="w-12 h-12 rounded-3xl object-cover"
          />
          <h1 className="text-orange-500 font-poppins font-bold text-2xl tracking-tight">
            <span className="text-black">Mend</span>
            <span className="text-orange-600">ora</span>
          </h1>
        </div>
      </div>

      <div className="px-4 py-5">
        {/* 🔍 Search Bar */}
        <div className="relative mb-5">
          <div
            className="flex items-center border-2 border-orange-400 rounded-xl p-3"
            onClick={() => setShowDropdown(true)}
          >
            <img src={SearchIcon} alt="Search" className="w-4 h-4 mr-2" />
            <input
              type="text"
              placeholder="Search for services"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              className="flex-1 outline-none text-gray-700 text-sm"
            />
          </div>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute top-full left-0 mt-2 w-full bg-white border border-orange-400 rounded-xl shadow-lg z-50 max-h-[220px] overflow-y-auto">
              {[
                { id: 1, name: "Plumbing Service", desc: "Leak repair & installation" },
                { id: 2, name: "Carpentry Work", desc: "Custom woodwork & repairs" },
                { id: 3, name: "Home Painting", desc: "Interior & exterior painting" },
                { id: 4, name: "Electrical Repair", desc: "Fix wiring & power issues" },
                { id: 5, name: "AC Servicing", desc: "Cooling maintenance & gas refill" },
              ].map((item, index, array) => (
                <div
                  key={item.id}
                  className={`p-3 hover:bg-orange-50 cursor-pointer ${
                    index < array.length - 1 ? "border-b border-black/25" : ""
                  }`}
                >
                  <p className="text-gray-900 font-bold text-medium">{item.name}</p>
                  <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 🧰 Popular Services */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            <span className="text-black">Popular</span>
            <span className="text-orange-400"> Services</span>
          </h2>

          <div className="bg-white rounded-xl shadow-md p-4">
            <div>
              <span className="text-gray-800 text-medium font-medium">Arriving in </span>
              <span className="text-orange-400 text-medium font-bold">⚡30 mins</span>
            </div>

            <div className="flex overflow-x-auto space-x-3 pb-2 hide-scrollbar">
              {popularServices.map((service) => (
                <div
                  key={service.id}
                  className="flex-shrink-0 w-44 h-44 flex flex-col items-center justify-center cursor-pointer"
                  onClick={() => handleServiceClick(service)}
                >
                  <img
                    src={service.img}
                    alt={service.name}
                    className="w-25 h-25 rounded-xl object-contain mb-2"
                  />
                  <span className="text-sm font-medium text-gray-700">{service.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 🔥 Trending Highlights */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            <span className="text-black">Trending</span>
            <span className="text-orange-400"> Highlights</span>
          </h2>

          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex overflow-x-auto space-x-3 pb-2 hide-scrollbar">
              {trendingHighlights.map((highlight) => (
                <div
                  key={highlight.id}
                  className="flex-shrink-0 w-44 h-44 flex flex-col items-center justify-center cursor-pointer"
                  onClick={() => handleServiceClick(highlight)}
                >
                  <img
                    src={highlight.img}
                    alt={highlight.name}
                    className="w-25 h-25 rounded-xl object-contain mb-2"
                  />
                  <span className="text-sm font-medium text-gray-700 text-center">
                    {highlight.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 💡 Why Choose Mendora */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-gray-800 mb-3">
            <span className="text-black">Why Choose </span>
            <span className="text-orange-400">Mendora!</span>
          </h2>

          <div ref={scrollRef} className="flex overflow-x-auto space-x-4 pb-2 scroll-smooth">
            {whyChooseMendora.map((item) => (
              <div
                key={item.id}
                className={`relative rounded-2xl shadow-md p-8 flex items-center w-full flex-shrink-0 border-2 overflow-hidden ${item.border} ${item.bg}`}
              >
                <div
                  className={`absolute top-0 right-0 w-24 h-24 ${item.glow} rounded-full blur-2xl opacity-60 transform translate-x-6 -translate-y-6`}
                ></div>

                <img
                  src={item.img}
                  alt={item.title}
                  className="w-12 h-12 mr-4 relative z-10 flex-shrink-0"
                />

                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">{item.title}</h3>
                  <p className="text-medium text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 📋 Service Drawer */}
      {isServiceOpen && (
        <div className="fixed bottom-0 left-0 w-full h-[65%] bg-white rounded-t-3xl shadow-xl overflow-auto transition-transform duration-300 z-50">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl text-black font-bold">{activeService?.name}</h2>
            <button
              onClick={() => {
                setIsServiceOpen(false);
                setSelectedCategory(null);
                setFilteredServices([]);
              }}
              className="text-black text-3xl mr-2 font-bold"
            >
              ×
            </button>
          </div>

          <div className="p-4">
            {loading ? (
              <p className="text-center text-gray-500">Loading services...</p>
            ) : filteredServices.length > 0 ? (
              <div>
                <h3 className="text-lg font-bold mb-4 text-gray-800">
                  Available {selectedCategory} Services
                </h3>
                <div className="space-y-3">
                  {/* Group by businessName */}
                  {Array.from(new Set(filteredServices.map(s => s.businessName))).map((businessName) => {
                    const businessServices = filteredServices.filter(s => s.businessName === businessName);
                    const firstService = businessServices[0];
                    
                    return (
                      <div
                        key={businessName}
                        className="bg-orange-50 border border-orange-200 rounded-xl p-4 cursor-pointer hover:bg-orange-100 transition-colors"
                        onClick={() => navigate('/individual-service', { 
                          state: { 
                            businessData: {
                              businessName: firstService.businessName,
                              providerName: firstService.providerName,
                              providerId: firstService.providerId,
                              services: businessServices,
                              category: firstService.service_category
                            }
                          } 
                        })}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-bold text-gray-800 text-lg">{businessName}</h4>
                            <p className="text-sm text-gray-600 mt-1">by {firstService.providerName}</p>
                            <p className="text-xs text-gray-500 mt-1">{businessServices.length} services available</p>
                          </div>
                          <div className="text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500">No services available in this category</p>
            )}
          </div>
        </div>
      )}

      {/* 🧭 Bottom Navigation */}
      <div className="bg-white z-50 flex justify-around items-center p-3 shadow-inner fixed bottom-0 left-0 w-full">
        <div
          className="flex flex-col items-center text-gray-700 hover:text-orange-500 transition-colors duration-200 cursor-pointer"
          onClick={() => navigate("/landing-page")}
        >
          <img src={HomeIcon} alt="Home" className="w-6 h-6" />
          <span className="text-xs font-medium mt-1">Home</span>
        </div>
        <div
          className="flex flex-col items-center text-gray-700 hover:text-orange-500 transition-colors duration-200 cursor-pointer"
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

export default LandingPage;