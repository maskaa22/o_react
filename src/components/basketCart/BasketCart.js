import {delPrice, delProduct, priceProduct} from "../reducers/actionCreators";
import {useDispatch, useSelector} from "react-redux";
import {MdDeleteForever} from "react-icons/md"
import {BiPlusCircle, BiMinusCircle} from "react-icons/bi"

import '../productCart/ProductCart.css'
import {useEffect, useState} from "react";
import {Input} from "../utils";

export function BasketCart({product, price, countProduct}) {

    const dispatch = useDispatch();

    const [count, setCount] = useState(1);

    // useEffect(() => {
    //     dispatch(priceProduct(product.price*count));
    // }, []);

    console.log(product.price*count);


    return (
        <div className="column">
            <div className={'card'}>
                <div><img src={'https://u.makeup.com.ua/g/gl/gla8v5cgd3qy.png'} alt={'шaмпунь'}/></div>
                <div className={'info_card'}><span>{product.product_name}</span></div>
                <div className={'flex_buy'}>
                    <div className={'info_card'}>{product.title}</div>
                    <div className={'count'}>
                        <BiMinusCircle onClick={() => {
                            if (count === 0 || count === 1)
                            {
                                setCount(count);
                                //countProduct(count);
                            }
                            else if (count > 0)
                            {
                                setCount(count - 1);
                                //countProduct(count);
                            }
                            countProduct(count-1);
                            //console.log(count);


                        }}/>
                        {count}
                        <BiPlusCircle onClick={() =>
                        {
                            setCount(count + 1);
                            countProduct(count+1);
                            
                        }}/>
                    </div>
                    {/*<div><input value={count}   type={'number'} placeholder={''} className={'input-count'}*/}
                    {/*       onChange={(event) => setCount(event.target.value)}/> шт.</div>*/}
                </div>
                <div className={'flex_buy'}>
                    <div className={'info_card'}>{product.price} грн.</div>
                    <div className={'buy'}>
                        <button onClick={() => {

                            dispatch(delProduct(product._id));
                            dispatch(delPrice(price));
                        }}>
                            <MdDeleteForever className=" icon_basket"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
