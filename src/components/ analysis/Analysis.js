import {useEffect, useState} from "react";
import * as React from "react";
import {APIServise} from "../servises"
import './Analyze.css'

import useCustTooltip from "bx-tooltip";
import { Chart, Geom, Axis, Tooltip,  Legend, Coord } from "bizcharts";

import {Analys_status_order} from "./Analys_status_order";
import {Analys_sel_for_kategory} from "./Analys_sel_for_kategory";
import {Analys_profit} from "./Analys_profit";


export  function Analysis ()
{

    const [orders, setOrders] = useState();
    const [analyze, setAnalyze] = useState();


    useEffect(() => {
        APIServise.getOrders().then(respons => {
            setOrders(respons.data)
        });
        APIServise.getAnalyze().then(respons => {
            setAnalyze(respons.data)
        });
    }, []);


    return(
        <div>
            <h2>Отчёты</h2>

            <h4>График прибыли по месяцам</h4>
                <Analys_profit analyze={analyze}/>


            <h4>График статусов по суммах заказов</h4>
                <Analys_status_order data={orders}/>
        </div>

    );
}
