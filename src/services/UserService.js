import axios from 'axios'

export const loginUser = async(data) => {
    const res = await axios.post(`${process.env.API_URL}/user/sign-in`)
    return res.data
}