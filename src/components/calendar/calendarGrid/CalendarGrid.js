import moment from 'moment'
import React from 'react';

import {
    CellWrapper,
    CurrentDay,
    DayWrapper,
    EventItemWrapper,
    EventListWrapper,
    GridWrapper,
    RowInCell,
    ShowDayWrapper
} from "../CalendarCSS";
import {getFindEventInRow} from "../../../servises";
import {WORD_DAY, WORD_MONTH} from "../../../config/wordsConstants";

const CalendarGrid = ({startDay, today, totalDays, events, openFormHandler, setTime}) => {

    const isCurrentDay = (day) => moment().isSame(day, WORD_DAY);
    const isSelectedMonth = (month) => today.isSame(month, WORD_MONTH);

    const day = startDay.clone().subtract(1, WORD_DAY);
    const daysArray = [...Array(totalDays)].map(() => day.add(1, WORD_DAY).clone());

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
                            openFormHandler(dayItem.format('DD.MM.YYYY'), dayItem.unix(), moment().unix());
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
                                        events.filter(event => event.date >= dayItem.format('X') && event.date <= dayItem.clone().endOf(WORD_DAY).format('X'))
                                            .map(event => (
                                                <div key={event.id}>
                                                    <EventItemWrapper>
                                                        {event.title} {event.time}
                                                    </EventItemWrapper>
                                                </div>
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
