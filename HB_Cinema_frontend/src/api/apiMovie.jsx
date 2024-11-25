import { request } from "./request"


 export const getMovies = async () => {
   try {
    const response = await request.get('/movies');
   return response.data
   } catch (error) {
    console.log(error)
   }
 }

 export const getMovieById = async (id) => {
  try {
    const reponse = await request.get(`/movies/${id}`);
    return reponse.data;

  } catch (error) {
    console.log(error)
  }
 }


