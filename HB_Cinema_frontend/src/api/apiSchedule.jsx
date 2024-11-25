import { request } from "./request"

export const getMovieSchedule = async (id) => {
    try {
        const reponse = await request.get(`/schedule/movies/${id}`);
        return reponse.data
    } catch (error) {
        console.log(error)
    }
}

export const getAllSchedule = async () => {
    try {
        const reponse = await request.get(`/schedule`);
        return reponse.data
    } catch (error) {
        console.log(error)
    }
}