import { requestPrivate } from "./request";

// Tạo vé mới(người dùng nhấn nút mua)
export const createTicket = async (ticket) => {
    try {
        console.log("Request create ticket", ticket);
        const reponse = await requestPrivate.post("/tickets",ticket);
        return reponse.data;
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to create ticket");
    }
}