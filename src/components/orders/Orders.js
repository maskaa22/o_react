import * as React from 'react';
import {useEffect, useState} from 'react';

import './Orders.css';
import './Orders@media.css';
import '../admin/AdminPagesModern.css';
import '../order/OrderModern.css';
import {getOrders, getOrdersByFilter} from "../../servises";
import {Order} from "../order";
import {
    WORD_ACCEPTED,
    WORD_EVERY,
    WORD_EXPECTED,
    WORD_PROCESSING,
    WORD_READY,
    WORD_SEND
} from "../../config/wordsConstants";

// Фільтр за статусом: "все" показує всі замовлення (значення те саме, що й у випадаючому списку раніше)
const FILTERS = [
    {value: WORD_EVERY, label: 'всі'},
    {value: WORD_EXPECTED, label: 'очікується'},
    {value: WORD_ACCEPTED, label: 'прийнято'},
    {value: WORD_PROCESSING, label: 'обробка'},
    {value: WORD_SEND, label: 'відправлено'},
    {value: WORD_READY, label: 'готово'}
];

export function Orders() {

    const [filter, setFilter] = React.useState('');
    const [orders, setOrders] = useState();
    const [newStatus, setNewStatus] = useState('');
    const [flag, setFlag] = useState(false);


    useEffect(() => {
        getOrders().then(respons => {
            // при помилці запиту respons порожній — не даємо сторінці впасти
            if (respons) {
                setOrders(respons.data);
            }
        });
        setNewStatus('');
        setFlag(false);
    }, [setOrders, newStatus, flag]);

    const handleChangeFilter = (value) => {
        setFilter(value);
        getOrdersByFilter(value).then(respons => {
            if (respons) {
                setOrders(respons.data);
            }
        });
    };

    return (
        <section className={'adm'}>
            <header className={'adm-head'}>
                <div className={'adm-head__title'}>
                    <h2 className={'adm-title'}>Замовлення</h2>
                    {orders && orders.length !== 0 && <span className={'adm-count'}>{orders.length}</span>}
                </div>
            </header>

            <div className={'ao-filter'} role={'group'} aria-label={'Фільтр за статусом'}>
                {FILTERS.map(item => (
                    <button key={item.value} type={'button'}
                            className={`ao-chip${filter === item.value ? ' is-active' : ''}`}
                            aria-pressed={filter === item.value}
                            onClick={() => handleChangeFilter(item.value)}>
                        {item.label}
                    </button>
                ))}
            </div>

            <Order orders={orders} mode={'active'} setNewStatus={setNewStatus} setFlag={setFlag}/>
        </section>
    );
}
