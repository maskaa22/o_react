import * as React from "react";
import {Axis, Chart, Geom, Legend, Tooltip} from "bizcharts";

import './Analyze.css';
import './Analyze@media.css';

export function Analys_status_order({data}) {

    const scale = {
        count: {
            min: 0
        }
    };

    return (
        <div className={'analyze margin-for-last'}>
            <Chart height={300} data={data} autoFit scale={scale}>
                <Axis name="month"
                      label={{
                          style: {
                              fontSize: 20,
                              fill: '#47008e',
                              fontWeight: 'bold',
                          }
                      }}/>
                <Axis name="count"
                      label={{
                          style: {
                              fontSize: 20,
                              fill: '#47008e',
                              fontWeight: 'bold',
                          }
                      }}/>
                <Tooltip visible={false}/>
                <Legend name="count" visible={false}/>
                <Legend name="month" visible={true}
                        itemName={{
                            spacing: 10,
                            style: {
                                fill: "#47008e",
                                fontSize: 18,
                                fontWeight: 'bold'
                            }
                        }}
                />
                <Geom type="interval" position="month*count" color="month"/>
            </Chart>
        </div>
    );
}
