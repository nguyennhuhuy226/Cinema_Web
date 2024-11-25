import { requestPrivate } from "./request"; // Sử dụng request với Interceptor đã cấu hình

// Lấy thông tin người dùng hiện tại
export const getMyInfo = async () => {
  try {
    const response = await requestPrivate.get("/users/myInfo");
    return response.data;
  } catch (error) {
    console.error("Error fetching my info:", error);
    throw error;
  }
};

// Lấy danh sách tất cả người dùng
export const getUsers = async () => {
  try {
    const response = await requestPrivate.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Thêm người dùng mới
export const addUser = async (user) => {
  try {
    const response = await requestPrivate.post("/users", user);
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

// Cập nhật thông tin người dùng
export const updateUser = async (id, user) => {
  try {
    const response = await requestPrivate.put(`/users/${id}`, user);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Xóa người dùng
export const deleteUser = async (id) => {
  try {
    await requestPrivate.delete(`/users/${id}`);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
