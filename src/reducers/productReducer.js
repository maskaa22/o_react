import {
    DEL__All_PRODUCT,
    DEL_FILTER,
    DEL_PRODUCT,
    LOGOUT,
    SET_BASKET,
    SET_CATEGORY,
    SET_FILTER,
    SET_PRODUCT,
} from "./actionTypes";
import {loadBasket} from "../utils/basketStorage/basketStorage";

const defaultState = {
    categoryFlag: false,
    // кошик відновлюється з localStorage, щоб не зникати при оновленні сторінки
    currentProduct: loadBasket(),
    filter: [],
    filterFlag: false,
    page: 1,
};

export default function productReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_PRODUCT:
            return {
                ...state,
                currentProduct: [...state.currentProduct, action.payload]
            }
        case SET_BASKET:
            // повна заміна вмісту кошика (напр., після зміни кількості на сторінці кошика)
            return {
                ...state,
                currentProduct: action.payload
            }
        case DEL_PRODUCT:
            return {
                ...state,
                currentProduct: state.currentProduct.filter(o => o._id !== action.payload),
            }
        case DEL__All_PRODUCT:
            return {
                ...state,
                currentProduct: [],
            }
        case LOGOUT:
            // вихід з акаунта: кошик не повинен дістатись наступному користувачу в цьому браузері
            return {
                ...state,
                currentProduct: [],
            }
        case SET_FILTER:
            return {
                ...state,
                filterFlag: true
            }
        case DEL_FILTER:
            return {
                ...state,
                filter: [],
                filterFlag: false
            }
        case SET_CATEGORY:
            return {
                ...state,
                categoryFlag: true
            }
        default:
            return state
    }
}
