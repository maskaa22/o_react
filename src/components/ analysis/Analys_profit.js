import {Chart, Line, Point, Tooltip} from "bizcharts";
import React from "react";

import './Analyze.css'

export function Analys_profit({analyze}) {
    return (
        <div className={'analyze'}>
            <Chart autoFit height={400} data={analyze}>
                <Line
                    color={'#47008e'}
                    position="month*summa"
                />
                <Point color={'#47008e'} position="month*summa"/>
                <Tooltip showCrosshairs lock/>
            </Chart>

        </div>
    );
}
