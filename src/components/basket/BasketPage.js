import {useDispatch, useSelector} from "react-redux";
import * as React from 'react';

import './BasketPage.css'
import '../productsPage/ProductsPage.css'
import { BasketCart } from "../basketCart";
import {useEffect, useState} from "react";
import {APIServise} from "../servises";
import StripeCheckout from "react-stripe-checkout";
import {Input} from "../utils";
import {NewPochta} from "../newPochta";
// import StripeCheckout from 'react-stripe-checkout';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import {FiCheckCircle} from "react-icons/fi";
import {InfoForBuy} from "../infoForBuy";

export function BasketPage ({active, setActive})
{
    const dispatch = useDispatch();

    const currentProduct = useSelector(state => state.product.currentProduct);
    const currentUser = useSelector(state => state.user.currentUser);

    const [count, setCount] = useState();
    const [cart, setCart] = useState(currentProduct);
    const [status, setStatus] = useState('');
    const [pay, setPay] = useState('');



    useEffect(() => {
        setCount(1);
        setStatus('ожидаеться')
    }, []);
    let [lastCount, setLastCount] = useState(1);
    let summa = 0;

    currentProduct.forEach(el =>
    {
        //console.log(el);
        summa += Number.parseFloat(el.totalPrice)
    })

    const increase = (id) => {
        setCart((cart) => {
            return cart.map((product) => {

                if (product._id === id) {
                    console.log(product);
                    return {
                        ...product,
                        count: +product.count + 1,
                        totalPrice: (+product.count + 1) * product.price,
                    };
                }
                return product
            })
        })
    }

    const decrease = (id) => {
        setCart((cart) => {
            console.log(cart);
            return cart.map((product) => {

                if (product.id === id) {
                    const newCount = product.count - 1 > 1 ? product.count - 1 : 1;
                    return {
                        ...product,
                        count: newCount,
                        totalPrice: newCount * product.price,
                    };
                }
                return product
            })
        })
    }
    const deleteProduct = (id) => {
        setCart((cart) => cart.filter((product)=> id !== product.id));
    }

    const changeValue = (id, value) => {
        setCart((cart) => {
            return cart.map((product) => {
                if (product._id === id) {
                    return {
                        ...product,
                        count: value,
                        totalPrice: value * product.price
                    }
                }
                return product
            })
        })
    }

    const products = cart.map((product, i) => {
        return (
            <BasketCart
                product={product}
                key={i}
                deleteProduct={deleteProduct}
                increase={increase}
                decrease={decrease}
                changeValue={changeValue}
            />
        );
    })

    const month = new Date().toLocaleString('default', { month: 'long' });



    function showCheck() {
        return(
            <div >
                <div  >
                    <div/>


                    <div className={'row'}>
                        {product}
                    </div>

                    <InfoForBuy money={summa*lastCount} setPay={setPay}/>


                    <div className={'basket_check flex_space_between btn_last'}>
                        <div className={'summa'}>
                            <i className="fa fa-shopping-basket summaProduct" aria-hidden="true"/>
                            {summa*lastCount} грн.
                        </div>
                        <div><button className={'check'} onClick={()=> {
                            // APIServise.setOrder(currentUser.id, currentUser.name, currentUser.surname, currentUser.phone,
                            //    currentUser.nameSity, currentUser.nameDepartment, pay,
                            //     currentProduct, setLastCount,
                            //     //cart,
                            //     status,
                            //     //summa*count,
                            //     summa*lastCount,  month);

                            //APIServise.dateAnalizy(month, summa)

                        }}>Оформить заказ</button></div>
                    </div>
                </div>
            </div>
        )
    }
    function showNothing() {
        return (
                <h1>Товаров нет</h1>
        )
    }

    return(
        <div>
            {
                currentProduct.length>0?
                    showCheck():showNothing()
            }
        </div>

    );
}
