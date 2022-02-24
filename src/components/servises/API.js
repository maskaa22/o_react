import axios from 'axios';

import {URL} from "../../config";
import {CategoryService, UserService, ProductService, AuthService} from './URL_Service'
import {filterProduct, setProduct, setUser, userLogout} from "../reducers/actionCreators";

const Swal = require('sweetalert2');


export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await AuthService.login(email, password);


            localStorage.setItem('token', response.data.access_token);
            dispatch(setUser(response.data.user));

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
export const setProducts = async (name, tittle, price, category) => {
    try {
        const response = await ProductService.product(name, tittle, price,  category);

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
}

