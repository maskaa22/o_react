import * as React from "react";
import {useEffect, useState} from "react";

import './Analyze.css';
import './Analyze@media.css';
import {AnalysProfit} from "./AnalysProfit";
import {AnalysStatusOrder} from "./AnalysStatusOrder";
import {getUsersAnalyze, getAnalyze} from "../../servises";
import {ELSXFunction} from "../../utils/function";

export function Analysis() {

    const [analyze, setAnalyze] = useState();
    const [users, setUsers] = useState();

    useEffect(() => {
        getAnalyze().then(respons => {
            setAnalyze(respons.data);
        });
        getUsersAnalyze().then(respons => {
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
            <AnalysProfit analyze={analyze}/>
            <h4 className={'analyz-h4'}>Графік кількості зареєструвань на сайті по місяцях</h4>
            <div className={'div_btn_analyz'}>
                <button className={'btn_analyz btn-fond-size'}
                        onClick={() => ELSXFunction(HeadingUsers, users, 'Звіт по користувачах.xlsx')}>Експортувати
                    графік в EXEL
                </button>
            </div>
            <AnalysStatusOrder data={users}/>
        </div>
    );
}
