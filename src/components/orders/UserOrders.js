import * as React from "react";
import {useEffect, useState} from "react";
import {FaArrowRight, FaBoxOpen} from "react-icons/fa";
import {Link} from "react-router-dom";

import './Orders.css';
import './Orders@media.css';
import './UserOrdersModern.css';
import {getOrdersById} from "../../servises";
import Cart from "./Cart";
import {PRODUCTS} from "../../config/headerConstants";

// Колір позначки статусу. Значення статусів ті самі, що й в адмінці (див. WORD_EXPECTED тощо)
const STATUS_TONE = {
    'очікується': 'wait',
    'прийнято': 'accepted',
    'обробка': 'processing',
    'відправлено': 'sent',
    'готово': 'done'
};

export function UserOrders() {

    const [orders, setOrders] = useState([]);

    const location = window.location.pathname;
    const locationSplit = location.split('/:');
    const locationSplitOneItem = locationSplit[1];

    useEffect(() => {
        let isMounted = true;
        getOrdersById(locationSplitOneItem).then(respons => {
            if (isMounted) {
                setOrders(respons.data);
            }
        });
        return () => {
            isMounted = false;
        }
    }, [locationSplitOneItem]);

    // Номер замовлення — за порядком створення (найстаріше = 1), а показуємо найновіші першими
    const numbered = orders.map((order, i) => ({order, number: i + 1})).reverse();

    return (
        <section className={'uo'}>
            <header className={'uo-head'}>
                <h2 className={'uo-head__title'}>Мої замовлення</h2>
                {orders.length !== 0 && <span className={'uo-head__count'}>{orders.length}</span>}
            </header>

            {orders.length !== 0 ?
                <div className={'uo-list'}>
                    {numbered.map(({order, number}) => (
                        <article key={order._id} className={'uo-order'}>
                            <header className={'uo-order__head'}>
                                <h3 className={'uo-order__title'}>Замовлення № {number}</h3>
                                <span className={`uo-status uo-status--${STATUS_TONE[order.status] || 'default'}`}>
                                    {order.status}
                                </span>
                            </header>

                            <Cart cart={order.cart}/>

                            <footer className={'uo-order__foot'}>
                                <span>Загальна сума</span>
                                <strong>{order.summa} грн.</strong>
                            </footer>
                        </article>
                    ))}
                </div> :
                <div className={'uo-empty'}>
                    <span className={'uo-empty__icon'}><FaBoxOpen aria-hidden={'true'}/></span>
                    <h3>Замовлення відсутні</h3>
                    <p>Тут з'являться ваші замовлення, щойно ви щось оформите.</p>
                    <Link to={PRODUCTS} className={'uo-empty__btn'}>
                        До товарів <FaArrowRight aria-hidden={'true'}/>
                    </Link>
                </div>
            }
        </section>
    );
}
