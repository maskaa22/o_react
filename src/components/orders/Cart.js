import './Orders.css'
import {useSelector} from "react-redux";
import {useState} from "react";

export default function Cart ({cart})
{
    const role = useSelector(state => state.user.role);


    return(
        <div>
            {
                cart.map(c=>
                    <div key={c._id} className={'justify-content-around'}>
                        <div>
                            {role==='admin' && <li>Инв. № - {c.inventoryNumber}</li>}
                            {role==='user' && <li>{c.product_name}</li>}
                        </div>

                        <div>
                            <div>{c.count} шт.</div>
                        </div>


                    </div>
                )
            }
        </div>
    );
}
