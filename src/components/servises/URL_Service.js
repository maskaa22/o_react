import axios from "axios";
import {URL} from "../../config";


 const api = axios.create({
     withCredentials: true,
    baseURL: URL.AUTH_URL
})
api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})
api.interceptors.response.use((config) => {

    return config;
},async (error) => {
     const originalRequest = error.config;
     // console.log(originalRequest);

    if (error.response.status === 401
         && error.config && !error.config._isRetry
    ) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get(`${URL.AUTH_URL}/auth/refresh`, {withCredentials: true})
            // console.log(response);
            localStorage.setItem('token', response.data.tokenPair.access_token);
            return api.request(originalRequest);

        } catch (e) {

            console.log('НЕ АВТОРИЗОВАН', e)
        }
    }
    throw error;
})

export  class AuthService {
    static async login(email, password) {
        return api.post('/auth/login', {email, password})
    }
    static async registration(name, email, password){
    return api.post('/auth/registration', {name, email, password})
    }

    static async logout() {
        return api.get('/auth/logout')
    }
    static async auth() {
        return api.get('/auth/refresh',{withCredentials: true})
    }
}
export  class UserService {

    static async users() {
        return api.get('/users')
    }
}
export  class ProductService {

    static async users() {
        return api.get('/products')
    }
}
