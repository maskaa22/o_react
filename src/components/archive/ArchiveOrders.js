import {useEffect, useState} from "react";

import {APIServise} from "../servises";
import {Order} from "../order";
import * as React from "react";

export function ArchiveOrders() {
    const [orders, setOrders] = useState();

    useEffect(() => {
        APIServise.getArchiveOrders().then(respons => {
            setOrders(respons.data)
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
