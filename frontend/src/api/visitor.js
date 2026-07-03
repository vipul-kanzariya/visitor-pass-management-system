import axios from 'axios'

const API = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    
});
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getVisitors = async() =>{
    const response = await API.get('/api/visitors/')
    return response.data;
}
export const createVisitors = async(data) =>{
    const response = await API.post('/api/visitors/',data)
    return response.data;
}