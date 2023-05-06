import * as React from "react";
import {useEffect, useState} from "react";

import {getArchiveOrders} from "../../servises";
import {Order} from "../order";

export function ArchiveOrders() {

    const [orders, setOrders] = useState();
    const [deleteOrder, setDeleteOrder] = useState(false);


    useEffect(() => {
        getArchiveOrders().then(respons => {
            setOrders(respons.data);
        });
        setDeleteOrder(false);
    }, [deleteOrder]);

    return (
        <div>
            <h2 className={'orders-h2'}>Архів</h2>
            <div className={'filter'}>
                <Order orders={orders} del={true} visible={'visible'} hiden={'hiden'} setDeleteOrder={setDeleteOrder}/>
            </div>
        </div>
    );
}
