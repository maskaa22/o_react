import * as React from "react";
import {delProduct} from "../reducers/actionCreators";
import {MdDeleteForever} from "react-icons/md"
import {useDispatch} from "react-redux";

import {Count} from "../countProduct";
import priceFormatter from "../utils/priceFormatter/priceFormatter";

export function BasketCart({product, deleteProduct, increase, decrease, changeValue}) {
    const dispatch = useDispatch();

    return (
        <div>
            <div className="flex_space_between box-shadow border_radius">
                <div className={'img'}><img src={'https://u.makeup.com.ua/g/gl/gla8v5cgd3qy.png'} alt={'шaмпунь'}/>
                </div>
                <div className={'text-center'}><span>{product.product_name}</span></div>
                {/*Под вопросом нужно или нет*/}
                <div className={'text-center'}>{product.title}</div>

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
