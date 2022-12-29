import * as React from "react";
import {Chart, Geom, Tooltip} from "bizcharts";

import './Analyze.css';
import './Analyze@media.css';

export function Analys_status_order({data}) {
    return (
        <div className={'analyze'}>
            <Chart  height={300} data={data} autoFit>
                <Tooltip/>
                <Geom type="interval" position="status*summa" color="status"/>
            </Chart>
        </div>
    );
}
