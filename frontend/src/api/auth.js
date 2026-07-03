import axios from 'axios'

const API = axios.create({
    baseURL:import.meta.env.VITE_API_URL
});
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
export const loginUser = async(email,password) =>{
    const response =await API.post('/api/auth/login',{email,password});
    return response.data;
}
export const registerUser = async(name,email,password,role) =>{
    const response =await API.post('/api/auth/register',{name,email,password,role});
    return response.data;
}
