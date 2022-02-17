import {DEL_PRICE, DEL_PRODUCT, FILTER_PRODUCT, PRICE_PRODUCT, SET_PRODUCT, DEL_FILTER} from "./actionTypes";

const defaultState = {
    currentProduct: [],
    price:[],
    filter: [],
    filterFlag: false
}

export default function productReducer (state = defaultState, action)
{
    switch (action.type) {
        case SET_PRODUCT:

            return {
                ...state,
                currentProduct: [...state.currentProduct, action.payload]
            }
        case PRICE_PRODUCT:
            return {
                ...state,
                price: [...state.price, action.payload]
            }
        case DEL_PRODUCT:
            return {
                ...state,
                currentProduct: state.currentProduct.filter(o => o._id !== action.payload),
                //price: state.price.filter(o => o._id !== action.payload)
            }
        case DEL_PRICE:
            return {
                ...state,
                price: state.price.filter((o, i) => i !== action.payload)
            }
        case FILTER_PRODUCT:
            return {
                ...state,
                filter: action.payload,
                filterFlag: true
            }
        case DEL_FILTER:
            return {
                ...state,
                filter: [],
                filterFlag: false
            }
        default:
            return state
    }
}
