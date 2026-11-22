import {Axis, Chart, Geom, Tooltip} from "bizcharts";
import React from "react";

import './Analyze.css';
import './Analyze@media.css';

export function AnalysProfit({analyze}) {

    const scale = {
        summa: {
            min: 0
        }
    };

    return (
        <div className={'analyze'}>
            <Chart height={400} scale={scale} autoFit data={analyze}>
                <Axis name="month"
                      label={{
                          style: {
                              fontSize: 20,
                              fill: '#2c1203',
                              fontWeight: 'bold',
                          }
                      }}/>
                <Axis name="summa"
                      label={{
                          formatter: val => `${val} грн.`,
                          style: {
                              fontSize: 20,
                              fill: '#2c1203',
                              fontWeight: 'bold',
                          }
                      }}/>
                <Tooltip shared/>
                <Geom type="line" position="month*summa" color="#2c1203" size={2} shape="smooth"/>
                <Geom type="point" position="month*summa" color="#2c1203" size={4} shape="circle"/>
            </Chart>
        </div>
    );
}
