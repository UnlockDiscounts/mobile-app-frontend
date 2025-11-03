import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  

import Home from "./Home";
import SignInPage from "./SignInPage";
import MobilePage from "./MobilePage";
import VerifyPage from "./VerifyPage";
import EditProfile from "./EditProfile";
import ProviderRegistration from "./ProviderRegistration";
import NoBookings from "./NoBookings";
import BookingsPage from "./BookingsPage";
import FeedbackForm from "./FeedbackForm";
import PopupMsg from "./PopupMsg";
import ProviderDashboard from "./ProviderDashboard";
import LandingPage from "./LandingPage";
import Subscribe from "./Subscribe";
import ServicePage from "./ServicePage";
import Individualservice from "./IndividualService";
import PaymentProof from "./PaymentProof";
import ProviderVerify from './ProviderVerify'
import PasswordPage from "./password";
import BookingForm from './BookingForm';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/number" element={<MobilePage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/password" element={<PasswordPage />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/provider-registration" element={<ProviderRegistration />} />
        <Route path="/no-bookings" element={<NoBookings />} />
        <Route path="/feedback-form" element={<FeedbackForm />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/popupmsg" element={<PopupMsg />} />
        <Route path="/provider-dashboard" element={<ProviderDashboard />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/service-page" element={<ServicePage />} />
        <Route path="/individual-service" element={<Individualservice />} />
        <Route path="/payment-proof" element={<PaymentProof />} />
        <Route path="/provider-verify" element={<ProviderVerify />} />
        <Route path="/booking-form" element={<BookingForm />} />
      </Routes>
    </Router>
  );
}
