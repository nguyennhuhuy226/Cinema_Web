
import { request } from "./request";

// Lấy danh sách phòng chi nhánh
export const getRoomByBranch = async (id) => {
  try {
    const response = await request.get(`branch/${id}`);
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to get room");
  }
};
