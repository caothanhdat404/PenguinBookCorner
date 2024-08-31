import axios from 'axios'

export const getAllProduct = async(data) => {
    const res = await axios.get(`http://localhost:3000/api/product/getAll`)
    return res.data
}