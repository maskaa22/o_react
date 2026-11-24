import * as React from "react";
import {useEffect, useState} from "react";

import '../admin/AdminPagesModern.css';
import '../order/OrderModern.css';
import {getArchiveOrders} from "../../servises";
import {Order} from "../order";

export function ArchiveOrders() {

    const [orders, setOrders] = useState();
    const [deleteOrder, setDeleteOrder] = useState(false);


    useEffect(() => {
        getArchiveOrders().then(respons => {
            // при помилці запиту respons порожній — не даємо сторінці впасти
            if (respons) {
                setOrders(respons.data);
            }
        });
        setDeleteOrder(false);
    }, [deleteOrder]);

    return (
        <section className={'adm'}>
            <header className={'adm-head'}>
                <div className={'adm-head__title'}>
                    <h2 className={'adm-title'}>Архів</h2>
                    {orders && orders.length !== 0 && <span className={'adm-count'}>{orders.length}</span>}
                </div>
            </header>

            <Order orders={orders} mode={'archive'} setDeleteOrder={setDeleteOrder}/>
        </section>
    );
}
