import axios from 'axios';
import {URL} from "../../config";
import {setUser, userlogout} from "../reducers/userReducer";

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
     return async dispatch => {
         try {
             const response = await axios.post(URL.LOGIN_URL, {
                 email,
                 password
             })
             dispatch(setUser(response.data.user))
            // console.log(response.data);

             localStorage.setItem('token', response.data.access_token)
         } catch (e) {
             alert(e.response.data.message)
         }
     }

}

export const auth = () => {
    return async dispatch => {
        try {

            const response = await axios.get(URL.AUTH_URL,
                {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
            dispatch(setUser(response.data.user))
console.log(response.data);
            localStorage.setItem('token', response.data.access_token)
        } catch (e) {
            alert(e.response.data.message)
            localStorage.removeItem('token')
        }
    }

}

export const logout = () => {
    return async dispatch => {
        try {

            await axios.get(URL.LOGOUT_URL,
                {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
            dispatch(userlogout())

            //localStorage.removeItem('token')
        } catch (e) {
            alert(e.response.data.message)
           // localStorage.removeItem('token')
        }
    }

}
