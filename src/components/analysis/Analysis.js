import * as React from "react";
import {useEffect, useState} from "react";
import {FaCoins, FaFileExcel, FaTrophy, FaUserPlus} from "react-icons/fa";

import './Analyze.css';
import './Analyze@media.css';
import '../admin/AdminPagesModern.css';
import './AnalysisModern.css';
import {AnalysProfit} from "./AnalysProfit";
import {AnalysStatusOrder} from "./AnalysStatusOrder";
import {getUsersAnalyze, getAnalyze} from "../../servises";
import {ELSXFunction} from "../../utils/function";
import priceFormatter from "../../utils/priceFormatter/priceFormatter";

export function Analysis() {

    const [analyze, setAnalyze] = useState();
    const [users, setUsers] = useState();

    useEffect(() => {
        getAnalyze().then(respons => {
            // при помилці запиту respons порожній — не даємо сторінці впасти
            if (respons) {
                setAnalyze(respons.data);
            }
        });
        getUsersAnalyze().then(respons => {
            if (respons) {
                setUsers(respons.data);
            }
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

    const profit = Array.isArray(analyze) ? analyze : [];
    const registrations = Array.isArray(users) ? users : [];

    // Підсумки рахуються з тих самих даних, що йдуть на графіки, нічого не вигадується
    const totalProfit = profit.reduce((sum, row) => sum + (Number(row.summa) || 0), 0);
    const totalUsers = registrations.reduce((sum, row) => sum + (Number(row.count) || 0), 0);
    const bestMonth = profit.reduce((best, row) =>
        (!best || Number(row.summa) > Number(best.summa)) ? row : best, null);

    return (
        <section className={'adm'}>
            <header className={'adm-head'}>
                <div className={'adm-head__title'}>
                    <h2 className={'adm-title'}>Звіти</h2>
                </div>
            </header>

            <div className={'an-kpis'}>
                <div className={'an-kpi'}>
                    <span className={'an-kpi__icon'}><FaCoins aria-hidden={'true'}/></span>
                    <div>
                        <span className={'an-kpi__label'}>Загальний прибуток</span>
                        <strong className={'an-kpi__value'}>{priceFormatter.format(totalProfit)} грн.</strong>
                    </div>
                </div>
                <div className={'an-kpi'}>
                    <span className={'an-kpi__icon'}><FaTrophy aria-hidden={'true'}/></span>
                    <div>
                        <span className={'an-kpi__label'}>Найкращий місяць</span>
                        <strong className={'an-kpi__value an-kpi__value--month'}>
                            {bestMonth ? bestMonth.month : '—'}
                        </strong>
                    </div>
                </div>
                <div className={'an-kpi'}>
                    <span className={'an-kpi__icon'}><FaUserPlus aria-hidden={'true'}/></span>
                    <div>
                        <span className={'an-kpi__label'}>Нових клієнтів</span>
                        <strong className={'an-kpi__value'}>{totalUsers}</strong>
                    </div>
                </div>
            </div>

            <div className={'an-card'}>
                <header className={'an-card__head'}>
                    <h3 className={'an-card__title'}>Прибуток по місяцях</h3>
                    <button type={'button'} className={'adm-btn adm-btn--ghost'} disabled={profit.length === 0}
                            onClick={() => ELSXFunction(HeadingAnalyze, analyze, 'Звіт прибутку.xlsx')}>
                        <FaFileExcel aria-hidden={'true'}/> Експорт в Excel
                    </button>
                </header>
                {profit.length !== 0 ?
                    <AnalysProfit analyze={analyze}/> :
                    <p className={'an-empty'}>Даних про прибуток поки немає.</p>}
            </div>

            <div className={'an-card'}>
                <header className={'an-card__head'}>
                    <h3 className={'an-card__title'}>Реєстрації на сайті по місяцях</h3>
                    <button type={'button'} className={'adm-btn adm-btn--ghost'} disabled={registrations.length === 0}
                            onClick={() => ELSXFunction(HeadingUsers, users, 'Звіт по користувачах.xlsx')}>
                        <FaFileExcel aria-hidden={'true'}/> Експорт в Excel
                    </button>
                </header>
                {registrations.length !== 0 ?
                    <AnalysStatusOrder data={users}/> :
                    <p className={'an-empty'}>Даних про реєстрації поки немає.</p>}
            </div>
        </section>
    );
}
