import * as React from "react";
import {useEffect, useState} from "react";
import {FaArrowRight, FaRegCalendarAlt, FaRegClock} from "react-icons/fa";
import {Link} from "react-router-dom";

import './ClientRecordsModern.css';
import {getCalendarEventForId} from "../../servises";
import {THIS} from "../../config/headerConstants";
import {WORD_LOCALES} from "../../config/wordsConstants";

// з сайту на головну й докручує до запису
const goToBooking = () => {
    window.scrollTo({top: 0});
    setTimeout(() => {
        const booking = document.getElementById('booking');
        if (booking) booking.scrollIntoView({behavior: 'smooth'});
    }, 150);
};

function RecordCard({event, past}) {
    // event.date — час у секундах (unix), тому множимо на 1000
    const date = new Date(event.date * 1000);

    return (
        <article className={`cr-card${past ? ' cr-card--past' : ''}`}>
            <div className={'cr-date'} aria-hidden={'true'}>
                <span className={'cr-date__day'}>{date.getDate()}</span>
                <span className={'cr-date__month'}>{date.toLocaleDateString(WORD_LOCALES, {month: 'short'})}</span>
            </div>
            <div className={'cr-card__body'}>
                <h4 className={'cr-card__title'}>{event.description || 'Запис'}</h4>
                <p className={'cr-card__when'}>
                    {date.toLocaleDateString(WORD_LOCALES, {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'})}
                </p>
            </div>
            <span className={'cr-time'}>
                <FaRegClock aria-hidden={'true'}/> {event.time}
            </span>
        </article>
    );
}

export function ClientRecords() {

    const [events, setEvents] = useState([]);

    const location = window.location.pathname;
    const locationSplit = location.split('/:');
    const locationSplitOneItem = locationSplit[1];

    useEffect(() => {
        getCalendarEventForId(locationSplitOneItem).then(rez => {
            // при помилці запиту rez порожній — не даємо сторінці впасти
            setEvents(Array.isArray(rez) ? rez : []);
        });
    }, [locationSplitOneItem]);

    // "Майбутні" — від початку сьогоднішнього дня; ближчі першими. "Минулі" — найсвіжіші першими.
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const threshold = startOfToday.getTime() / 1000;

    const upcoming = events.filter(event => event.date >= threshold).sort((a, b) => a.date - b.date);
    const past = events.filter(event => event.date < threshold).sort((a, b) => b.date - a.date);

    return (
        <section className={'cr'}>
            <header className={'cr-head'}>
                <h2 className={'cr-head__title'}>Мої записи</h2>
                {events.length !== 0 && <span className={'cr-head__count'}>{events.length}</span>}
            </header>

            {events.length === 0 ?
                <div className={'cr-empty'}>
                    <span className={'cr-empty__icon'}><FaRegCalendarAlt aria-hidden={'true'}/></span>
                    <h3>Записів поки немає</h3>
                    <p>Оберіть зручний день у календарі, і ваш запис з'явиться тут.</p>
                    <Link to={THIS} className={'cr-empty__btn'} onClick={goToBooking}>
                        Записатися <FaArrowRight aria-hidden={'true'}/>
                    </Link>
                </div> :
                <>
                    {upcoming.length !== 0 &&
                        <div className={'cr-group'}>
                            <h3 className={'cr-group__title'}>Найближчі</h3>
                            <div className={'cr-list'}>
                                {upcoming.map(event => <RecordCard key={event._id} event={event}/>)}
                            </div>
                        </div>
                    }
                    {past.length !== 0 &&
                        <div className={'cr-group'}>
                            <h3 className={'cr-group__title'}>Минулі</h3>
                            <div className={'cr-list'}>
                                {past.map(event => <RecordCard key={event._id} event={event} past/>)}
                            </div>
                        </div>
                    }
                </>
            }
        </section>
    );
}
