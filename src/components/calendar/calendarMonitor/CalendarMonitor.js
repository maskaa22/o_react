import {GrFormNext, GrFormPrevious} from "react-icons/gr";
import {MdToday} from "react-icons/md";
import React from 'react';

import './CalendarMonitor.css'
import {ButtonsWrapper, DivWrapper, TextWrapper, TitleWrapper} from "../CalendarCSS";


const CalendarMonitor = ({today, prevHandler, todayHandler, nextHandler}) => {
    return (
        <DivWrapper>
            <div>
                <TitleWrapper id={'calendar'}>{today.format('MMMM')}</TitleWrapper>
                <TextWrapper>{today.format('YYYY')}</TextWrapper>
            </div>
            <ButtonsWrapper>
                <button className={'button-calendar'} onClick={prevHandler}><GrFormPrevious className=" icon-monitor"/>
                </button>
                <button className={'button-calendar'} onClick={todayHandler}><MdToday className=" icon-monitor"/>
                </button>
                <button className={'button-calendar'} onClick={nextHandler}><GrFormNext className=" icon-monitor"/>
                </button>
            </ButtonsWrapper>
        </DivWrapper>
    )
};

export {CalendarMonitor};
