import {delProduct} from "../reducers/actionCreators";
import {useDispatch} from "react-redux";
import {MdDeleteForever} from "react-icons/md"

import '../productCart/ProductCart.css'
import {Count} from "../countProduct";
import priceFormatter from "../utils/priceFormatter/priceFormatter";
import {useState} from "react";


export function BasketCart({product, increase, decrease, deleteProduct, changeValue}) {

    const dispatch = useDispatch();
    //console.log(product.count);



    return (
        <div className="column">
            <div className={'card'}>
                <div><img src={'https://u.makeup.com.ua/g/gl/gla8v5cgd3qy.png'} alt={'шaмпунь'}/></div>
                <div className={'info_card'}><span>{product.product_name}</span></div>
                <div className={'flex_buy'}>
                    <div className={'info'}>
                        <div className={'info_card'}>{product.title}</div>
                    </div>

                    <Count count={product.count} increase={increase} id={product._id} decrease={decrease} changeValue={changeValue}/>

                </div>
                <div className={'flex_buy'}>
                    <div className={'info_card'}>{priceFormatter.format(product.totalPrice)} грн.</div>
                    <div className={'buy'}>
                        <button onClick={() => {
                            dispatch(delProduct(product._id));
                            deleteProduct(product._id);
                        }}>
                            <MdDeleteForever className=" icon_basket"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
