import moment from "moment";
import 'moment/locale/uk';

import {WORD_DAY, WORD_LANGUAGE, WORD_MONTH} from "../../../config/wordsConstants";

moment.updateLocale(WORD_LANGUAGE, {week: {dow: 1}});

export const totalDays = 42;

export const prevHandler = (setToday) => {
    setToday(prev => prev.clone().subtract(1, WORD_MONTH));
    return setToday;
};

export const todayHandler = (setToday) => {
    setToday(moment());
    return setToday;
};

export const nextHandler = (setToday) => {
    setToday(prev => prev.clone().add(1, WORD_MONTH));
    return setToday;
};

export const startDateQuery = (startDay) => startDay.clone().format('X');

export const endDateQuery = (startDay) => startDay.clone().add(totalDays, WORD_DAY).format('X');

