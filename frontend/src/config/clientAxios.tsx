import axios from 'axios'

const clientAxios = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`
})

clientAxios.interceptors.request.use( config => {
    const token = localStorage.getItem('AUTH_TOKEN')
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})


export default clientAxios;