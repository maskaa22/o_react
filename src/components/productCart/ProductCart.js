import {useDispatch} from "react-redux";

import './ProductCart.css'
import {setProduct, priceProduct} from "../reducers/actionCreators";

export function ProductCart({product}) {

    const dispatch = useDispatch();

    return (
        <div className="column">
            <div className={'card'}>
                <div><img src={'https://irecommend.ru/sites/default/files/product-images/1360075/VdCSfnclhGUQPbxf38uNw.jpg'} alt={'шaмпунь'}/></div>
                <div className={'info_card'}><span>{product.product_name}</span></div>
                <div className={'info_card'}>{product.title}</div>
                <div className={'flex_buy'}>
                    <div className={'info_card'}>{product.price} грн.</div>
                    <div className={'buy'}><button onClick={() => {
                        dispatch(setProduct(product));
                        dispatch(priceProduct(product.price));
                    }}><i className="fa fa-cart-plus icon_basket" aria-hidden="true"/>
                    </button></div>
                </div>
            </div>
        </div>
    );
}
