import {useEffect, useState} from "react";

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
        <div className={'filter'}>
            <Order orders={orders} del={true} visible={'visible'}/>
        </div>
    );
}
