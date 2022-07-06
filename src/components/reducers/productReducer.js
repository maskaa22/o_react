import {DEL_PRICE, DEL_PRODUCT, PRICE_PRODUCT, SET_PRODUCT, DEL_FILTER, SET_FILTER, SET_CATEGORY,
    //DEL_CATEGORY, PAGE, SET_PAGE
} from "./actionTypes";

const defaultState = {
    currentProduct: [],
    price:[],
    filter: [],
    filterFlag: false,
    categoryFlag: false,
    page:1
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
                //currentProduct: action.payload
                currentProduct: state.currentProduct.filter(o => o._id !== action.payload._id),
                //price: state.price.filter(o => o._id !== action.payload)
            }
        case DEL_PRICE:
            return {
                ...state,
                price: state.price.filter((o, i) => i !== action.payload)
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
        // case DEL_CATEGORY:
        //     return {
        //         ...state,
        //         categoryFlag: false
        //     }
        // case PAGE:
        //     return {
        //         page: 1
        //     }
        // case SET_PAGE:
        //     return {
        //         page: action.payload
        //     }
        default:
            return state
    }
}
