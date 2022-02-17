import {SET_USER, LOGOUT} from '../actionTypes'

export const setUser = (user) => ({type: SET_USER, payload: user})
export const userLogout = () => ({type: LOGOUT})
