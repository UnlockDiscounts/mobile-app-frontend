import axios from "axios";

export const submitFeedback = async (providerId, stars, review, token, bookingId) => {
  const userEmail = localStorage.getItem("userEmail");

  const res = await axios.post(
    "https://mobile-app-backend-1-ntir.onrender.com/api/feedback",
    {
      bookingId,
      userEmail,
      stars,
      review,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};
