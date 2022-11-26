import React from 'react';
import styled from 'styled-components';
import {GrFormPrevious, GrFormNext} from "react-icons/gr";
import {MdToday} from "react-icons/md";

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
                <button onClick={prevHandler}><GrFormPrevious className=" icon-monitor"/></button>
                <button onClick={todayHandler}><MdToday className=" icon-monitor"/></button>
                <button onClick={nextHandler}><GrFormNext className=" icon-monitor"/></button>
            </ButtonsWrapper>
        </DivWrapper>
    )
};

export {CalendarMonitor}
