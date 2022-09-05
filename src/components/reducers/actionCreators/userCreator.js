import {SET_USER, LOGOUT, SET_ROLE} from '../actionTypes'

export const setUser = (user) => ({type: SET_USER, payload: user})
export const setRole = (role) => ({type: SET_ROLE, payload: role})
export const userLogout = () => ({type: LOGOUT})
