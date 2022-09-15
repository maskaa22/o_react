import axios from "axios";

import {URL} from "../../config";
import {archiveOrder} from "./API";

const api = axios.create({
     withCredentials: true,
    baseURL: URL.AUTH_URL
});

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
});
api.interceptors.response.use((config) => {
    return config;
},async (error) => {
     const originalRequest = error.config;

    if (error.response.status === 401
         && error.config && !error.config._isRetry
    ) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get(`${URL.AUTH_URL}/auth/refresh`, {withCredentials: true});

            localStorage.setItem('token', response.data.tokenPair.access_token);

            return api.request(originalRequest);
        } catch (e) {
            console.log('НЕ АВТОРИЗОВАН', e)
        }
    }
    throw error;
});

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
    static async editAdminData(_id, name, surname, email, phone, oldPassword, number, numberToo) {
        return api.patch('/users', {_id, name, surname, email, phone, oldPassword, number, numberToo})
    }
    static async editData(_id, name, surname, email, phone, oldPassword, number, numberToo, nameSity, nameDepartment) {
        return api.patch('/users', {_id, name, surname, email, phone, oldPassword, number, numberToo, nameSity, nameDepartment})
    }
}
export  class ProductService {

    static async products(page, limit) {
        return api.get('/products', {params: {page, limit}})
    }
    static async product(product_name, title, price,category_id, count, totalPrice, inventoryNumber) {
        return api.post('/products', {product_name, title, price, category_id, count, totalPrice, inventoryNumber})
    }
    static async deleteProduct(inventoryNumber) {
        return api.delete('/products', {params: {inventoryNumber}})
    }
}
export  class CategoryService {

    static async allCategories() {
        return api.get('/category')
    }
    static async createCategories(category_name) {
        return api.post('/category', {category_name})
    }
    static async filtreCategories(checkCategory, page, limit) {
        return api.post(`/category/${checkCategory}`, {checkCategory}, {params: {page, limit}})
    }
}
export  class OrderService {

    static async orders() {
        return api.get('/products/orders')
    }
    static async ordersByFilter(status) {
        console.log(status);
        return api.get('/products/orders_filter', {params: {status}})
    }
    static async order(user_id, user_name, cart, status, summa, month) {
        return api.post('/products/orders', {user_id, user_name, cart, status, summa, month})
    }
    static async analyze() {
        return api.get('/products/order_analyze')
    }
    static async getArchiveOrders() {
        return api.get('/products/archive_order')
    }
    static async archiveOrder(_id) {
        return api.post('/products/archive_order', {_id})
    }
    static async deleteArchiveOrder(_id) {
        return api.delete('/products/archive_order', {params: {_id}})
    }
    static async analyzeOrder(month, summa) {
        return api.post('/products/order_analyze', {month, summa})
    }
    static async updateAnalyzeOrder(month, summa) {
        return api.patch('/products/order_analyze', {month, summa})
    }
    static async updateStatus(_id, status) {
        return api.patch('/products/orders', {_id, status})
    }
    static async userById(id) {
        return api.get(`/products/orders`)
    }
}
