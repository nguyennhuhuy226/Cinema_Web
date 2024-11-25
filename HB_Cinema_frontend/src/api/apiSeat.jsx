import { request } from "./request"

export const getSeat = async (id) => {
  try {
    const reponse = await request.get(`/seats/schedule/${id}`);
    return reponse.data;
  } catch (error) {
    console.log(error);
  }
};
