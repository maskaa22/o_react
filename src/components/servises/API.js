import axios from 'axios';

import {APIServise} from "./index";
import {
    AuthService,
    CategoryService,
    ContactService,
    FotoService,
    HomeService,
    OrderService,
    ProductService,
    UserService
} from './URL_Service';
import {filterProduct, setProduct, setRole, setUser, userLogout} from "../reducers/actionCreators";
import {FIND_FOTO_URL} from "../../config/URL";
import {store} from "../reducers";
import {SwalFunction} from "../utils/function";
import {URL} from "../../config";
import {
    WORD_ACTIVETING,
    WORD_RESET,
    WORD_SWAL_CATEGORY_CREATED,
    WORD_SWAL_ERROR,
    WORD_SWAL_LATER_SEND,
    WORD_SWAL_OK,
    WORD_SWAL_ORDER_SEND,
    WORD_SWAL_PRODUCT_ADD,
    WORD_SWAL_READY,
    WORD_SWAL_SUCCESS,
    WORD_SWAL_TEXT_ERROR,
    WORD_SWAL_USER_CREATED,
    WORD_TOKEN
} from "../../config/wordsConstants";

export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await AuthService.login(email, password);

            localStorage.setItem(WORD_TOKEN, response.data.access_token);

            dispatch(setUser(response.data.user));
            dispatch(setRole(response.data.user.role));

            return response.data.user;
        } catch (e) {
            SwalFunction(WORD_SWAL_TEXT_ERROR, e.response.data.message, WORD_SWAL_ERROR, WORD_SWAL_OK, true);
        }
    }
};
export const auth = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${URL.REFRESH_URL}`,
                {withCredentials: true});

            localStorage.setItem(WORD_TOKEN, response.data.tokenPair.access_token);
            dispatch(setUser(response.data.user));
            dispatch(setRole(response.data.user.role));

            if (!response) {
                dispatch(APIServise.logout());
            }

            return response.data.user;
        } catch (e) {
            console.log(e);
        }
    }
};
export const getUserForToken = async () => {
    try {
        const response = await axios.get(`${FIND_FOTO_URL}`,
            {withCredentials: true});

        return response.data;
    } catch (e) {
        console.log(e);
    }
};
export const registration = async (name, email, password, role, passwordToo, foto) => {
    try {

        await AuthService.registration(name, email, password, role, passwordToo, foto);

        if (!role) {
            SwalFunction(WORD_SWAL_USER_CREATED, '', WORD_SWAL_SUCCESS, WORD_SWAL_OK, false, 3500);
        }
    } catch (e) {
        SwalFunction(WORD_SWAL_TEXT_ERROR, e.response.data.message, WORD_SWAL_ERROR, WORD_SWAL_OK, true);
    }
};
export const sendEmailForResetPassword = async (email) => {
    try {
        await AuthService.sendEmailForResetPassword(email);

        SwalFunction(WORD_SWAL_LATER_SEND, '', WORD_SWAL_SUCCESS, WORD_SWAL_OK, false, 3500);

    } catch (e) {
        SwalFunction(WORD_SWAL_TEXT_ERROR, e.response.data.message, WORD_SWAL_ERROR, WORD_SWAL_OK, true);
    }
};
export const activateEmail = async (token) => {
    try {
        await AuthService.activateEmail(token);

        SwalFunction(WORD_ACTIVETING, '', WORD_SWAL_SUCCESS, WORD_SWAL_OK, false, 3500);

    } catch (e) {
        SwalFunction(WORD_SWAL_TEXT_ERROR, e.response.data.message, WORD_SWAL_ERROR, WORD_SWAL_OK, true);
    }
};
export const resetPassword = async (password, passwordToo, id) => {
    try {
        await AuthService.resetPassword(password, passwordToo, id);

        SwalFunction(WORD_RESET, '', WORD_SWAL_SUCCESS, WORD_SWAL_OK, false, 1500);

    } catch (e) {
        SwalFunction(WORD_SWAL_TEXT_ERROR, e.response.data.message, WORD_SWAL_ERROR, WORD_SWAL_OK, true);
    }
};
export const deleteUser = async (email) => {
    try {
        await AuthService.deleteUser(email);

    } catch (e) {
        SwalFunction(WORD_SWAL_TEXT_ERROR, e.response.data.message, WORD_SWAL_ERROR, WORD_SWAL_OK, true);
    }
};
export const logout = () => {
    return async dispatch => {
        try {
            await AuthService.logout();

            dispatch(userLogout());

        } catch (e) {
            SwalFunction(WORD_SWAL_TEXT_ERROR, e.response.data.message, WORD_SWAL_ERROR, WORD_SWAL_OK, true);
        }
    }
};
export const getUsers = async () => {
    try {
        return await UserService.users();
    } catch (e) {
    }
};

export const getProducts = async (page, limit) => {
    try {
        const response = await ProductService.products(page, limit);

        setProduct(response.data);

        return response;
    } catch (e) {
        SwalFunction(WORD_SWAL_TEXT_ERROR, e.response.data.message, WORD_SWAL_ERROR, WORD_SWAL_OK, true);
    }
};
export const getCategories = async () => {
    try {
        return await CategoryService.allCategories();
    } catch (e) {
        SwalFunction(WORD_SWAL_TEXT_ERROR, e.response.data.message, WORD_SWAL_ERROR, WORD_SWAL_OK, true);
    }
};
export const createCategory = async (category_name) => {
    try {
        const response = await CategoryService.createCategories(category_name);

        SwalFunction(WORD_SWAL_CATEGORY_CREATED, '', WORD_SWAL_SUCCESS, WORD_SWAL_OK, false, 3500);

        return response.data;
    } catch (e) {
        SwalFunction(WORD_SWAL_TEXT_ERROR, e.response.data.message, WORD_SWAL_ERROR, WORD_SWAL_OK, true);
    }
};
export const sentUser = async (text, userEmail, topic) => {
    try {
        const response = await UserService.sentUser(text, userEmail, topic);

        return response.data;
    } catch (e) {
        SwalFunction(WORD_SWAL_TEXT_ERROR, e.response.data.message, WORD_SWAL_ERROR, WORD_SWAL_OK, true);
    }
};
export const setFoto = async (foto) => {
    try {
        const response = await UserService.foto(foto);

        return response.data;
    } catch (e) {
        SwalFunction(WORD_SWAL_TEXT_ERROR, e.response.data.message, WORD_SWAL_ERROR, WORD_SWAL_OK, true);
    }
};
export const setProducts = async (product) => {
    try {
        const response = await ProductService.product(product);

        SwalFunction(WORD_SWAL_PRODUCT_ADD, '', WORD_SWAL_SUCCESS, WORD_SWAL_OK, false, 3500);

        return response.data;
    } catch (e) {
        SwalFunction(WORD_SWAL_TEXT_ERROR, e.response.data.message, WORD_SWAL_ERROR, WORD_SWAL_OK, true);
    }
};
export const categoriesFilter = (checkCategory, page, limit) => {
    return async dispatch => {
        try {
            const response = await CategoryService.filtreCategories(checkCategory, page, limit);

            dispatch(filterProduct());

            return response;
        } catch (e) {
            SwalFunction(WORD_SWAL_TEXT_ERROR, e.response.data.message, WORD_SWAL_ERROR, WORD_SWAL_OK, true);
        }
    }
};
export const setOrder = async (user_id, user_name, surname, phone, nameSity, nameDepartment, pay, cart, status, summa, month) => {
    try {
        const response = await OrderService.order(user_id, user_name, surname, phone, nameSity, nameDepartment, pay, cart, status, summa, month);

        SwalFunction(WORD_SWAL_ORDER_SEND, '', WORD_SWAL_SUCCESS, WORD_SWAL_OK, false, 3500);

        return response;
    } catch (e) {
        SwalFunction(WORD_SWAL_TEXT_ERROR, e.response.data.message, WORD_SWAL_ERROR, WORD_SWAL_OK, true);
    }
};
export const getOrders = async () => {
    try {

        return await OrderService.orders();
    } catch (e) {
        SwalFunction(WORD_SWAL_TEXT_ERROR, e.response.data.message, WORD_SWAL_ERROR, WORD_SWAL_OK, true);
    }
};
export const getUsersAnalyze = async () => {
    try {

        return await UserService.usersAnalyze();
    } catch (e) {
        SwalFunction(WORD_SWAL_TEXT_ERROR, e.response.data.message, WORD_SWAL_ERROR, WORD_SWAL_OK, true);
    }
};
export const getOrdersByFilter = async (status) => {
    try {

        return await OrderService.ordersByFilter(status);
    } catch (e) {
        SwalFunction(WORD_SWAL_TEXT_ERROR, e.response.data.message, WORD_SWAL_ERROR, WORD_SWAL_OK, true);
    }
};
export const updateStatusOrder = async (id, status) => {
    try {
        const response = await OrderService.updateStatus(id, status);

        return response.data;
    } catch (e) {
        SwalFunction(WORD_SWAL_TEXT_ERROR, e.response.data.message, WORD_SWAL_ERROR, WORD_SWAL_OK, true);
    }
};
export const getOrdersById = async (id) => {
    try {

        return await OrderService.userById(id);
    } catch (e) {
        console.log(e.response.data.message);
    }
};
export const saveFoto = async (id, img) => {
    try {

        return await FotoService.saveFoto(id, img);
    } catch (e) {
        console.log(e.response.data.message);
    }
};
export const getFoto = async (id) => {
    try {

        return await FotoService.fotoById(id);
    } catch (e) {
        console.log(e.response.data.message);
    }
};
export const getAnalyze = async () => {
    try {
        return await OrderService.analyze();
    } catch (e) {
        SwalFunction(WORD_SWAL_TEXT_ERROR, e.response.data.message, WORD_SWAL_ERROR, WORD_SWAL_OK, true);
    }
};
export const dateAnalizy = async (month, summa) => {
    try {
        const response = await OrderService.analyzeOrder(month, summa);

        return response.data;
    } catch (e) {
        SwalFunction(WORD_SWAL_TEXT_ERROR, e.response.data.message, WORD_SWAL_ERROR, WORD_SWAL_OK, true);
    }
};
export const archiveOrder = async (id) => {
    try {
        const response = await OrderService.archiveOrder(id);

        SwalFunction(WORD_SWAL_READY, '', WORD_SWAL_SUCCESS, WORD_SWAL_OK, false, 3500);

        return response.data;
    } catch (e) {
        SwalFunction(WORD_SWAL_TEXT_ERROR, e.response.data.message, WORD_SWAL_ERROR, WORD_SWAL_OK, true);
    }
};
export const getArchiveOrders = async () => {
    try {

        return await OrderService.getArchiveOrders();
    } catch (e) {
        SwalFunction(WORD_SWAL_TEXT_ERROR, e.response.data.message, WORD_SWAL_ERROR, WORD_SWAL_OK, true);
    }
};
export const deleteOrder = async (id) => {
    try {
        const response = await OrderService.deleteArchiveOrder(id);

        return response.data;
    } catch (e) {
        SwalFunction(WORD_SWAL_TEXT_ERROR, e.response.data.message, WORD_SWAL_ERROR, WORD_SWAL_OK, true);
    }
};
export const deleteProduct = async (number) => {
    try {
        const response = await ProductService.deleteProduct(number);

        SwalFunction(WORD_SWAL_READY, '', WORD_SWAL_SUCCESS, WORD_SWAL_OK, false, 3500);

        return response.data;
    } catch (e) {
        SwalFunction(WORD_SWAL_TEXT_ERROR, e.response.data.message, WORD_SWAL_ERROR, WORD_SWAL_OK, true);
    }
};
export const editPage = async (id, name, surname, email, phone, oldPassword, number, numberToo, sity, numberNP) => {
    try {
        const response = await UserService.editData(id, name, surname, email, phone, oldPassword, number, numberToo, sity, numberNP);

        SwalFunction(WORD_SWAL_READY, '', WORD_SWAL_SUCCESS, WORD_SWAL_OK, false, 3500);

        return response.data;
    } catch (e) {
        SwalFunction(WORD_SWAL_TEXT_ERROR, e.response.data.message, WORD_SWAL_ERROR, WORD_SWAL_OK, true);
    }
};
export const editContactData = async (id, name, surname, phone) => {
    try {
        const response = await UserService.editContactData(id, name, surname, phone);

        store.dispatch(setUser(response.data));

        SwalFunction(WORD_SWAL_READY, '', WORD_SWAL_SUCCESS, WORD_SWAL_OK, false, 3500);

        return response.data;
    } catch (e) {
        SwalFunction(WORD_SWAL_TEXT_ERROR, e.response.data.message, WORD_SWAL_ERROR, WORD_SWAL_OK, true);
    }
};
export const editAdressData = async (id, sity, numberNP) => {
    try {
        const response = await UserService.editAdressData(id, sity, numberNP);

        store.dispatch(setUser(response.data));

        SwalFunction(WORD_SWAL_READY, '', WORD_SWAL_SUCCESS, WORD_SWAL_OK, false, 3500);

        return response.data;
    } catch (e) {
        SwalFunction(WORD_SWAL_TEXT_ERROR, e.response.data.message, WORD_SWAL_ERROR, WORD_SWAL_OK, true);
    }
};
export const createCalendarEvent = async (title, date, description, time, id) => {
    try {
        const response = await HomeService.createCalendarEvent(title, date, description, time, id);

        return response.data;
    } catch (e) {
        SwalFunction(WORD_SWAL_TEXT_ERROR, e.response.data.message, WORD_SWAL_ERROR, WORD_SWAL_OK, true);
    }
};
export const getCalendarEvent = async (startDateQuery, endDateQuery) => {
    try {
        const response = await HomeService.getCalendarEvent(startDateQuery, endDateQuery);

        return response.data;
    } catch (e) {
        SwalFunction(WORD_SWAL_TEXT_ERROR, e.response.data.message, WORD_SWAL_ERROR, WORD_SWAL_OK, true);
    }
};
export const getCalendarEventForId = async (id) => {
    try {
        const response = await HomeService.getCalendarEventForId(id);

        return response.data;
    } catch (e) {
        SwalFunction(WORD_SWAL_TEXT_ERROR, e.response.data.message, WORD_SWAL_ERROR, WORD_SWAL_OK, true);
    }
};
export const getFindEventInRow = async (date) => {
    try {
        const response = await HomeService.getFindEvent(date);

        return response.data;
    } catch (e) {
        SwalFunction(WORD_SWAL_TEXT_ERROR, e.response.data.message, WORD_SWAL_ERROR, WORD_SWAL_OK, true);
    }
};
export const sentEmail = async (name, email, phone, text) => {
    try {
        const response = await ContactService.sentEmail(name, email, phone, text);

        SwalFunction(WORD_SWAL_LATER_SEND, '', WORD_SWAL_SUCCESS, WORD_SWAL_OK, false, 3500);

        return response.data;
    } catch (e) {
        SwalFunction(WORD_SWAL_TEXT_ERROR, e.response.data.message, WORD_SWAL_ERROR, WORD_SWAL_OK, true);
    }
};
export const sentActiveEmail = async (id, name, email) => {
    try {
        //console.log(id, name, email);
        const response = await AuthService.sentActiveEmail(id, name, email);

        SwalFunction(WORD_SWAL_LATER_SEND, '', WORD_SWAL_SUCCESS, WORD_SWAL_OK, false, 3500);

        return response.data;
    } catch (e) {
        SwalFunction(WORD_SWAL_TEXT_ERROR, e.response.data.message, WORD_SWAL_ERROR, WORD_SWAL_OK, true);
    }
};
