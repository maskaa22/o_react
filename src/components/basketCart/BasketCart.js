import * as React from "react";
import {delProduct} from "../reducers/actionCreators";
import {MdDeleteForever} from "react-icons/md";
import {useDispatch} from "react-redux";

import '../countProduct/Count.css';
import {AUTH_URL} from "../../config/URL";
import {Count} from "../countProduct";
import priceFormatter from "../utils/priceFormatter/priceFormatter";

export function BasketCart({product, deleteProduct, increase, decrease, changeValue}) {

    const dispatch = useDispatch();

    return (
        <div>
            <div className="grid-column box-shadow border_radius">
                <div className={'img img-none'}><img src={AUTH_URL + '/' + product.img} alt={'продукт'}/>
                </div>
                <div className={'text-center'}><span>{product.product_name}</span></div>
                <div className={'text-center text-title'}>{product.title}</div>
                <div className={'text-center'}><span>{priceFormatter.format(product.totalPrice)} грн.</span></div>
                <Count count={product.count} increase={increase} decrease={decrease} id={product._id}
                       changeValue={changeValue}/>
                <div className={'btn_del text-center '}>
                    <button className={'border_radius clear-btn'} onClick={() => {
                        dispatch(delProduct(product._id));
                        deleteProduct(product._id);
                    }}>
                        <MdDeleteForever className=" color_purple "/>
                    </button>
                </div>
            </div>
        </div>
    );
}
