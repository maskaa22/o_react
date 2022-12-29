import './Records.css';
import './Records@media.css';

import * as React from "react";
import moment from "moment";
import 'moment/locale/uk';
import {useEffect, useState} from "react";
import {prevHandler, todayHandler, nextHandler} from "../utils/function";
import {getCalendarEvent} from "../servises/API";
import {Record} from "../record";
import {WORD_LANGUAGE, WORD_MONTH} from "../../config/wordsConstants";

export function Records ()
{

    moment.updateLocale(WORD_LANGUAGE, {week: {dow: 1}});

    const [today, setToday] = useState(moment());
    const [events, setEvents] = useState([]);

    const startMonth = today.clone().startOf(WORD_MONTH).format('X');
    const endMonth = today.clone().endOf(WORD_MONTH).format('X');


    useEffect(() => {
        getCalendarEvent(startMonth, endMonth).then(rez => {
            setEvents(rez)
        })
    }, [today]);

    return(
        <div>
            <h2 >Записи за місяць - <span className={'capitalize'}>{today.format('MMMM')}</span></h2>

            <div className={'flex-fot-content'}>
                <div className={'centric'}>
                    <div className={'client-records'}>
                        <button  className={'btn_analyz btn-fond-size margin-minus'} onClick={() => prevHandler(setToday)}>Назад</button>
                        <button  className={'btn_analyz btn-fond-size margin-minus'} onClick={() => todayHandler(setToday)}>Сьогодення</button>
                        <button className={'btn_analyz btn-fond-size margin-minus'} onClick={() => nextHandler(setToday)}>Вперед</button>
                    </div>
                </div>
            </div>

            <div className={'center-table'}>
                <div className={'user-table'}>
                    <div className={'name-table records'}>
                        <div className={'cell-table-records-name header-table first-record-name'}>Ім'я</div>
                        <div className={'cell-table-records-name header-table name-type position-relative'}>Тип</div>
                        <div className={'cell-table-records-name header-table name-date position-relative'}>Дата(число)</div>
                        <div className={'cell-table-records-name header-table'}>Час</div>
                    </div>
                    {
                        events.map(event => <Record event={event} key={event._id}/>)
                    }
                </div>

            </div>
        </div>
    );
}
