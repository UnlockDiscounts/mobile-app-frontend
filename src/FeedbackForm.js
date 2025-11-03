import React, { useState } from "react";
import { submitFeedback } from "./utils/feedbackService";

const FeedbackForm = ({ providerId, token, onClose }) => {
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (stars === 0) {
      alert("Please give a rating before submitting!");
      return;
    }

    setLoading(true);
    try {
      console.log("Provider ID being sent:", providerId);
      const res = await submitFeedback(providerId, stars, review, token);
      alert(res.message || "Feedback submitted successfully!");
      onClose();
    } catch (err) {
      console.error("Feedback error:", err);
      const msg = err.response?.data?.message || "Failed to submit feedback.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 mx-4">
        <h3 className="text-[20px] font-medium text-black mb-4">
          Share Your Feedback
        </h3>

        <textarea
          placeholder="Write your review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 mb-4"
        />

        <div className="flex items-center mb-6 ml-1">
          <span className="mr-2 text-black font-medium">Rating</span>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`text-3xl cursor-pointer ${
                star <= stars ? "text-orange-400" : "text-gray-300"
              }`}
              onClick={() => setStars(star)}
            >
              ★
            </span>
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-4">
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

export default FeedbackForm;
