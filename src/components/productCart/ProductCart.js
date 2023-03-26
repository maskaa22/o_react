import {MdOutlineShoppingCart} from "react-icons/md";
import React from "react";
import {useDispatch, useSelector} from "react-redux";

import './ProductCart.css';
import './ProductCart@media.css';
import {AUTH_URL} from "../../config/URL";
import {setProduct} from "../reducers/actionCreators";
import {SwalFunction} from "../utils/function";
import {
    WORD_SWAL_ERROR,
    WORD_SWAL_NOT_AUTORIZE,
    WORD_SWAL_OK,
    WORD_SWAL_PRODUCT_ADD,
    WORD_SWAL_SUCCESS,
    WORLD_USER
} from "../../config/wordsConstants";

export function ProductCart({product}) {

    const dispatch = useDispatch();

    const currentProduct = useSelector(state => state.product.currentProduct);
    const isAuth = useSelector(state => state.user.isAuth);
    const role = useSelector(state => state.user.role);

    return (
        <div className={'courseCard'}>
            <div className={'courseImage'}>
                <img src={AUTH_URL + '/' + product.img} alt={'cosmetics'} height={'100%'} width={'100%'}/>
            </div>
            <div className={'courseDetails'}>
                <div className={'heading'}>{product.product_name}, {product.dosage}мл</div>
                <div className={'desc'}>{product.title}</div>
            </div>
            <div className={'courseSellPoint'}>
                <div className={'price'}>{product.price} грн.</div>
                {(role === WORLD_USER || !isAuth) && <div className={'buy'}>
                    <MdOutlineShoppingCart className="buy-button" onClick={() => {
                        if (isAuth && role === WORLD_USER) {
                            let isInArray = false;
                            currentProduct.forEach(el => {
                                if (el._id === product._id)
                                    isInArray = true;
                            });
                            if (!isInArray || role === WORLD_USER) {
                                dispatch(setProduct(product));
                                SwalFunction(WORD_SWAL_PRODUCT_ADD, '', WORD_SWAL_SUCCESS, WORD_SWAL_OK, false, 1000);
                            }
                        } else SwalFunction(WORD_SWAL_NOT_AUTORIZE, '', WORD_SWAL_ERROR, WORD_SWAL_OK, true);
                    }}/>
                </div>
                }
            </div>
        </div>
    );
}
