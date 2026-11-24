import {FaChevronLeft, FaChevronRight} from "react-icons/fa";
import React from 'react';

import './CalendarMonitor.css';
import {ButtonsWrapper, DivWrapper, TextWrapper, TitleWrapper} from "../CalendarCSS";


const CalendarMonitor = ({today, prevHandler, todayHandler, nextHandler}) => {

    return (
        <DivWrapper>
            <div>
                <TitleWrapper id={'calendar'}>{today.format('MMMM')}</TitleWrapper>
                <TextWrapper>{today.format('YYYY')}</TextWrapper>
            </div>
            <ButtonsWrapper>
                <button className={'button-calendar button-calendar--icon'} onClick={prevHandler}
                        aria-label={'Попередній місяць'}>
                    <FaChevronLeft/>
                </button>
                <button className={'button-calendar button-calendar--today'} onClick={todayHandler}>
                    Сьогодні
                </button>
                <button className={'button-calendar button-calendar--icon'} onClick={nextHandler}
                        aria-label={'Наступний місяць'}>
                    <FaChevronRight/>
                </button>
            </ButtonsWrapper>
        </DivWrapper>
    )
};

export {CalendarMonitor};
