import {LOGOUT, SET_ROLE, SET_USER} from './actionTypes'
import {WORD_TOKEN} from "../../config/wordsConstants";

const defaultState = {
    currentUser: {},
    isAuth: false,
    role: '',
    isLoading: false,
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true
            }
        case SET_ROLE:
            return {
                ...state,
                role: action.payload,
            }
        case LOGOUT:
            localStorage.removeItem(WORD_TOKEN)
            return {
                ...state,
                currentUser: {},
                isAuth: false
            }

        default:
            return state
    }
}
