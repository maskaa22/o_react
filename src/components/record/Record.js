import * as React from "react";

export function Record({event}) {

    const date = new Date((event.date) * 1000);

    return (
        <div className={'name-table row-table records'}>
            <div className={'cell-table-records'}>{event.title}</div>
            <div className={'cell-table-records'}>{event.description}</div>
            <div className={'cell-table-records'}>{date.getDate()}</div>
            <div className={'cell-table-records'}>{event.time}</div>
        </div>
    );
}
