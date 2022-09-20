import {DEL_PRODUCT, SET_FILTER, PRICE_PRODUCT, SET_PRODUCT, DEL_FILTER, SET_CATEGORY,
    //DEL_CATEGORY, PAGE, SET_PAGE
} from '../actionTypes'

export const setProduct = (product) => ({type: SET_PRODUCT, payload: product})
// export const setNewProduct = (product, newCount, newPrice) => ({type: 'SET_NEW_PRODUCT', payload: product,
//     newCount: newCount, newPrice:newPrice})
export const priceProduct = (price) => ({type: PRICE_PRODUCT, payload: price})
// export const delPrice = (index) => ({type: 'DEL_PRICE', payload: index})
export const delPrice = (index, k) => ({type: 'DEL_PRICE', payload: {index, k}})
export const delProduct = (id) => ({type: DEL_PRODUCT, payload: id})
export const filterProduct = () => ({type: SET_FILTER})
export const delFilter = () => ({type: DEL_FILTER})
export const setCategory = () => ({type: SET_CATEGORY})
// export const delCategory = () => ({type: DEL_CATEGORY})
// export const devicePage = () => ({type: PAGE})
// export const setDivecePage = (page) => ({type: SET_PAGE, payload:page})
