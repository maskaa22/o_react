import {LOGOUT, SET_ROLE, SET_USER} from '../actionTypes'

export const setRole = (role) => ({type: SET_ROLE, payload: role});
export const setUser = (user) => ({type: SET_USER, payload: user});
export const userLogout = () => ({type: LOGOUT});
