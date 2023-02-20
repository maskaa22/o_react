import {MdOutlineShoppingCart} from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";

import './ProductCart.css';
import './ProductCart@media.css';
import {setProduct} from "../reducers/actionCreators";
import {SwalFunction} from "../utils/function";
import {
    WORD_SWAL_ERROR,
    WORD_SWAL_NOT_AUTORIZE,
    WORD_SWAL_OK,
    WORD_SWAL_PRODUCT_ADD,
    WORD_SWAL_SUCCESS
} from "../../config/wordsConstants";
import {AUTH_URL} from "../../config/URL";

export function ProductCart({product}) {

    const dispatch = useDispatch();

    const currentProduct = useSelector(state => state.product.currentProduct);
    const isAuth = useSelector(state => state.user.isAuth);

    return (
        <div className="column">
            <div className={'card'}>
                <div className={'top-card'}>
                    <img src={AUTH_URL + '/' + product.img} alt={'шaмпунь'}/>
                </div>
                <div className={'bottom-card'}>
                    <div className={'info_card'}><span>{product.product_name}</span></div>
                    <div className={'info_card card-small-size'}>{product.title}</div>
                    <div className={'flex_buy'}>
                        <div className={'info_card color_purple'}>{product.price} грн.</div>
                        <div className={'buy'}>
                            <MdOutlineShoppingCart className=" " onClick={() => {
                                if (isAuth) {
                                    let isInArray = false;
                                    currentProduct.forEach(el => {
                                        if (el._id === product._id)
                                            isInArray = true;
                                    });
                                    if (!isInArray) {
                                        dispatch(setProduct(product));
                                        SwalFunction(WORD_SWAL_PRODUCT_ADD, '', WORD_SWAL_SUCCESS, WORD_SWAL_OK, false, 1000);
                                    }
                                } else SwalFunction(WORD_SWAL_NOT_AUTORIZE, '', WORD_SWAL_ERROR, WORD_SWAL_OK, true);
                            }}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
