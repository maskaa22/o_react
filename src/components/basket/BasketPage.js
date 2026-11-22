import * as React from 'react';
import {useEffect, useState} from 'react';
import axios from "axios";
import {FaArrowRight} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";
import {TbBasketOff} from "react-icons/tb";
import {useDispatch, useSelector} from "react-redux";

// Старі стилі лишаються підключеними: їхні глобальні класи використовують інші сторінки
import '../servicePage/ServicePage.css';   // спільні токени sv-* (шрифт, тіні, відступи) для класу .sv
import './BasketPage.css';
import './BasketPage@media.css';
import '../productsPage/ProductsPage.css';
import './BasketPageModern.css';
import {setOrder, auth, dateAnalizy} from "../../servises";
import {BasketCart} from "../basketCart";
import {BUY_URL} from "../../config/URL";
import {delAllProduct, setBasket} from "../../reducers/actionCreators";
import {InfoForBuy} from "../infoForBuy";
import {LOGIN, PRODUCTS} from "../../config/headerConstants";
import {store} from "../../reducers";
import {WORD_AUTH, WORD_LOCALES, WORD_MONEY, WORD_OPTIONS, WORD_TOKEN, WORD_WAITING} from "../../config/wordsConstants";
import priceFormatter from "../../utils/priceFormatter/priceFormatter";

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

    // Зміни кількості робляться в локальному стані cart. Щоб вони (як і видалення) переживали
    // оновлення сторінки, переносимо їх у Redux — звідти кошик зберігається в localStorage.
    useEffect(() => {
        dispatch(setBasket(cart));
    }, [cart, dispatch]);

    let summa = 0;

    cart.forEach(el => {
        summa += Number.parseFloat(el.totalPrice);
    });

    // count виставляється після першого малювання; до того береться 1, щоб не показувати NaN
    const total = summa * (count || 1);
    const quantity = cart.reduce((sum, el) => sum + (Number(el.count) || 0), 0);

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
                // було product.id === id, але в товару є лише _id — тому "менше" не спрацьовувало
                if (product._id === id) {

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
        // було id !== product.id (завжди true), тому товар лишався на екрані після видалення
        setCart((cart) => cart.filter((product) => id !== product._id));
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
                    // замовлення вже записане, тож перед переходом на оплату кошик очищаємо: раніше це
                    // робило саме перезавантаження сторінки, а тепер кошик зберігається і лишався б
                    store.dispatch(delAllProduct());
                    window.location.href = response.data.url;
                }
            })
            .catch((err) => console.log(err.message));
    };

    // Та сама дія, що була в onClick кнопки "Оформити"
    const checkout = () => {
        setOrder(currentUser.id, currentUser.name, currentUser.surname, currentUser.phone,
            currentUser.nameSity, currentUser.nameDepartment, pay, cart, status, total, month);
        dateAnalizy(month, summa);
        if (pay === WORD_MONEY) {
            navigate(PRODUCTS);
            store.dispatch(delAllProduct());
        }
        if (pay !== '' && pay !== WORD_MONEY) {
            handleCheckout();
        }
    };

    function showCheck() {

        return (
            <div className={'bk-layout'}>
                <div className={'bk-main'}>
                    <section className={'bk-items'} aria-label={'Товари в кошику'}>
                        {
                            cart.map(product => (
                                <BasketCart
                                    product={product}
                                    key={product._id}
                                    deleteProduct={deleteProduct}
                                    increase={increase}
                                    decrease={decrease}
                                    changeValue={changeValue}
                                />
                            ))
                        }
                    </section>
                </div>

                {/* права колонка: підсумок, а під ним три кроки оформлення */}
                <div className={'bk-side'}>
                <aside className={'bk-summary'}>
                    <h2 className={'bk-summary__title'}>Підсумок</h2>
                    <dl className={'bk-summary__list'}>
                        <div><dt>Товарів</dt><dd>{quantity} шт.</dd></div>
                        <div><dt>Оплата</dt><dd>{pay || 'не обрано'}</dd></div>
                    </dl>
                    <div className={'bk-total'}>
                        <span>Разом</span>
                        <strong>{priceFormatter.format(total)} грн.</strong>
                    </div>
                    {/* без обраного способу оплати замовлення не оформлюється: раніше натискання створювало
                        запис замовлення й аналітики, а далі нічого не відбувалось */}
                    <button type={'button'} className={'bk-checkout'} disabled={pay === ''} onClick={checkout}>
                        Оформити <FaArrowRight aria-hidden={'true'}/>
                    </button>
                    {pay === '' && <p className={'bk-summary__hint'}>Оберіть спосіб оплати</p>}
                </aside>
                    <InfoForBuy setPay={setPay}/>
                </div>
            </div>
        )
    }

    function showNothing() {

        return (
            <div className={'bk-empty'}>
                <span className={'bk-empty__icon'}><TbBasketOff aria-hidden={'true'}/></span>
                <h2>Додайте товари в кошик</h2>
                <p>Тут з'являться товари, які ви оберете в каталозі.</p>
                <Link to={PRODUCTS} className={'sv-btn'}>До товарів <FaArrowRight aria-hidden={'true'}/></Link>
            </div>
        )
    }

    return (
        <div className={'sv bk'}>
            <div className={'sv-container bk-wrap'}>
                <header className={'bk-head'}>
                    <h1 className={'bk-head__title'}>Кошик</h1>
                    {currentProduct.length > 0 && <span className={'bk-head__count'}>{quantity} шт.</span>}
                </header>
                {
                    currentProduct.length > 0 ? showCheck() : showNothing()
                }
            </div>
        </div>
    );
}
