import {MdOutlineShoppingCart} from "react-icons/md";
import React from "react";
import {useDispatch, useSelector} from "react-redux";

// Старі стилі лишаються підключеними: з них (напр. глобальне правило для img) беруть інші сторінки
import './ProductCart.css';
import './ProductCart@media.css';
import './ProductCardModern.css';
import {AUTH_URL} from "../../config/URL";
import {setProduct} from "../../reducers/actionCreators";
import {SwalFunction} from "../../utils/function";
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

    const addToBasket = () => {
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
    };

    return (
        <article className={'pc'}>
            <div className={'pc__img'}>
                <img src={AUTH_URL + '/' + product.img} alt={product.product_name} loading={'lazy'}/>
            </div>
            <div className={'pc__body'}>
                <h3 className={'pc__name'}>{product.product_name}, {product.dosage}мл</h3>
                <p className={'pc__desc'}>{product.title}</p>
            </div>
            <div className={'pc__foot'}>
                <span className={'pc__price'}>{product.price} грн.</span>
                {(role === WORLD_USER || !isAuth) &&
                    <button type={'button'} className={'pc__buy'} onClick={addToBasket}>
                        <MdOutlineShoppingCart aria-hidden={'true'}/> У кошик
                    </button>
                }
            </div>
        </article>
    );
}
