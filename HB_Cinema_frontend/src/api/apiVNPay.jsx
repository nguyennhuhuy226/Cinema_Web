import { requestPrivate } from "./request";

// Chuyển đến trang VNPay
export const goToVNPay = async (amount) => {
  try {
    const reponse = await requestPrivate.get(
      `/payment/vn-pay?amount=${amount}&bankcode=NCB`
    );
    return reponse.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to get Users");
  }
};
