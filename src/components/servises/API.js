import axios from 'axios';

import {AxiosResponse} from 'axios';
import {URL} from "../../config";
import {setUser, userLogout, setProduct, filterProduct} from "../reducers/actionCreators";
import {AuthService, ProductService, UserService, CategoryService} from "./URL_Service";


const Swal = require('sweetalert2')

export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await AuthService.login(email, password)
            localStorage.setItem('token', response.data.access_token)
            dispatch(setUser(response.data.user))

        } catch (e) {
            alert(e)
        }
    }
}
export const auth = () => {
    return async dispatch => {

        try {
            //const response = await AuthService.auth()
            const response = await axios.get(`${URL.AUTH_URL}/auth/refresh`,
                {withCredentials: true})
            //console.log(response);
            localStorage.setItem('token', response.data.tokenPair.access_token)
            dispatch(setUser(response.data.user))

            const user = response.data.user;
            //console.log(user);


            return user
        } catch (e) {
            //localStorage.removeItem('token')
            throw new Error(e.response.data.message)
        }


    }
}
export const registration = async (name, email, password) => {
    try {
        const response = await AuthService.registration(name, email, password)

        alert(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }
}
export const logout = () => {
    return async dispatch => {
        try {
            await AuthService.logout()

             dispatch(userLogout())

        } catch (e) {
            alert(e.response.data.message)
        }
    }
}
export const getUsers = async () => {

    try {
        const response = await UserService.users()

        return response
    } catch (e) {
        console.log(e.response.data.message);
    }
}

export const getProducts = async () => {
    try {
        const response = await ProductService.products()

        setProduct(response.data)

        return response
    } catch (e) {
        console.log(e.response.data.message);
    }
}
export const getCategories = async () => {

    try {
        const response = await CategoryService.allCategories()
        //console.log(response);

        return response
    } catch (e) {
        console.log(e.response.data.message);
    }
}
export const createCategory = async (category_name) => {
    try {

        const response = await CategoryService.createCategories(category_name)
        // alert('Товар добавлен')
        Swal.fire({
            icon: 'success',
            title: 'Категория создана',
            showConfirmButton: false,
            timer: 3500
        })
        return response.data

    } catch (e) {
        Swal.fire({
            title: 'Ошибка!',
            text: e.response.data.message,
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#500472FF'
        })
    }
}
export const setProducts = async (name, tittle, price, category) => {
    try {

        const response = await ProductService.product(name, tittle, price,  category)
        // alert('Товар добавлен')
        Swal.fire({
            icon: 'success',
            title: 'Товар добавлен',
            showConfirmButton: false,
            timer: 3500
        })
        return response.data

    } catch (e) {
        Swal.fire({
            title: 'Ошибка!',
            text: e.response.data.message,
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#500472FF'
        })
    }
}
export const categoriesFilter =  (checkCategory) => {
return async dispatch => {
    try {
        const response = await CategoryService.filtreCategories(checkCategory)

        dispatch(filterProduct(response.data))

        return response
    } catch (e) {
        alert(e)
    }
}
}

