import * as React from "react";
import {useEffect, useState} from "react";
import {FaRegCalendarAlt} from "react-icons/fa";
import moment from "moment";
import 'moment/locale/uk';

import './Records.css';
import './Records@media.css';
import '../admin/AdminPagesModern.css';
import {getCalendarEvent} from "../../servises";
import {nextHandler, prevHandler, todayHandler} from "../../utils/function";
import {WORD_LANGUAGE, WORD_LOCALES, WORD_MONTH} from "../../config/wordsConstants";

export function Records() {

    moment.updateLocale(WORD_LANGUAGE, {week: {dow: 1}});

    const [events, setEvents] = useState([]);
    const [today, setToday] = useState(moment());

    const startMonth = today.clone().startOf(WORD_MONTH).format('X');
    const endMonth = today.clone().endOf(WORD_MONTH).format('X');

    useEffect(() => {
        getCalendarEvent(startMonth, endMonth).then(rez => {
            // при помилці запиту rez порожній — не даємо сторінці впасти
            setEvents(Array.isArray(rez) ? rez : []);
        });
    }, [today, startMonth, endMonth]);

    // Записи за місяць у хронологічному порядку (за датою, потім за часом)
    const sorted = [...events].sort((a, b) => a.date - b.date || String(a.time).localeCompare(String(b.time)));

    return (
        <section className={'adm'}>
            <header className={'adm-head'}>
                <div className={'adm-head__title'}>
                    <h2 className={'adm-title'}>
                        Записи за місяць — <span className={'capitalize'}>{today.format('MMMM')}</span>
                        <small>{today.format('YYYY')}</small>
                    </h2>
                    {events.length !== 0 && <span className={'adm-count'}>{events.length}</span>}
                </div>
                <div className={'adm-pager'} role={'group'} aria-label={'Перемикач місяців'}>
                    <button type={'button'} className={'adm-btn'} onClick={() => prevHandler(setToday)}>Назад</button>
                    <button type={'button'} className={'adm-btn adm-btn--current'}
                            onClick={() => todayHandler(setToday)}>Сьогодні
                    </button>
                    <button type={'button'} className={'adm-btn'} onClick={() => nextHandler(setToday)}>Вперед</button>
                </div>
            </header>

            <div className={'adm-card'}>
                {sorted.length !== 0 ?
                    <div className={'adm-scroll'}>
                        <table className={'adm-table'}>
                            <thead>
                            <tr>
                                <th scope={'col'}>Ім'я</th>
                                <th scope={'col'}>Тип</th>
                                <th scope={'col'}>Дата</th>
                                <th scope={'col'}>Час</th>
                            </tr>
                            </thead>
                            <tbody>
                            {sorted.map(event => {
                                // event.date — час у секундах (unix), тому множимо на 1000
                                const date = new Date(event.date * 1000);

                                return (
                                    <tr key={event._id}>
                                        <td data-label={"Ім'я"} className={'adm-cell--strong'}>{event.title}</td>
                                        <td data-label={'Тип'}>{event.description}</td>
                                        <td data-label={'Дата'} className={'adm-cell--num'}>
                                            {date.toLocaleDateString(WORD_LOCALES, {weekday: 'short', day: 'numeric'})}
                                        </td>
                                        <td data-label={'Час'} className={'adm-cell--num'}>
                                            <span className={'adm-time'}>{event.time}</span>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div> :
                    <div className={'adm-empty'}>
                        <span className={'adm-empty__icon'}><FaRegCalendarAlt aria-hidden={'true'}/></span>
                        <h3>У цьому місяці записів немає</h3>
                        <p>Спробуйте перемкнути місяць кнопками «Назад» і «Вперед».</p>
                    </div>
                }
            </div>
        </section>
    );
}
