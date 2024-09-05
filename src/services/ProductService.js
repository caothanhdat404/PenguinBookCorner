import axios from 'axios'
import { axiosJWT } from './UserService'

export const getAllProduct = async(limit) => {
    const res = await axios.get(`http://localhost:3000/api/product/getAll?limit=${limit}`)
    return res.data
}

export const createProduct = async(data) => {
    const res = await axios.post('http://localhost:3000/api/product/create', data)
    return res.data
}

export const getDetailProduct = async(id) => {
    const res = await axios.get(`http://localhost:3000/api/product/get-details/${id}`)
    return res.data
}

export const updateProduct = async(id, data, access_token) => {
    const res = await axiosJWT.put(`http://localhost:3000/api/product/update/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })
    return res.data
}

export const deleteProduct = async(id, access_token) => {
    const res = await axiosJWT.delete(`http://localhost:3000/api/product/delete/${id}`, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })
    return res.data
}