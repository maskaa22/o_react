import {useState} from "react";
import moment from "moment";
import 'moment/locale/uk';


moment.updateLocale('uk', {week: {dow: 1}});
export const totalDays = 42;

export const prevHandler = (setToday) => {
    setToday(prev => prev.clone().subtract(1, 'month'));
    return setToday;
};
export const todayHandler = (setToday) => {
    setToday(moment());
    return setToday;
};
export const nextHandler = (setToday) => {
    setToday(prev => prev.clone().add(1, 'month'));
    return setToday;


};

export const startDateQuery = (startDay) => startDay.clone().format('X');
export const endDateQuery = (startDay) => startDay.clone().add(totalDays, 'days').format('X');

