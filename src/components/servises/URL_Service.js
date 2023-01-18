import axios from "axios";

import {
    AUTH, AUTH_ACTIVATE_TOKEN_URL, AUTH_EMAIL_FOR_RESET_PASSWORD,
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_REFRESH,
    AUTH_REGISTRATION,
    CATEGORY,
    HOME,
    HOME_FIND, ORDER_BY_USER,
    PRODUCT_ARCHIVE_ORDER,
    PRODUCT_ORDER_ANALYZE,
    PRODUCT_ORDERS,
    PRODUCT_ORDERS_ANALYZE_VISUAL,
    PRODUCT_ORDERS_FILTER, RESET_PASSWORD_,
    USERS,
    USERS_ADRESS,
    USERS_CONTACT,
    USERS_SEND
} from "../../config/serviseConstants";
import {CONTACT, PRODUCTS, UPLOAD} from "../../config/headerConstants";
import {URL} from "../../config";
import {WORD_SWAL_NOT_AUTORIZE, WORD_TOKEN} from "../../config/wordsConstants";
import {activateEmail, resetPassword, sendEmailForResetPassword} from "./API";

const api = axios.create({
    withCredentials: true,
    baseURL: URL.AUTH_URL
});

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(WORD_TOKEN)}`
    return config;
});
api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401
        && error.config && !error.config._isRetry
    ) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get(`${URL.REFRESH_URL}`, {withCredentials: true});

            localStorage.setItem(WORD_TOKEN, response.data.tokenPair.access_token);

            return api.request(originalRequest);
        } catch (e) {
            console.log(WORD_SWAL_NOT_AUTORIZE, e)
        }
    }
    throw error;
});

export class AuthService {

    static async login(email, password) {
        return api.post(AUTH_LOGIN, {email, password})
    }

    static async registration(name, email, password, role, passwordToo, foto) {
        return api.post(AUTH_REGISTRATION, {name, email, password, role, passwordToo, foto})
    }

    static async sendEmailForResetPassword(email) {
        return api.post(AUTH_EMAIL_FOR_RESET_PASSWORD, {email})
    }

    static async activateEmail(token) {
        return api.get(AUTH_ACTIVATE_TOKEN_URL, {params: {token}})
    }

    static async resetPassword(password, passwordToo, _id) {
        return api.patch(RESET_PASSWORD_, {password, passwordToo, _id})
    }

    static async deleteUser(email) {
        return api.delete(AUTH, {params: {email}})
    }

    static async logout() {
        return api.get(AUTH_LOGOUT)
    }

    static async auth() {
        return api.get(AUTH_REFRESH, {withCredentials: true})
    }
}

export class CategoryService {

    static async allCategories() {
        return api.get(CATEGORY)
    }

    static async createCategories(category_name) {
        return api.post(CATEGORY, {category_name})
    }

    static async filtreCategories(checkCategory, page, limit) {
        return api.post(`${CATEGORY}/${checkCategory}`, {checkCategory}, {params: {page, limit}})
    }
}

export class OrderService {

    static async orders() {
        return api.get(PRODUCT_ORDERS)
    }

    static async ordersByVisualAnalis() {
        return api.get(PRODUCT_ORDERS_ANALYZE_VISUAL)
    }

    static async ordersByFilter(status) {
        return api.get(PRODUCT_ORDERS_FILTER, {params: {status}})
    }

    static async order(user_id, user_name, surname, phone, nameSity, nameDepartment, pay, cart, status, summa, month) {
        return api.post(PRODUCT_ORDERS, {
            user_id,
            user_name,
            surname,
            phone,
            nameSity,
            nameDepartment,
            pay,
            cart,
            status,
            summa,
            month
        })
    }

    static async analyze() {
        return api.get(PRODUCT_ORDER_ANALYZE)
    }

    static async getArchiveOrders() {
        return api.get(PRODUCT_ARCHIVE_ORDER)
    }

    static async archiveOrder(_id) {
        return api.post(PRODUCT_ARCHIVE_ORDER, {_id})
    }

    static async deleteArchiveOrder(_id) {
        return api.delete(PRODUCT_ARCHIVE_ORDER, {params: {_id}})
    }

    static async analyzeOrder(month, summa) {
        return api.post(PRODUCT_ORDER_ANALYZE, {month, summa})
    }

    static async updateAnalyzeOrder(month, summa) {
        return api.patch(PRODUCT_ORDER_ANALYZE, {month, summa})
    }

    static async updateStatus(_id, status) {
        return api.patch(PRODUCT_ORDERS, {_id, status})
    }

    static async userById(user_id) {
        return api.get(`${PRODUCTS}/${user_id}${ORDER_BY_USER}`, {params: {user_id}})
    }
}

export class ProductService {

    static async products(page, limit) {
        return api.get(PRODUCTS, {params: {page, limit}})
    }

    static async product(product) {
        return api.post(PRODUCTS, product)
    }

    static async deleteProduct(inventoryNumber) {
        return api.delete(PRODUCTS, {params: {inventoryNumber}})
    }
}

export class UserService {

    static async users() {
        return api.get(USERS)
    }

    static async editData(_id, name, surname, email, phone, oldPassword, number, numberToo, nameSity, nameDepartment) {
        return api.patch(USERS, {
            _id,
            name,
            surname,
            email,
            phone,
            oldPassword,
            number,
            numberToo,
            nameSity,
            nameDepartment
        })
    }

    static async editContactData(_id, name, surname, phone) {
        return api.patch(USERS_CONTACT, {_id, name, surname, phone})
    }

    static async editAdressData(_id, nameSity, nameDepartment) {
        return api.patch(USERS_ADRESS, {_id, nameSity, nameDepartment})
    }

    static async sentUser(text, email, topic) {
        return api.post(USERS_SEND, {text, email, topic})
    }
}

export class HomeService {

    static async createCalendarEvent(title, date, description, time) {
        return api.post(HOME, {title, date, description, time})
    }

    static async getCalendarEvent(startDateQuery, endDateQuery) {
        return api.get(HOME, {params: {startDateQuery, endDateQuery}})
    }

    static async getFindEvent(date) {
        return api.get(HOME_FIND, {params: {date}})
    }
}

export class ContactService {
    static async sentEmail(name, email, phone, text) {
        return api.post(CONTACT, {name, email, phone, text})
    }
}

export class FotoService {
    static async saveFoto(user_id, img) {
        return api.post(UPLOAD, {user_id, img})
    }
    static async fotoById(user_id) {
        return api.get('/upload_files', {params: {user_id}})
    }
}
