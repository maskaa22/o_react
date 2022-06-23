import { delPrice, delProduct } from "../reducers/actionCreators";
import { useDispatch } from "react-redux";

import '../productCart/ProductCart.css'

export function BasketCart ({product, price})
{
    const dispatch = useDispatch();

    return(
        <div className="column">
            <div className={'card'}>
                <div><img src={'https://irecommend.ru/sites/default/files/product-images/1360075/VdCSfnclhGUQPbxf38uNw.jpg'} alt={'шaмпунь'}/></div>
                <div className={'info_card'}><span>{product.product_name}</span></div>
                <div className={'info_card'}>{product.title}</div>
                <div className={'flex_buy'}>
                    <div className={'info_card'}>{product.price} грн.</div>
                    <div className={'buy'}><button onClick={() => {
                        dispatch(delProduct(product._id));
                        dispatch(delPrice(price));
                    }}><img className=" icon_basket" src={require('../../icons/icon-recycle.png')}/>
                    </button></div>
                </div>
            </div>
        </div>
    );
}
