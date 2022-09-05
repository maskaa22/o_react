import Cart from "./Cart";

import * as React from "react";

export  function UserOrders ({orders})
{
    // console.log(orders);
    return(
        <div>
            {
                orders?.map((order, i)=>
                    <div key={order._id} className={`check_order ${order.status}`}>
                        <div className={'center'}><div>Заказ № {i+1}</div></div>
                        <Cart cart={order.cart}/>
                        <div className={'center'}><div className={'width'}>Общая сумма: {order.summa}</div></div>
                        <div className={'center'}><div className={'width justify-content-between'}>Статус: {order.status}

                        </div></div>


                    </div>

                ).reverse()
            }
        </div>
    );
}
