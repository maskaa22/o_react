import {DEL__All_PRODUCT, DEL_FILTER, DEL_PRODUCT, SET_CATEGORY, SET_FILTER, SET_PRODUCT,} from "./actionTypes";

const defaultState = {
    categoryFlag: false,
    currentProduct: [],
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
        case DEL_PRODUCT:
            return {
                ...state,
                currentProduct: state.currentProduct.filter(o => o._id !== action.payload),
            }
        case DEL__All_PRODUCT:
            return {
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
