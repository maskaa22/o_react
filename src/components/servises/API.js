import axios from 'axios';

import {URL} from "../../config";
import {CategoryService, UserService, ProductService, AuthService, OrderService} from './URL_Service'
import {filterProduct, setProduct, setUser, setRole, userLogout} from "../reducers/actionCreators";

const Swal = require('sweetalert2');


export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await AuthService.login(email, password);

//console.log(response.data.user.role);
            localStorage.setItem('token', response.data.access_token);
            dispatch(setUser(response.data.user));
            dispatch(setRole(response.data.user.role));

            return response.data.user
        } catch (e) {
            Swal.fire({
                title: 'Ошибка!',
                text: e.response.data.message,
                icon: 'error',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#500472FF'
            });
        }
    }
};
export const auth = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${URL.AUTH_URL}/auth/refresh`,
                {withCredentials: true});

            localStorage.setItem('token', response.data.tokenPair.access_token);
            dispatch(setUser(response.data.user));
            dispatch(setRole(response.data.user.role));

            return response.data.user;
        } catch (e) {
            throw new Error(e.response.data.message)
        }
    }
};
export const registration = async (name, email, password) => {
    try {
        const response =
            await AuthService.registration(name, email, password);

        // localStorage.setItem('registration', "true");

        Swal.fire({
            icon: 'success',
            title: 'Пользователь создан',
            showConfirmButton: false,
            timer: 3500
        });
    } catch (e) {
        // localStorage.setItem('registration', "");
        Swal.fire({
            title: 'Ошибка!',
            text: e.response.data.message,
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#500472FF'
        });
    }
};
export const logout = () => {
    return async dispatch => {
        try {
            await AuthService.logout();

             dispatch(userLogout());

        } catch (e) {
            alert(e.response.data.message)
        }
    }
};
export const getUsers = async () => {
    try {
        return await UserService.users();
    } catch (e) {
        console.log(e.response.data.message);
    }
};

export const getProducts = async (page, limit) => {
    try {
        const response = await ProductService.products(page, limit);

        setProduct(response.data);

        return response
    } catch (e) {
        console.log(e.response.data.message);
    }
};
export const getCategories = async () => {
    try {
        return await CategoryService.allCategories();
    } catch (e) {
        console.log(e.response.data.message);
    }
};
export const createCategory = async (category_name) => {
    try {
        const response = await CategoryService.createCategories(category_name);

        Swal.fire({
            icon: 'success',
            title: 'Категория создана',
            showConfirmButton: false,
            timer: 3500
        });

        return response.data;
    } catch (e) {
        Swal.fire({
            title: 'Ошибка!',
            text: e.response.data.message,
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#500472FF'
        });
    }
};
export const setProducts = async (name, tittle, price, category, totalPriceProduct, countProduct, inventoryNumber) => {
    try {
        // console.log(totalPriceProduct);
        const response = await ProductService.product(name, tittle, price,  category, countProduct, totalPriceProduct, inventoryNumber);

        Swal.fire({
            icon: 'success',
            title: 'Товар добавлен',
            showConfirmButton: false,
            timer: 3500
        });

        return response.data;
    } catch (e) {
        Swal.fire({
            title: 'Ошибка!',
            text: e.response.data.message,
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#500472FF'
        });
    }
};
export const categoriesFilter =  (checkCategory, page, limit) => {
return async dispatch => {
    try {

        const response = await CategoryService.filtreCategories(checkCategory, page, limit);

         dispatch(filterProduct());

        return response;
    } catch (e) {
        alert(e)
    }
}
};
export const setOrder = async (user_id, user_name, cart, status, summa, month) => {
    try {

        const response = await OrderService.order(user_id, user_name, cart, status, summa, month);

        Swal.fire({
            icon: 'success',
            title: 'Заказ отправлен',
            showConfirmButton: false,
            timer: 3500
        });

        return response.data;
    } catch (e) {
        Swal.fire({
            title: 'Ошибка!',
            text: e.response.data.message,
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#500472FF'
        });
    }
};
export const getOrders = async () => {
    try {
        return await OrderService.orders();
    } catch (e) {
        console.log(e.response.data.message);
    }
};
export const getOrdersByFilter = async (status) => {
    try {
        return await OrderService.ordersByFilter(status);
    } catch (e) {
        console.log(e.response.data.message);
    }
};
export const updateStatusOrder = async (id, status) => {
    try {

        const response = await OrderService.updateStatus(id, status);

        Swal.fire({
            icon: 'success',
            title: 'Статус изменён',
            showConfirmButton: false,
            timer: 3500
        });

        return response.data;
    } catch (e) {
        Swal.fire({
            title: 'Ошибка!',
            text: e.response.data.message,
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#500472FF'
        });
    }
};
export const getOrdersById = async (id) => {
    try {
        return await OrderService.userById(id);
    } catch (e) {
        console.log(e.response.data.message);
    }
};
export const getAnalyze = async () => {
    try {
        return await OrderService.analyze();
    } catch (e) {
        console.log(e.response.data.message);
    }
};
export const dateAnalizy = async (month, summa) => {
    try {

        const response = await OrderService.analyzeOrder(month, summa);

        Swal.fire({
            icon: 'success',
            title: 'Статус изменён',
            showConfirmButton: false,
            timer: 3500
        });

        return response.data;
    } catch (e) {
        Swal.fire({
            title: 'Ошибка!',
            text: e.response.data.message,
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#500472FF'
        });
    }
};
export const updateDateAnalizy = async (month, summa) => {
    try {

        const response = await OrderService.updateAnalyzeOrder(month, summa);

        Swal.fire({
            icon: 'success',
            title: 'Статус изменён',
            showConfirmButton: false,
            timer: 3500
        });

        return response.data;
    } catch (e) {
        Swal.fire({
            title: 'Ошибка!',
            text: e.response.data.message,
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#500472FF'
        });
    }
};
export const archiveOrder = async (id) => {
    try {

        const response = await OrderService.archiveOrder(id);

        Swal.fire({
            icon: 'success',
            title: 'Готово',
            showConfirmButton: false,
            timer: 3500
        });

        return response.data;
    } catch (e) {
        Swal.fire({
            title: 'Ошибка!',
            text: e.response.data.message,
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#500472FF'
        });
    }
};
export const getArchiveOrders = async () => {
    try {
        return await OrderService.getArchiveOrders();
    } catch (e) {
        console.log(e.response.data.message);
    }
};
export const deleteOrder = async (id) => {
    try {

        const response = await OrderService.deleteArchiveOrder(id);

        Swal.fire({
            icon: 'success',
            title: 'Готово',
            showConfirmButton: false,
            timer: 3500
        });

        return response.data;
    } catch (e) {
        Swal.fire({
            title: 'Ошибка!',
            text: e.response.data.message,
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#500472FF'
        });
    }
};
export const deleteProduct = async (number) => {
    try {

        const response = await ProductService.deleteProduct(number);

        Swal.fire({
            icon: 'success',
            title: 'Готово',
            showConfirmButton: false,
            timer: 3500
        });

        return response.data;
    } catch (e) {
        Swal.fire({
            title: 'Ошибка!',
            text: e.response.data.message,
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#500472FF'
        });
    }
};
export const editPage = async (id, name, surname, email, phone, oldPassword, number, numberToo, sity, numberNP) => {
    try {

        const response = await UserService.editData(id, name, surname, email, phone, oldPassword, number, numberToo, sity, numberNP);

        Swal.fire({
            icon: 'success',
            title: 'Готово',
            showConfirmButton: false,
            timer: 3500
        });

        return response.data;
    } catch (e) {
        Swal.fire({
            title: 'Ошибка!',
            text: e.response.data.message,
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#500472FF'
        });
    }
};
