import axios from "axios";

export const submitFeedback = async (providerId, stars, review, token, bookingId) => {
  const userEmail = localStorage.getItem("userEmail");

  const res = await axios.post(
    "http://localhost:3000/api/feedback",
    {
      bookingId,
      providerId,
      userEmail,
      stars,
      review,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};
