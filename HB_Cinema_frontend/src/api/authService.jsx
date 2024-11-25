import { setToken } from "./localStorage";
import { request } from "./request"

export const login = async (username, password) => {
  try {
    const response = await request.post("/auth/token", {
      username: username,
      password: password,
    });
    const token = response.data.result?.token;
    setToken(token);
    return response.data;
  } catch (error) {
    console.log(error)
  }
};
