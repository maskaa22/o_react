import React from 'react';
import styled from 'styled-components';
import {GrFormPrevious, GrFormNext} from "react-icons/gr";

import './CalendarMonitor.css'
import {ButtonsWrapper, DivWrapper, TextWrapper, TitleWrapper} from "../CalendarCSS";


const CalendarMonitor = ({today, prevHandler, todayHandler, nextHandler}) => {
    return (
        <DivWrapper>
            <div>
                <TitleWrapper>{today.format('MMMM')}</TitleWrapper>
                <TextWrapper>{today.format('YYYY')}</TextWrapper>
            </div>
            <ButtonsWrapper>
                <button onClick={prevHandler}><GrFormPrevious className=" icon_basket white"/></button>
                <button onClick={todayHandler}>Зараз</button>
                <button onClick={nextHandler}><GrFormNext className=" icon_basket white"/></button>
            </ButtonsWrapper>
        </DivWrapper>
    )
};

export {CalendarMonitor}
