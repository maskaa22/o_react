import * as React from "react";
import {useEffect, useState} from "react";

import './Analyze.css';
import './Analyze@media.css';
import {Analys_profit} from "./Analys_profit";
import {Analys_status_order} from "./Analys_status_order";
import {APIServise} from "../servises";
import {ELSXFunction} from "../utils/function";

export function Analysis() {

    const [analyze, setAnalyze] = useState();
    const [users, setUsers] = useState();

    useEffect(() => {
        APIServise.getAnalyze().then(respons => {
            setAnalyze(respons.data);
        });
        APIServise.getUsersAnalyze().then(respons => {
            setUsers(respons.data);
        });
    }, []);

    const HeadingAnalyze = [
        {
            month: "Місяць",
            summa: "Сума"
        }
    ];
    const HeadingUsers = [
        {
            count: "Кількість",
            month: "Місяць"
        }
    ];

    return (
        <div>
            <h2 className={'analyz-h2'}>Звіти</h2>
            <h4 className={'analyz-h4 first-analyz'}>Графік прибутку по місяцях</h4>
            <div className={'div_btn_analyz'}>
                <button className={'btn_analyz btn-fond-size'}
                        onClick={() => ELSXFunction(HeadingAnalyze, analyze, 'Звіт прибутку.xlsx')}>Експортувати
                    прибутки в EXEL
                </button>
            </div>
            <Analys_profit analyze={analyze}/>
            <h4 className={'analyz-h4'}>Графік кількості зареєструвань на сайті по місяцях</h4>
            <div className={'div_btn_analyz'}>
                <button className={'btn_analyz btn-fond-size'}
                        onClick={() => ELSXFunction(HeadingUsers, users, 'Звіт по користувачах.xlsx')}>Експортувати
                    статуси в EXEL
                </button>
            </div>
            <Analys_status_order data={users}/>
        </div>
    );
}
