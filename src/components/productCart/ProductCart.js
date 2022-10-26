import {MdOutlineShoppingCart} from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";

import './ProductCart.css'
import {setProduct} from "../reducers/actionCreators";
import {SwalFunction} from "../utils/function";

export function ProductCart({product}) {

    const dispatch = useDispatch();

    const currentProduct = useSelector(state => state.product.currentProduct);
    const isAuth = useSelector(state => state.user.isAuth);

    return (
        <div className="column">
            <div className={'card'}>
                <div><img src={'https://u.makeup.com.ua/g/gl/gla8v5cgd3qy.png'} alt={'шaмпунь'}/></div>
                <div className={'info_card'}><span>{product.product_name}</span></div>
                <div className={'info_card'}>{product.title}</div>
                <div className={'flex_buy'}>
                    <div className={'info_card'}>{product.price} грн.</div>
                    <div className={'buy'}>
                        <button id={'buy'} onClick={() => {
                            if (isAuth) {
                                let isInArray = false;
                                currentProduct.forEach(el => {
                                    if (el._id === product._id)
                                        isInArray = true;
                                })
                                if (!isInArray) {
                                    dispatch(setProduct(product));
                                    //dispatch(priceProduct(product.totalPrice));
                                }
                            } else SwalFunction('Не авторизований', '', 'error', 'Ok', true)


                        }}>
                            <MdOutlineShoppingCart className=" icon_basket color_purple"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
