import {Axis, Chart, Geom, Tooltip} from "bizcharts";
import React from "react";

// Старі стилі лишаються підключеними: їхнє глобальне правило для h4 і досі діє на інші сторінки
import './Analyze.css';
import './Analyze@media.css';

// Діаграма малюється на canvas, тому змінні CSS (var(--hm-…)) тут не працюють — кольори прописані літералами.
// Це коричнева палітра сайту (#2c1203) і акцент; якщо змінюватимеш акцент на золотий, зміни ACCENT нижче.
const INK = '#2c1203';
const INK_SOFT = '#5a4637';
const ACCENT = '#79cbb8';
const GRID = '#eadfd3';

const axisLabel = {
    style: {
        fontSize: 13,
        fill: INK_SOFT,
        fontWeight: 600
    }
};

const gridStyle = {
    line: {
        style: {
            stroke: GRID,
            lineDash: [4, 4]
        }
    }
};

/*
 * Графік прибутку по місяцях: лінія з точками. Дані (analyze) — масив {month, summa}, як і були.
 */
export function AnalysProfit({analyze}) {

    const scale = {
        summa: {
            min: 0,
            nice: true
        }
    };

    return (
        <div className={'an-chart'}>
            <Chart height={340} scale={scale} autoFit data={analyze} padding={'auto'}>
                <Axis name="month" label={axisLabel} line={{style: {stroke: GRID}}} tickLine={null}/>
                <Axis name="summa" grid={gridStyle}
                      label={{...axisLabel, formatter: val => `${val} грн.`}}/>
                <Tooltip shared/>
                <Geom type="line" position="month*summa" color={INK} size={3} shape="smooth"/>
                <Geom type="point" position="month*summa" color={ACCENT} size={6} shape="circle"
                      style={{stroke: INK, lineWidth: 2}}/>
            </Chart>
        </div>
    );
}
