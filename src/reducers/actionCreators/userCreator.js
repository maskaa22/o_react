import {LOGOUT, SET_AUTH, SET_ROLE, SET_USER} from '../actionTypes';

export const setRole = (role) => ({type: SET_ROLE, payload: role});
export const setUser = (user) => ({type: SET_USER, payload: user});
export const setAuth = () => ({type: SET_AUTH});
export const userLogout = () => ({type: LOGOUT});

