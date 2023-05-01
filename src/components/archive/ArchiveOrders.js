import * as React from "react";
import {useEffect, useState} from "react";

import {getArchiveOrders} from "../servises";
import {Order} from "../order";

export function ArchiveOrders() {

    const [orders, setOrders] = useState();

    useEffect(() => {
        getArchiveOrders().then(respons => {
            setOrders(respons.data);
        });
    }, []);

    return (
        <div>
            <h2 className={'orders-h2'}>Архів</h2>
            <div className={'filter'}>
                <Order orders={orders} del={true} visible={'visible'}/>
            </div>
        </div>
    );
}
