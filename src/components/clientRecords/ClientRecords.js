import * as React from "react";
import {useEffect, useState} from "react";

import {getCalendarEventForId} from "../servises";
import {Record} from "../record";

export function ClientRecords() {

    const [events, setEvents] = useState([]);

    const location = window.location.pathname;
    const locationSplit = location.split('/:');
    const locationSplitOneItem = locationSplit[1];

    useEffect(() => {
        getCalendarEventForId(locationSplitOneItem).then(rez => {
            setEvents(rez);
        });
    }, [locationSplitOneItem]);

    return (
        <div>
            <h2>Мої записи</h2>
            <div className={'center-table'}>
                <div className={'user-table'}>
                    <div className={'name-table records'}>
                        <div className={'cell-table-records-name header-table first-record-name'}>Місяць</div>
                        <div className={'cell-table-records-name header-table name-type position-relative'}>Тип</div>
                        <div
                            className={'cell-table-records-name header-table name-date position-relative'}>Число
                        </div>
                        <div className={'cell-table-records-name header-table'}>Час</div>
                    </div>
                    {
                        events.map(event => <Record event={event} key={event._id} user/>)
                    }
                </div>
            </div>
        </div>
    );
}
