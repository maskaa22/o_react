import moment from 'moment'
import 'moment/locale/uk';
import styled from 'styled-components';



import {CalendarMonitor} from "./calendarMonitor";
import {CalendarGrid} from "./calendarGrid";
import {useEffect, useState} from "react";
import {createCalendarEvent, getCalendarEvent} from "../servises/API";
import * as React from "react";
import {ModalUser} from "../modal";
import {prevHandler, todayHandler, nextHandler, startDateQuery, endDateQuery, totalDays} from "../utils/function";
import {CalendarWrapper, ShadowWrapper} from "./CalendarCSS";

export function Calendar() {

    moment.updateLocale('uk', {week: {dow: 1}});

    const [today, setToday] = useState(moment());
    const [events, setEvents] = useState([]);
    const [date, setDate] = useState('');
    const [unix, setUnix] = useState('');
    const [time, setTime] = useState([]);

    const [openWindow, setOpenWindow] = React.useState(false);
    const handleClose = () => setOpenWindow(false);

    const startDay = today.clone().startOf('month').startOf('week');

    useEffect(() => {
        getCalendarEvent(startDateQuery(startDay),endDateQuery(startDay)).then(rez => {
            setEvents(rez)
        })
    }, [today]);

    const openFormHandler = (todayDate, unixDate) => {
        setDate(todayDate);
        setUnix(unixDate)
        setOpenWindow(true);
    }
    const eventCreateHandler = (title, date, description, time) => {
         createCalendarEvent(title, date, description, time).then(rez => {
             setEvents(prevState => [...prevState, rez]);
             handleClose()
         });
    }

    return (
        <>
            <ModalUser openWindow={openWindow} handleClose={handleClose} calendar={'calendar'} date={date} eventCreateHandler={eventCreateHandler} unix={unix} time={time}/>
            <CalendarWrapper>
                <ShadowWrapper>
                    <CalendarMonitor today={today} prevHandler={() => prevHandler(setToday)} todayHandler={() => todayHandler(setToday)} nextHandler={() => nextHandler(setToday)}/>
                    <CalendarGrid startDay={startDay} today={today} totalDays={totalDays} events={events} openFormHandler={openFormHandler} setTime={setTime}/>
                </ShadowWrapper>
            </CalendarWrapper>
        </>

    );
}
