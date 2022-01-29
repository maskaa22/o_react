import axios from 'axios';
import {AxiosResponse} from 'axios';
import {URL} from "../../config";
import {setLoading, setUser, userlogout} from "../reducers/userReducer";
import {AuthService, UserService} from "./URL_Service";





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

             dispatch(userlogout())

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




// export const getUsers = async () => await axios.get(URL.USERS_URL);
// export const getUsers = async () => {
//
//         try {
//
//            const response = await axios.get(URL.USERS_URL,
//                 {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
// //console.log(response.data);
//            return response
//         } catch (e) {
//             alert(e.response.data.message)
//
//         }
//
// }

// export const registration = async (name, email, password) => {
//     try {
//         const response = await axios.post(URL.REGISTER_URL, {
//             name,
//             email,
//             password
//         })
//         alert(response.data.message)
//     } catch (e) {
//         alert(e.response.data.message)
//     }
// }

// export const login = (email, password) => {
//      return async dispatch => {
//          try {
//              const response = await axios.post(URL.LOGIN_URL, {
//                  email,
//                  password
//              })
//              dispatch(setUser(response.data.user))
//             // console.log(response.data);
//
//              localStorage.setItem('token', response.data.access_token)
//          } catch (e) {
//              alert(e.response.data.message)
//          }
//      }
//
// }

// export const auth = () => {
//     return async dispatch => {
//         try {
//
//             const response = await axios.get(URL.AUTH_URL,
//                 {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
//             dispatch(setUser(response.data.user))
//  //console.log(response.data.user);
//             const user = response.data.user;
//             localStorage.setItem('token', response.data.access_token)
//             // if (!user) {
//             //     throw new Error('NOOOOOOO', 409)
//             // }
//             return user
//         } catch (e) {
//             ///alert(e.response.data.message)
//             localStorage.removeItem('token')
//             throw new Error(e.response.data.message)
//         }
//     }
//
// }

// export const logout = () => {
//     return async dispatch => {
//         try {
//
//             await axios.get(URL.LOGOUT_URL,
//                 {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
//             dispatch(userlogout())
//
//             //localStorage.removeItem('token')
//         } catch (e) {
//             alert(e.response.data.message)
//            // localStorage.removeItem('token')
//         }
//     }
// }
