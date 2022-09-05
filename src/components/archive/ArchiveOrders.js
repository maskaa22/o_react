import './ArchiveOrders.css'
import {useEffect, useState} from "react";
import {APIServise} from "../servises";
import {getArchiveOrders} from "../servises/API";
import {Order} from "../order";

export  function ArchiveOrders ()
{
    const [orders, setOrders] = useState();

    useEffect(() => {
        APIServise.getArchiveOrders().then(respons => {
            setOrders(respons.data)
        });
    }, []);

    return(
        <div>
            <Order orders={orders} del={true} visible={'visible'}/>
        </div>
    );
}
