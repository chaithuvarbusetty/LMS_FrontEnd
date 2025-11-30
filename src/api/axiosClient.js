import axios from 'axios'
import { getToken, clearAuth } from '../context/authStorage'

const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
    }
})

api.interceptors.request.use(config => {
    const token = getToken()
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

api.interceptors.response.use(
    res => res,
    err => {
        if (err.response?.status === 401) clearAuth()
        return Promise.reject(err)
    }
)

export default api