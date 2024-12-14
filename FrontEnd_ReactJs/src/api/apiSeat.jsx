import { request, requestPrivate } from "./request"

export const getSeat = async (id) => {
  try {
    const reponse = await request.get(`/seats/schedule/${id}`);
    return reponse.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to get seat");
  }
};


export const getSeatBySchedule = async (id) => {
  try {
    const reponse = await requestPrivate.get(`/schedule_seat/schedule/${id}`);
    return reponse.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to get seat");
  }
};

