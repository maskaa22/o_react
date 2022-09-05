import {Chart, Coord, Geom, Legend, Tooltip} from "bizcharts";
import * as React from "react";

export function Analys_sel_for_kategory ()
{

    const data = [
        {
            year: "2001",
            population: 41.8
        },

        {
            year: "2002",
            population: 38
        },
        {
            year: "2003",
            population: 33.7
        },
        {
            year: "2001",
            population: 10
        },
        {
            year: "2004",
            population: 30.7
        },
        {
            year: "2005",
            population: 25.8
        },
        {
            year: "2006",
            population: 31.7
        },
        {
            year: "2007",
            population: 33
        },
        {
            year: "2008",
            population: 46
        }
    ];
    return(
        <div>
            <Chart width={600} height={400} data={data} >
                <Coord type="polar" innerRadius={0.3} />
                <Tooltip />
                <Geom type="interval" position="year*population" color="year" />
            </Chart>
        </div>
    );
}

