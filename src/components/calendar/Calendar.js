import * as React from "react";
import {useEffect, useState} from "react";
import moment from 'moment';
import 'moment/locale/uk';
import {useSelector} from "react-redux";

import {CalendarWrapper, ShadowWrapper} from "./CalendarCSS";
import {CalendarGrid} from "./calendarGrid";
import {CalendarMonitor} from "./calendarMonitor";
import {createCalendarEvent, getCalendarEvent} from "../servises";
import {endDateQuery, nextHandler, prevHandler, startDateQuery, todayHandler, totalDays} from "../utils/function";
import {ModalUser} from "../modal";
import {WORD_CALENDAR, WORD_MONTH, WORD_WEEK, WORLD_UK, WORLD_USER} from "../../config/wordsConstants";

export function Calendar() {

    moment.updateLocale(WORLD_UK, {week: {dow: 1}});

    const [events, setEvents] = useState([]);
    const [date, setDate] = useState('');
    const [time, setTime] = useState([]);
    const [today, setToday] = useState(moment());
    const [unix, setUnix] = useState('');
    const [openWindow, setOpenWindow] = React.useState(false);

    const handleClose = () => setOpenWindow(false);

    const isAuth = useSelector(state => state.user.isAuth);
    const role = useSelector(state => state.user.role);

    const startDay = today.clone().startOf(WORD_MONTH).startOf(WORD_WEEK);

    useEffect(() => {
        getCalendarEvent(startDateQuery(startDay), endDateQuery(startDay)).then(rez => {
            setEvents(rez);
        });
    }, [today, startDay]);

    const openFormHandler = (todayDate, unixDate, now) => {
        setDate(todayDate);
        setUnix(unixDate);

        if(unixDate > now) {
            setOpenWindow(true);
        }
    };

    const eventCreateHandler = (title, date, description, time, id) => {
        createCalendarEvent(title, date, description, time, id).then(rez => {
            if (rez) {
                setEvents(prevState => [...prevState, rez]);
            }
            handleClose();
        });
    };

    return (
        <>
            {
                (isAuth && role === WORLD_USER) &&
                <ModalUser openWindow={openWindow} handleClose={handleClose} calendar={WORD_CALENDAR} date={date}
                           eventCreateHandler={eventCreateHandler} unix={unix} time={time}/>
            }
            {
                !isAuth && <ModalUser openWindow={openWindow} handleClose={handleClose} register/>
            }
            <CalendarWrapper>
                <ShadowWrapper>
                    <CalendarMonitor today={today} prevHandler={() => prevHandler(setToday)}
                                     todayHandler={() => todayHandler(setToday)}
                                     nextHandler={() => nextHandler(setToday)}/>
                    <CalendarGrid startDay={startDay} today={today} totalDays={totalDays} events={events}
                                  openFormHandler={openFormHandler} setTime={setTime} />
                </ShadowWrapper>
            </CalendarWrapper>
        </>
    );
}
