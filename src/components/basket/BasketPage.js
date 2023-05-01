import * as React from 'react';
import {useEffect, useState} from 'react';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import './BasketPage.css';
import './BasketPage@media.css';
import '../productsPage/ProductsPage.css';
import {setOrder, auth, dateAnalizy} from "../servises";
import {BasketCart} from "../basketCart";
import {BUY_URL} from "../../config/URL";
import {delAllProduct} from "../reducers/actionCreators";
import {InfoForBuy} from "../infoForBuy";
import {LOGIN, PRODUCTS} from "../../config/headerConstants";
import {store} from "../reducers";
import {TbBasketOff} from "react-icons/tb";
import {WORD_AUTH, WORD_LOCALES, WORD_MONEY, WORD_OPTIONS, WORD_TOKEN, WORD_WAITING} from "../../config/wordsConstants";

export function BasketPage() {

    const currentProduct = useSelector(state => state.product.currentProduct);
    const currentUser = useSelector(state => state.user.currentUser);

    const [cart, setCart] = useState(currentProduct);
    const [count, setCount] = useState();
    const [pay, setPay] = useState('');
    const [status, setStatus] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setCount(1);
        setStatus(WORD_WAITING);
    }, []);

    useEffect(() => {
        if (localStorage.getItem(WORD_TOKEN)) {
            dispatch(auth()).then(res => {
                if (res === undefined) {
                    localStorage.removeItem(WORD_AUTH);
                    navigate(LOGIN);
                }
            })
        }
    }, [dispatch, navigate]);

    let summa = 0;

    cart.forEach(el => {
        summa += Number.parseFloat(el.totalPrice);
    });

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
                return product;
            })
        })
    };

    const decrease = (id) => {
        setCart((cart) => {

            return cart.map((product) => {
                if (product.id === id) {

                    const newCount = product.count - 1 > 1 ? product.count - 1 : 1;

                    return {
                        ...product,
                        count: newCount,
                        totalPrice: newCount * product.price,
                    };
                }
                return product;
            })
        })
    };

    const deleteProduct = (id) => {
        setCart((cart) => cart.filter((product) => id !== product.id));
    };

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
                return product;
            })
        })
    };

    const month = new Date().toLocaleString(WORD_LOCALES, {month: WORD_OPTIONS});

    const handleCheckout = () => {
        axios
            .post(BUY_URL, {
                cart,
                userId: currentUser._id,
            })
            .then((response) => {
                if (response.data.url) {
                    window.location.href = response.data.url;
                }
            })
            .catch((err) => console.log(err.message));
    };

    function showCheck() {

        return (
            <div>
                <div>
                    <div/>
                    <div className={'basket_check btn_last'}>
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
                                setOrder(currentUser.id, currentUser.name, currentUser.surname, currentUser.phone,
                                    currentUser.nameSity, currentUser.nameDepartment, pay, cart, status, summa * count, month);
                                dateAnalizy(month, summa);
                                if (pay === WORD_MONEY) {
                                    navigate(PRODUCTS);
                                    store.dispatch(delAllProduct());
                                }
                                if (pay !== '' && pay !== WORD_MONEY) {
                                    handleCheckout();
                                }
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
                currentProduct.length > 0 ? showCheck() : showNothing()
            }
        </div>
    );
}
