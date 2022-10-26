import * as React from "react";
import {Chart, Geom, Legend, Tooltip} from "bizcharts";

import './Analyze.css'

export function Analys_status_order({data}) {
    return (
        <div className={'analyze'}>
            <Chart width={600} height={400} data={data}>
                <Legend position="top" dy={-20}/>
                <Tooltip/>
                <Geom type="interval" position="status*summa" color="status"/>
            </Chart>
        </div>
    );
}
