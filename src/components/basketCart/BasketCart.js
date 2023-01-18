import * as React from "react";
import {delProduct} from "../reducers/actionCreators";
import {MdDeleteForever} from "react-icons/md"
import {useDispatch} from "react-redux";

import {Count} from "../countProduct";
import priceFormatter from "../utils/priceFormatter/priceFormatter";
import {AUTH_URL} from "../../config/URL";

export function BasketCart({product, deleteProduct, increase, decrease, changeValue}) {

    const dispatch = useDispatch();

    return (
        <div>
            <div className="grid-column box-shadow border_radius">
                <div className={'img img-none'}><img src={AUTH_URL + '/' + product.img}
                                                     alt={'шaмпунь'}/>
                </div>
                <div className={'text-center'}><span>{product.product_name}</span></div>
                <div className={'text-center text-title'}>{product.title}</div>

                <div className={'text-center'}><span>{priceFormatter.format(product.totalPrice)} грн.</span></div>
                <Count count={product.count} increase={increase} decrease={decrease} id={product._id}
                       changeValue={changeValue}/>
                <div className={'btn_del text-center '}>
                    <button className={'border_radius'} onClick={() => {
                        dispatch(delProduct(product._id));
                        deleteProduct(product._id);
                    }}>
                        <MdDeleteForever className=" icon_basket color_purple "/>
                    </button>
                </div>
            </div>
        </div>
    );
}
