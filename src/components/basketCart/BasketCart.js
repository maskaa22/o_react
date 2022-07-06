import { delPrice, delProduct } from "../reducers/actionCreators";
import { useDispatch } from "react-redux";

import '../productCart/ProductCart.css'
import {useState} from "react";
import {Input} from "../utils";

export function BasketCart ({product, price})
{
    const dispatch = useDispatch();

    const [count, setCount] = useState('');
    //console.log(count);
    //console.log(product);
    return(
        <div className="column">
            <div className={'card'}>
                <div><img src={'https://u.makeup.com.ua/g/gl/gla8v5cgd3qy.png'} alt={'шaмпунь'}/></div>
                <div className={'info_card'}><span>{product.product_name}</span></div>
                <div className={'flex_buy'}>
                    <div className={'info_card'}>{product.title}</div>
                    <div><input value={count}   type={'number'} placeholder={''} className={'input-count'}
                           onChange={(event) => setCount(event.target.value)}/> шт.</div>
                </div>
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
