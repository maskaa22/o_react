import * as React from "react";

import Cart from "./Cart";

export function UserOrders({orders}) {
    // console.log(orders);
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
            </div>
        </>
    );
}
