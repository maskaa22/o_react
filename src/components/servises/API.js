import axios from 'axios';
import {URL} from "../../config";

export const getUsers = async () => await axios.get(URL.USERS_URL);

export const registration = async (name, email, password) => {
    try {
        const response = await axios.post(URL.REGISTER_URL, {
            name,
            email,
            password
        })
        alert(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const login = (email, password) => {
    return async dispatch
    try {
        const response = await axios.post(URL.LOGIN_URL, {
            email,
            password
        })

    } catch (e) {
        alert(e.response.data.message)
    }
}
