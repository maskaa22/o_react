import * as React from "react";
import {Axis, Chart, Geom, Tooltip} from "bizcharts";

// Старі стилі лишаються підключеними: їхнє глобальне правило для h4 і досі діє на інші сторінки
import './Analyze.css';
import './Analyze@media.css';

// Діаграма малюється на canvas, тому змінні CSS тут не працюють — кольори прописані літералами
// (коричнева палітра сайту). Див. також коментар у AnalysProfit.js.
const INK = '#2c1203';
const INK_SOFT = '#5a4637';
const GRID = '#eadfd3';

const axisLabel = {
    style: {
        fontSize: 13,
        fill: INK_SOFT,
        fontWeight: 600
    }
};

/*
 * Графік кількості реєстрацій по місяцях: стовпчики одного кольору. Раніше кожен місяць мав свій колір зі
 * стандартної палітри бібліотеки й окрему легенду з назвами місяців, але місяці й так підписані внизу.
 * Дані (data) — масив {month, count}, як і були.
 */
export function AnalysStatusOrder({data}) {

    const scale = {
        count: {
            min: 0,
            nice: true,
            tickInterval: 1
        }
    };

    return (
        <div className={'an-chart'}>
            <Chart height={300} data={data} autoFit scale={scale} padding={'auto'}>
                <Axis name="month" label={axisLabel} line={{style: {stroke: GRID}}} tickLine={null}/>
                <Axis name="count" label={axisLabel}
                      grid={{line: {style: {stroke: GRID, lineDash: [4, 4]}}}}/>
                <Tooltip/>
                <Geom type="interval" position="month*count" color={INK} size={28}
                      style={{radius: [6, 6, 0, 0]}}/>
            </Chart>
        </div>
    );
}
