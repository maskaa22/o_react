import * as React from "react";
import {useEffect, useState} from "react";
import moment from 'moment'
import 'moment/locale/uk';

import {endDateQuery, nextHandler, prevHandler, startDateQuery, todayHandler, totalDays} from "../utils/function";
import {CalendarGrid} from "./calendarGrid";
import {CalendarMonitor} from "./calendarMonitor";
import {CalendarWrapper, ShadowWrapper} from "./CalendarCSS";
import {createCalendarEvent, getCalendarEvent} from "../servises/API";
import {ModalUser} from "../modal";
import {WORD_MONTH, WORD_WEEK} from "../../config/wordsConstants";
import {useSelector} from "react-redux";

export function Calendar() {

    moment.updateLocale('uk', {week: {dow: 1}});

    const [today, setToday] = useState(moment());
    const [events, setEvents] = useState([]);
    const [date, setDate] = useState('');
    const [unix, setUnix] = useState('');
    const [time, setTime] = useState([]);

    const [openWindow, setOpenWindow] = React.useState(false);
    const handleClose = () => setOpenWindow(false);

    const isAuth = useSelector(state => state.user.isAuth);


    const startDay = today.clone().startOf(WORD_MONTH).startOf(WORD_WEEK);

    useEffect(() => {
        getCalendarEvent(startDateQuery(startDay), endDateQuery(startDay)).then(rez => {
            setEvents(rez)
        });
    }, [today]);

    const openFormHandler = (todayDate, unixDate) => {
        setDate(todayDate);
        setUnix(unixDate);
        setOpenWindow(true);
    };

    const eventCreateHandler = (title, date, description, time, id) => {
        createCalendarEvent(title, date, description, time, id).then(rez => {
            setEvents(prevState => [...prevState, rez]);
            handleClose()
        });
    };

    return (
        <>
            {
                isAuth ? <ModalUser openWindow={openWindow} handleClose={handleClose} calendar={'calendar'} date={date}
                                     eventCreateHandler={eventCreateHandler} unix={unix} time={time}/> :
                    <ModalUser openWindow={openWindow} handleClose={handleClose} register/>
            }


            <CalendarWrapper>
                <ShadowWrapper>
                    <CalendarMonitor today={today} prevHandler={() => prevHandler(setToday)}
                                     todayHandler={() => todayHandler(setToday)}
                                     nextHandler={() => nextHandler(setToday)}/>
                    <CalendarGrid startDay={startDay} today={today} totalDays={totalDays} events={events}
                                  openFormHandler={openFormHandler} setTime={setTime}/>
                </ShadowWrapper>
            </CalendarWrapper>
        </>

    );
}
