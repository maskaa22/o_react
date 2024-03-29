import * as React from 'react';
import {useEffect, useState} from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import './Orders.css';
import './Orders@media.css';
import {getOrders, getOrdersByFilter} from "../../servises";
import {Order} from "../order";
import {
    WORD_ACCEPTED,
    WORD_EVERY,
    WORD_EXPECTED,
    WORD_HIDEN,
    WORD_PROCESSING,
    WORD_READY,
    WORD_SEND
} from "../../config/wordsConstants";

export function Orders() {

    const [filter, setFilter] = React.useState('');
    const [orders, setOrders] = useState();
    const [newStatus, setNewStatus] = useState('');
    const [flag, setFlag] = useState(false);


    useEffect(() => {
        getOrders().then(respons => {
            setOrders(respons.data);
        });
        setNewStatus('');
        setFlag(false);
    }, [setOrders, newStatus, flag]);

    const handleChangeFilter = (event) => {
        setFilter(event.target.value);
        getOrdersByFilter(event.target.value).then(respons => {
            setOrders(respons.data);
        });
    };

    return (
        <div>
            <h2 className={'orders-h2'}>Замовлення</h2>
            <div className={'check_order filter select_status_label'}>
                <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">Виберіть статус</InputLabel>
                    <Select
                        className={'select_all_border'}
                        id="demo-simple-select"
                        value={filter}
                        onChange={handleChangeFilter}
                    >
                        <MenuItem value={WORD_EVERY}>всі</MenuItem>
                        <MenuItem value={WORD_EXPECTED}>очікується</MenuItem>
                        <MenuItem value={WORD_ACCEPTED}>прийнято</MenuItem>
                        <MenuItem value={WORD_PROCESSING}>обробка</MenuItem>
                        <MenuItem value={WORD_SEND}>відправлено</MenuItem>
                        <MenuItem value={WORD_READY}>готово</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <Order orders={orders} del={false} visible={WORD_HIDEN} setNewStatus={setNewStatus} setFlag={setFlag}/>
        </div>
    );
}
