import axios from 'axios'

export const loginUser = async(data) => {
    const res = await axios.post(`http://localhost:3001/api/user/sign-in`, data)
    return res.data
}

export const signupUser = async(data) => {
    const res = await axios.post(`http://localhost:3001/api/user/sign-up`, data)
    return res.data
}