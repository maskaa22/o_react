import {DEL__All_PRODUCT, DEL_FILTER, DEL_PRODUCT, SET_CATEGORY, SET_FILTER, SET_PRODUCT,} from '../actionTypes';

export const delAllProduct = () => ({type: DEL__All_PRODUCT});
export const delFilter = () => ({type: DEL_FILTER});
export const delProduct = (id) => ({type: DEL_PRODUCT, payload: id});
export const filterProduct = () => ({type: SET_FILTER});
export const setCategory = () => ({type: SET_CATEGORY});
export const setProduct = (product) => ({type: SET_PRODUCT, payload: product});
