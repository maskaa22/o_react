import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import {deleteOrder, archiveOrder, updateStatusOrder} from "../../servises";
import Cart from "../orders/Cart";
import {WORD_ACCEPTED, WORD_EXPECTED, WORD_PROCESSING, WORD_READY, WORD_SEND} from "../../config/wordsConstants";

export function Order({orders, del, visible, setNewStatus, setFlag, hiden, setDeleteOrder}) {

    const [status, setStatus] = React.useState('');

    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    return (
        <div>
            {
                orders?.map((order, i) =>
                    <div key={order._id} className={`check_order ${order.status}`}>
                        <div className={'center color_label'}>
                            <div>Замовлення № {i + 1}</div>
                        </div>
                        <div className={'center'}>
                            <div className={'user width'}>ПІБ: {order.user_name} {order.surname}</div>
                        </div>
                        <div className={'center'}>
                            <div className={'user width'}>Адреса доставки: м. {order.nameSity}, відділ.
                                №{order.nameDepartment}</div>
                        </div>
                        <div className={'center'}>
                            <div className={'user width'}>Телефон: {order.phone}</div>
                        </div>
                        <Cart cart={order.cart}/>
                        <div className={'center'}>
                            <div className={'width'}>Загальна сума: {order.summa} грн.</div>
                        </div>
                        <div className={'center'}>
                            <div className={'width justify-content-between'}>Статус: {order.status}
                                <div className={'select_value select_status_color_label'}>
                                    {order.status !== WORD_READY &&
                                    <FormControl fullWidth size="small">
                                        <InputLabel id="demo-simple-select-label">Вибрати статус</InputLabel>
                                        <Select
                                            className={'select_all_border'}
                                            id="demo-simple-select"
                                            value={status}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={WORD_EXPECTED}>очікується</MenuItem>
                                            <MenuItem value={WORD_ACCEPTED}>прийнято</MenuItem>
                                            <MenuItem value={WORD_PROCESSING}>обробка</MenuItem>
                                            <MenuItem value={WORD_SEND}>відправлено</MenuItem>
                                            <MenuItem value={WORD_READY}>готово</MenuItem>
                                        </Select>
                                    </FormControl>
                                    }
                                    {(status=== WORD_READY || order.status=== WORD_READY)  ?
                                        <div className={`center end ${del}`}>
                                            <button className={'status archive'} onClick={() => {
                                                archiveOrder(order._id).then(req => {
                                                    if(req) {
                                                        setFlag(true);
                                                    }
                                                });
                                            }}>В архив
                                            </button>
                                        </div> :
                                        <div className={`center end ${hiden}`}>
                                            <button className={'status'} onClick={() => {
                                                updateStatusOrder(order._id, status).then(req => {
                                                    if(req) {
                                                        setNewStatus(req.status);
                                                    }
                                                });
                                            }}>Змінити
                                            </button>
                                        </div>
                                    }
                                        <div className={`center end ${visible}`}>
                                            <button className={'status'} onClick={() => {
                                                deleteOrder(order._id).then(req => {
                                                    if(req) {
                                                        setDeleteOrder(true);
                                                    }
                                                });
                                            }}>Видалити
                                            </button>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className={'center'}>
                            <div className={'width flex-date'}>
                                <div className={'margin-right-date'}>Дата замовлення:</div>
                                <div>{new Date(order.createdAt).toISOString().split('T')[0]}</div>
                            </div>
                        </div>

                    </div>
                ).reverse()
            }
        </div>
    );
}
