import { request, requestPrivate } from "./request";


//Lấy lịch chiếu của 1 phim
export const getMovieSchedule = async (id) => {
  try {
    const reponse = await request.get(`/schedule/movies/${id}`);
    return reponse.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to get schedule by movie");
  }
};

//
export const getAllSchedule = async () => {
  try {
    const reponse = await request.get(`/schedule`);
    return reponse.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to get all schedule");
  }
};

//Thêm lịch chiếu theo phim
export const addScheduleByMovie = async (id, schedule) => {
  try {
    console.log("Request Schedule by Movie: ", schedule);
    const response = await requestPrivate.post(
      `/schedule/movies/${id}`,
      schedule
    );
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to add schedule");
  }
};
