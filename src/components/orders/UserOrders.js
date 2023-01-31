import * as React from "react";

import Cart from "./Cart";
import {useEffect, useState} from "react";
import {APIServise} from "../servises";

export function UserOrders() {

    const [orders, setOrders] = useState([]);

    const location = window. location.pathname;
    const locationSplit = location.split('/:');
     const locationSplitOneItem = locationSplit[1];

    useEffect(() => {
        let isMounted = true;
            APIServise.getOrdersById(locationSplitOneItem).then(respons => {
                if(isMounted) {
                    setOrders(respons.data)
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
                {
                    orders?.map((order, i) =>
                        <div key={order._id} className={`check_order ${order.status}`}>
                            <div className={'center'}>
                                <div>Замовлення № {i + 1}</div>
                            </div>
                            <Cart cart={order.cart}/>
                            <div className={'center'}>
                                <div className={'width'}>Загальна сума: {order.summa}</div>
                            </div>
                            <div className={'center'}>
                                <div className={'width justify-content-between'}>Статус: {order.status}

                                </div>
                            </div>
                        </div>
                    ).reverse()
                }
                {!orders && <h1 className={'h1-text-align-center'}>Замовлення вісутні</h1>
                }
            </div>
        </>
    );
}
