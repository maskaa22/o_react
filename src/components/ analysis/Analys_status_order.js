import * as React from "react";
import {Axis, Chart, Geom, Interval, Legend, Tooltip} from "bizcharts";

import './Analyze.css'

export function Analys_status_order({data}) {
    return (
        <div className={'analyze'}>
            <Chart  height={300} data={data} autoFit>
                {/*<Legend position="top" dy={-40}/>*/}
                <Tooltip/>
                <Geom type="interval" position="status*summa" color="status"/>
            </Chart>
            {/*<Chart height={400} padding="auto" data={data} autoFit>*/}
            {/*    <Interval*/}
            {/*        adjust={[*/}
            {/*            {*/}
            {/*                type: "dodge"*/}
            {/*            }*/}
            {/*        ]}*/}
            {/*        color="status"*/}
            {/*        position="status*summa"*/}
            {/*    />*/}
            {/*    <Tooltip shared />*/}
            {/*</Chart>*/}
        </div>
    );
}
