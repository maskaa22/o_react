import * as React from "react";
import {useEffect, useState} from "react";

import './Analyze.css'
import {Analys_profit} from "./Analys_profit";
import {Analys_status_order} from "./Analys_status_order";
import {APIServise} from "../servises"
import {ELSXFunction} from "../utils/function";

export function Analysis() {

    const [orders, setOrders] = useState();
    const [analyze, setAnalyze] = useState();


    useEffect(() => {
        APIServise.getOrdersByVisualAnaliz().then(respons => {
            setOrders(respons.data)
        });
        APIServise.getAnalyze().then(respons => {
            setAnalyze(respons.data)
        });
    }, []);

    const HeadingAnalyze = [
        {
            month: "Місяць",
            summa: "Сумма"
        }
    ];
    const HeadingOrder = [
        {
            status: "Статус",
            summa: "Сумма"
        }
    ];

    return (
        <div>
            <h2>Звіти</h2>


            <h4>Графік прибутку по місяцях</h4>
            <div className={'div_btn_analyz'}>
                <button className={'btn_analyz'} onClick={() => ELSXFunction(HeadingAnalyze, analyze, 'Звіт прибутку.xlsx')}>Експортувати прибутки в EXEL</button>
            </div>
            <Analys_profit analyze={analyze}/>

            <h4>Графік сум заказів по статусах</h4>
            <div className={'div_btn_analyz'}>
                <button className={'btn_analyz'} onClick={() => ELSXFunction(HeadingOrder, orders, 'Звіт статусів.xlsx')}>Експортувати статуси в EXEL</button>
            </div>
            <Analys_status_order data={orders}/>
        </div>

    );
}
