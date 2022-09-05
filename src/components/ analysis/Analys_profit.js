import React from "react";
import {Axis, Chart, Geom, Line, Point, Tooltip} from "bizcharts";
import './Analyze.css'

export  function Analys_profit ({analyze})
{

    return(
        <div className={'analyze'}>
            <Chart  autoFit height={400} data={analyze}>
                <Line
                    position="month*summa"
                />
                <Point position="month*summa" />
                <Tooltip showCrosshairs lock />
            </Chart>

        </div>
    );
}
