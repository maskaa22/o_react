import React from 'react';
import styled from 'styled-components';
import moment from 'moment'


import {getFindEventInRow} from "../../servises/API";
import {
    CellWrapper,
    CurrentDay,
    DayWrapper, EventItemWrapper,
    EventListWrapper,
    GridWrapper,
    RowInCell,
    ShowDayWrapper
} from "../CalendarCSS";


const CalendarGrid = ({startDay, today, totalDays, events, openFormHandler, setTime}) => {

    const isCurrentDay = (day) => moment().isSame(day, 'day');
    const isSelectedMonth = (month) => today.isSame(month, 'month');

    const day = startDay.clone().subtract(1, 'day');
    const daysArray = [...Array(totalDays)].map(() => day.add(1, 'day').clone());

    return (
        <>
            <GridWrapper isHeader>
                {[...Array(7)].map((_, i) => (
                    <CellWrapper isHeader isSelectedMonth key={i}>
                        <RowInCell isMarging>
                            {moment().day(i + 1).format('ddd')}
                        </RowInCell>
                    </CellWrapper>
                ))}
            </GridWrapper>
            <GridWrapper>
                {
                    daysArray.map((dayItem) => (
                        <CellWrapper isBody
                            key={dayItem.unix()} isWeekend={dayItem.day() === 6 || dayItem.day() === 0}
                            isSelectedMonth={isSelectedMonth(dayItem)} onClick={() => {
                            getFindEventInRow(dayItem.unix()).then(res => setTime(res));
                            openFormHandler(dayItem.format('DD.MM.YYYY'), dayItem.unix())
                            }}>
                            <RowInCell>
                                <ShowDayWrapper>
                                    <DayWrapper>
                                        {!isCurrentDay(dayItem) ? dayItem.format('D') :
                                            <CurrentDay>{dayItem.format('D')}</CurrentDay>}
                                    </DayWrapper>
                                </ShowDayWrapper>
                                <EventListWrapper>
                                    {
                                        events.filter(event => event.date >= dayItem.format('X') && event.date <= dayItem.clone().endOf('day').format('X'))
                                            .map(event => (
                                                <li key={event.id}>
                                                    <EventItemWrapper>
                                                        {event.title} {event.time}
                                                    </EventItemWrapper>
                                                </li>
                                            ))
                                    }
                                </EventListWrapper>
                            </RowInCell>
                        </CellWrapper>
                    ))
                }
            </GridWrapper>
        </>
    )
};

export {CalendarGrid};
