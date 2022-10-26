import {useEffect, useState} from "react";

import './ArchiveOrders.css'
import {APIServise} from "../servises";
import {Order} from "../order";

export function ArchiveOrders() {
    const [orders, setOrders] = useState();

    useEffect(() => {
        APIServise.getArchiveOrders().then(respons => {
            setOrders(respons.data)
        });
    }, []);

    return (
        <div>
            <Order orders={orders} del={true} visible={'visible'}/>
        </div>
    );
}
