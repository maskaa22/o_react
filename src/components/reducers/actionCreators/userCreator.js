import {LOGOUT, SET_ROLE, SET_USER, SET_AUTH} from '../actionTypes'

export const setRole = (role) => ({type: SET_ROLE, payload: role});
export const setUser = (user) => ({type: SET_USER, payload: user});
export const userLogout = () => ({type: LOGOUT});
export const setAuth = () => ({type: SET_AUTH});

