import {SET_USER, LOGOUT} from './actionTypes'

const defaultState = {
    currentUser: {},
    isAuth: false,
    isLoading: false
}

export default function userReducer (state = defaultState, action)
{
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true
            }
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                currentUser: {},
                isAuth: false
            }

        default:
            return state
    }
}
