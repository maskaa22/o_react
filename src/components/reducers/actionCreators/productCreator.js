import {DEL_PRODUCT, DEL_PRICE, FILTER_PRODUCT, PRICE_PRODUCT, SET_PRODUCT, DEL_FILTER} from '../actionTypes'

export const setProduct = (product) => ({type: SET_PRODUCT, payload: product})
export const priceProduct = (price) => ({type: PRICE_PRODUCT, payload: price})
export const delProduct = (id) => ({type: DEL_PRODUCT, payload: id})
export const delPraice = (id) => ({type: DEL_PRICE, payload: id})
export const filterProduct = (products) => ({type: FILTER_PRODUCT, payload: products})
export const delFilter = () => ({type: DEL_FILTER})
