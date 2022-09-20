import {delPrice, delProduct} from "../reducers/actionCreators";
import {useDispatch} from "react-redux";
import {MdDeleteForever} from "react-icons/md"

import '../productCart/ProductCart.css'
import {Count} from "../countProduct";
import priceFormatter from "../utils/priceFormatter/priceFormatter";
import {useEffect, useState} from "react";


export function BasketCart({product, deleteProduct, index,
                               increase, decrease, changeValue,
                               setLastCount,
                               //setNewProduct
}) {
//console.log(index);
    const dispatch = useDispatch();


    let [price, setPrice] = useState(product.price);
    //let [newCount, setNewCount] = useState(product.price);

    // setNewProduct({
    //     _id: product._id,
    //     product_name: product.product_name,
    //     title: product.title,
    //     price: product.price,
    //     category_id: product.category_id,
    //     count: newCount,
    //     totalPrice: price,
    //     inventoryNumber: product.inventoryNumber
    // })

    return (
        <div className="column">
            <div className={'card'}>
                <div><img src={'https://u.makeup.com.ua/g/gl/gla8v5cgd3qy.png'} alt={'шaмпунь'}/></div>
                <div className={'info_card'}><span>{product.product_name}</span></div>
                <div className={'flex_buy'}>
                    <div className={'info'}>
                        <div className={'info_card'}>{product.title}</div>
                    </div>

                    <Count count={product.count} increase={increase} decrease={decrease} id={product._id}  changeValue={changeValue}/>

                    {/*<Count setLastCount={setLastCount} price={product.price} setPrice={setPrice} product={product}*/}
                    {/*       //setNewCount={setNewCount}*/}
                    {/*       //increase={increase} id={product._id} decrease={decrease} changeValue={changeValue}*/}
                    {/*/>*/}

                </div>
                <div className={'flex_buy'}>
                    <div className={'info_card'}>{priceFormatter.format(product.totalPrice)} грн.</div>
                    {/*<div className={'info_card'}>{priceFormatter.format(price)} грн.</div>*/}
                    <div className={'buy'}>
                        <button onClick={() => {
                            //dispatch(delProduct(product._id));
                            //deleteProduct(product._id);


                            // dispatch(delPrice(index));
                            dispatch(delPrice(index, price));
                        }}>
                            <MdDeleteForever className=" icon_basket"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
