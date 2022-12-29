import * as React from 'react';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import './BasketPage.css';
import './BasketPage@media.css';
import '../productsPage/ProductsPage.css'
import {APIServise} from "../servises";
import {BasketCart} from "../basketCart";
import {delAllProduct} from "../reducers/actionCreators";
import {InfoForBuy} from "../infoForBuy";
import {store} from "../reducers";
import {TbBasketOff} from "react-icons/tb";
import {WORD_LOCALES, WORD_MONEY, WORD_OPTIONS, WORD_WAITING} from "../../config/wordsConstants";
import {BUY_URL} from "../../config/URL";
import {PRODUCTS} from "../../config/headerConstants";

export function BasketPage({active, setActive}) {
    const dispatch = useDispatch();

    const currentProduct = useSelector(state => state.product.currentProduct);
    const currentUser = useSelector(state => state.user.currentUser);

    const [count, setCount] = useState();
    const [cart, setCart] = useState(currentProduct);
    const [status, setStatus] = useState('');
    const [pay, setPay] = useState('');


    useEffect(() => {
        setCount(1);
        setStatus(WORD_WAITING)
    }, []);
    //let [lastCount, setLastCount] = useState(1);
    let summa = 0;

    cart.forEach(el => {
        summa += Number.parseFloat(el.totalPrice)
    })

    const increase = (id) => {
        setCart((cart) => {
            return cart.map((product) => {

                if (product._id === id) {

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
        setCart((cart) => cart.filter((product) => id !== product.id));
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

    // const products = cart.map((product, i) => {
    //     return (
    //         <BasketCart
    //             product={product}
    //             key={i}
    //             deleteProduct={deleteProduct}
    //             increase={increase}
    //             decrease={decrease}
    //             changeValue={changeValue}
    //
    //             money={summa*count} setPay={setPay}
    //         />
    //     );
    // })

    const month = new Date().toLocaleString(WORD_LOCALES, {month: WORD_OPTIONS});
    const navigate = useNavigate();
    const handleCheckout = () => {

        axios
            .post(BUY_URL, {
                cart,
                userId: currentUser._id,
            })
            .then((response) => {
                console.log(response);
                if (response.data.url) {
                    window.location.href = response.data.url;
                }

            })
            .catch((err) => console.log(err.message));
    };

    //const [id, setId] = useState([]);

    function showCheck() {
        return (
            <div>
                <div>
                    <div/>


                    <div className={'basket_check btn_last'}>
                        {/*{products}*/}
                        {
                            cart.map((product, i) => {
                                return (
                                    <BasketCart
                                        product={product}
                                        key={i}
                                        deleteProduct={deleteProduct}
                                        increase={increase}
                                        decrease={decrease}
                                        changeValue={changeValue}

                                        money={summa * count} setPay={setPay}
                                    />
                                );
                            })
                        }
                    </div>

                    <InfoForBuy money={summa * count} setPay={setPay} cart={cart}/>


                    <div className={'basket_check flex__space__between btn_last'}>
                        <div className={'summa'}>
                            <i className="fa fa-shopping-basket summaProduct" aria-hidden="true"/>
                            {summa * count} грн.
                        </div>
                        <div className={'check-div'}>
                            <button className={'check'} onClick={() => {
                                APIServise.setOrder(currentUser.id, currentUser.name, currentUser.surname, currentUser.phone,
                                    currentUser.nameSity, currentUser.nameDepartment, pay, cart, status, summa * count, month);
                                if (pay === WORD_MONEY) {
                                    navigate(PRODUCTS)
                                    store.dispatch(delAllProduct())
                                }
                                if (pay !== '' && pay !== WORD_MONEY) {
                                    handleCheckout()
                                }
                                APIServise.dateAnalizy(month, summa)

                            }}>Оформити
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    function showNothing() {
        return (
            <div>
                <h1 className={'basket-h1'}>Додайте товари в корзину</h1>
                <div className={'basket-icon-center'}><TbBasketOff className="basket-img"/></div>
            </div>
        )
    }

    return (
        <div>
            {
                currentProduct.length > 0 ?
                    showCheck() : showNothing()
            }
        </div>

    );
}
