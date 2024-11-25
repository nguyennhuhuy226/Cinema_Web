import { request } from "./request"



export const getBranch = async () => {
    try {
        const response = await request.get('/branch')
    } catch (error) {
        console.log(error)
    }
}