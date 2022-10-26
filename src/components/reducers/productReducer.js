import {
    DEL_FILTER,
    DEL_PRODUCT,
    DEL__All_PRODUCT,
    SET_CATEGORY,
    SET_FILTER,
    SET_PRODUCT,

    PRICE_PRODUCT
} from "./actionTypes";

const defaultState = {
    currentProduct: [],
    filter: [],
    filterFlag: false,
    categoryFlag: false,
    page: 1,
    // price: []
}

export default function productReducer(state = defaultState, action) {
    //console.log(state);
    switch (action.type) {
        case SET_PRODUCT:

            return {
                ...state,
                currentProduct: [...state.currentProduct, action.payload]
            }

        // case PRICE_PRODUCT:
        //     return {
        //         ...state,
        //         price: [...state.price, action.payload]
        //     }

        // case 'DEL_PRICE':
        //     return {
        //         ...state,
        //         price: state.price.filter((o, i) => i !== action.payload)
        //     }
        // case 'DEL_PRICE':
        //     return {
        //         ...state,
        //         price: state.price.filter((o, i) => {
        //             if(i === action.payload.index) {
        //
        //                action.payload.k;
        //
        //
        //                 //state.price[i] = action.payload.k;
        //
        //             }
        //         })
        //     }
        // case 'UPDATE_PRICE':
        //     return {
        //         ...state,
        //         price: state.price.filter((o, i) => i !== action.payload)
        //     }
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
