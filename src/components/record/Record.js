import * as React from "react";
import {WORD_LOCALES, WORD_OPTIONS} from "../../config/wordsConstants";

export function Record({event, user}) {

    const date = new Date((event.date) * 1000);


    return (
        <div className={'name-table row-table records'}>
            {
                !user ? <div className={'cell-table-records'}>{event.title}</div> :
                <div className={'cell-table-records'}>{date.toLocaleDateString(WORD_LOCALES, {month: WORD_OPTIONS})}</div>
            }
            <div className={'cell-table-records'}>{event.description}</div>
            <div className={'cell-table-records'}>{date.getDate()}</div>
            <div className={'cell-table-records'}>{event.time}</div>
        </div>
    );
}
