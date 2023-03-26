import * as React from "react";
import {useEffect, useState} from "react";

import './Orders.css';
import './Orders@media.css';
import {APIServise} from "../servises";
import Cart from "./Cart";

export function UserOrders() {

    const [orders, setOrders] = useState([]);

    const location = window.location.pathname;
    const locationSplit = location.split('/:');
    const locationSplitOneItem = locationSplit[1];

    useEffect(() => {
        let isMounted = true;
        APIServise.getOrdersById(locationSplitOneItem).then(respons => {
            if (isMounted) {
                setOrders(respons.data);
            }
        });
        return () => {
            isMounted = false;
        }
    }, []);

    return (
        <>
            <h2 className={'orders-h2'}>Мої замовлення</h2>
            <div className={'filter'}>
                {orders.length !== 0 ?
                    orders?.map((order, i) =>
                        <div key={order._id} className={`check_order ${order.status}`}>
                            <div className={'center'}>
                                <div className={'number-orders'}>Замовлення № {i + 1}</div>
                            </div>
                            <Cart cart={order.cart}/>
                            <div className={'center margin-top-summa'}>
                                <div className={'width'}>Загальна сума: {order.summa}</div>
                            </div>
                            <div className={'center full-screen-status'}>
                                <div className={'width justify-content-between'}>Статус: {order.status}
                                </div>
                            </div>
                        </div>
                    ).reverse() : <h1 className={'h1-text-align-center'}>Замовлення вісутні</h1>
                }
            </div>
        </>
    );
}
