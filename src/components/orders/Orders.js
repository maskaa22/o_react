import {useEffect, useState} from "react";

import './Orders.css'
import {APIServise} from "../servises";
import Cart from "./Cart";

import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Order} from "../order";



export function Orders ()
{
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

    return(
        <div >
            <div className={'check_order filter'}>
                <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">Выберите статус</InputLabel>
                    <Select
                        id="demo-simple-select"
                        value={filter}
                        onChange={handleChangeFilter}
                    >
                        <MenuItem value={'все'}>все</MenuItem>
                        <MenuItem value={'ожидаеться'}>ожидаеться</MenuItem>
                        <MenuItem value={'принято'}>принято</MenuItem>
                        <MenuItem value={'обработка'}>обработка</MenuItem>
                        <MenuItem value={'отправленно'}>отправленно</MenuItem>
                        <MenuItem value={'готово'}>готово</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <Order orders={orders} del={false} visible={'hiden'}/>

        </div>
    );
}
