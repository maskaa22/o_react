import {FaArrowRight} from "react-icons/fa";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect} from "react";

import '../servicePage/ServicePage.css';   // спільні класи sv-*: герой, секції, заголовки, картка запису
import './AboutAsPage.css';
import About from '../../images/big-foto/Group 4.png';
import {AboutAs} from "./AboutAs";
import {auth} from "../../servises";
import {History} from "./History";
import {Team} from "./Team";
import {THIS} from "../../config/headerConstants";
import {WORD_TOKEN} from "../../config/wordsConstants";

export function AboutAsPage() {

    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem(WORD_TOKEN)) {
            dispatch(auth());
        }
    }, [dispatch]);

    // веде на головну й докручує до запису
    const goToBooking = () => {
        window.scrollTo({top: 0});
        setTimeout(() => {
            const booking = document.getElementById('booking');
            if (booking) booking.scrollIntoView({behavior: 'smooth'});
        }, 150);
    };

    return (
        <div className={'sv ab'}>
            <section className={'sv-hero'}>
                <img src={About} alt={''} aria-hidden={'true'} className={'sv-hero__img'}/>
                <div className={'sv-container'}>
                    <nav className={'sv-crumbs'} aria-label={'Навігація'}>
                        <Link to={THIS}>Головна</Link>
                        <span aria-hidden={'true'}>/</span>
                        <span>Про нас</span>
                    </nav>
                    <h1 className={'sv-hero__title'}>Про нас</h1>
                    <p className={'sv-hero__lead'}>
                        Салон краси «Olena Studio» — це салон з багаторічним досвідом.
                    </p>
                </div>
            </section>

            <AboutAs/>
            <History/>
            <Team/>

            <section className={'sv-section sv-section--tight'}>
                <div className={'sv-container'}>
                    <div className={'sv-cta'}>
                        <div>
                            <h2 className={'sv-cta__title'}>Чекаємо на вас</h2>
                            <p className={'sv-cta__text'}>Наші двері відкриті — оберіть зручний день у календарі запису.</p>
                        </div>
                        <Link to={THIS} className={'sv-btn'} onClick={goToBooking}>
                            Записатися <FaArrowRight/>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
