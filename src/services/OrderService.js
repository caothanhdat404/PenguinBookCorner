import axios from 'axios'

export const createOrder = async(data, access_token) => {
    const res = await axios.post('http://localhost:3000/api/order/create', data, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })
    return res.data
}
