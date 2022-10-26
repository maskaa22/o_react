import {
    DEL_PRODUCT,
    DEL_FILTER,
    DEL__All_PRODUCT,
    SET_CATEGORY,
    SET_FILTER,
    SET_PRODUCT,

    // PRICE_PRODUCT
} from '../actionTypes'

export const delProduct = (id) => ({type: DEL_PRODUCT, payload: id})
export const delFilter = () => ({type: DEL_FILTER})
export const delAllProduct = () => ({type: DEL__All_PRODUCT})
export const setCategory = () => ({type: SET_CATEGORY})
export const filterProduct = () => ({type: SET_FILTER})
export const setProduct = (product) => ({type: SET_PRODUCT, payload: product})

// export const priceProduct = (price) => ({type: PRICE_PRODUCT, payload: price})
//
// export const delPrice = (index, k) => ({type: 'DEL_PRICE', payload: {index, k}})

