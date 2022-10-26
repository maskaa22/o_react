import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {useEffect, useState} from "react";

import './Orders.css'
import {APIServise} from "../servises";
import {Order} from "../order";

export function Orders() {
    const [orders, setOrders] = useState();
    const [filter, setFilter] = React.useState('');


    useEffect(() => {
        APIServise.getOrders().then(respons => {
            setOrders(respons.data)
        });
    }, []);


    const handleChangeFilter = (event) => {
        setFilter(event.target.value);
        APIServise.getOrdersByFilter(event.target.value).then(respons => {
            setOrders(respons.data)
        });
    };

    return (
        <div>
            <div className={'check_order filter select_status_label'}>
                <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">Виберіть статус</InputLabel>
                    <Select
                        className={'select_all_border'}
                        id="demo-simple-select"
                        value={filter}
                        onChange={handleChangeFilter}
                    >
                        <MenuItem value={'все'}>всі</MenuItem>
                        <MenuItem value={'очікується'}>очікується</MenuItem>
                        <MenuItem value={'прийнято'}>прийнято</MenuItem>
                        <MenuItem value={'обробка'}>обробка</MenuItem>
                        <MenuItem value={'відправлено'}>відправлено</MenuItem>
                        <MenuItem value={'готово'}>готово</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <Order orders={orders} del={false} visible={'hiden'}/>

        </div>
    );
}
