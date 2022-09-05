import Cart from "../orders/Cart";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {APIServise} from "../servises";
import * as React from "react";
import {deleteOrder} from "../servises/API";

export function Order ({orders, del, visible})
{

    const [status, setStatus] = React.useState('');


    const handleChange = (event) => {
        setStatus(event.target.value);
    };


    return(
        <div>
            {
                orders?.map((order, i)=>
                    <div key={order._id} className={`check_order ${order.status}`}>
                        <div className={'center'}><div>Заказ № {i+1}</div></div>
                        <div className={'justify-content-around'}>
                            <div className={'user'}>Имя {order.user_name}</div>
                            <div className={'user'}>Фамилия {order.user_name}</div>
                        </div>
                        <div className={'center'}><div className={'user width'}>Адрес: {order.user_name}</div></div>
                        <div className={'center'}><div className={'user width'}>Телефон - {order.user_name}</div></div>
                        <Cart cart={order.cart}/>
                        <div className={'center'}><div className={'width'}>Общая сумма: {order.summa}</div></div>
                        <div className={'center'}><div className={'width justify-content-between'}>Статус: {order.status}
                            <div className={'select_value'}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="demo-simple-select-label">Выбрать статус</InputLabel>
                                    <Select
                                        id="demo-simple-select"
                                        value={status}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={'ожидаеться'}>ожидаеться</MenuItem>
                                        <MenuItem value={'принято'}>принято</MenuItem>
                                        <MenuItem value={'обработка'}>обработка</MenuItem>
                                        <MenuItem value={'отправленно'}>отправленно</MenuItem>
                                        <MenuItem value={'готово'}>готово</MenuItem>
                                    </Select>
                                </FormControl>

                                {order.status==='готово' ?
                                    <div className={`center end ${del}`}><button className={'status archive'} onClick={() => {
                                        APIServise.archiveOrder(order._id)
                                        window.location.reload();
                                    }}>В архив</button>
                                    </div> :
                                    <div className={'center end'}><button className={'status'} onClick={() => {
                                        APIServise.updateStatusOrder(order._id, status)
                                        if(status==='готово') {
                                            APIServise.updateDateAnalizy(order.month, order.summa)
                                        }
                                        window.location.reload();
                                    }}>Сменить</button></div>
                                }
                                <div className={`center end ${visible}`}><button className={'status'} onClick={() => {
                                    APIServise.deleteOrder(order._id)
                                    window.location.reload();
                                }}>Удалить</button>
                                </div>


                            </div>
                        </div>
                        </div>
                        <div className={'center'}><div className={'width'}>Дата заказа:
                            { new Date(order.createdAt).toISOString().split('T')[0]}

                            {/*{ new Date(order.createdAt).toLocaleString('default', { month: 'long' })}*/}
                        </div></div>


                    </div>

                ).reverse()
            }
        </div>
    );
}
