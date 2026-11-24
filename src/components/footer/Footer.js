import {BsClock, BsGeoAlt, BsTelephone} from "react-icons/bs";
import {FaArrowRight} from "react-icons/fa";
import {Link} from "react-router-dom";
import React from "react";
import {useDispatch} from "react-redux";

import './Footer.css';
import './Fotter@media.css';
import {
    ABOUT_AS,
    CONTACT,
    HAIR_COLOR,
    HAIR_STYLES,
    MENS_HAIRCUT,
    PRODUCTS,
    THIS,
    WOMENS_HAIRCUT
} from "../../config/headerConstants";
import {delFilter} from "../../reducers/actionCreators";
import Logo from "../../images/logo.webp";   // повний логотип: значок + слово

const SERVICES = [
    {to: MENS_HAIRCUT, label: 'Чоловічі стрижки'},
    {to: WOMENS_HAIRCUT, label: 'Жіночі стрижки'},
    {to: HAIR_STYLES, label: 'Зачіски'},
    {to: HAIR_COLOR, label: 'Фарбування'}
];

const NAVIGATION = [
    {to: THIS, label: 'Головна'},
    {to: PRODUCTS, label: 'Товари', resetFilter: true},
    {to: ABOUT_AS, label: 'Про нас'},
    {to: CONTACT, label: 'Контакти'}
];

// Той самий номер, що вказаний на сторінці "Контакти"
const PHONE = '0657487125';

const toTop = () => window.scrollTo({top: 0});

export function Footer() {

    const dispatch = useDispatch();

    // Після переходу з іншої сторінки докручуємо до блоку запису
    const goToBooking = () => {
        toTop();
        setTimeout(() => {
            const booking = document.getElementById('booking');
            if (booking) booking.scrollIntoView({behavior: 'smooth'});
        }, 150);
    };

    return (
        <footer className={'ft'}>
            <div className={'ft-inner'}>
                <div className={'ft-grid'}>
                    <div className={'ft-brand'}>
                        <Link to={THIS} className={'ft-logo'} onClick={toTop} aria-label={'Miraé — на головну'}>
                            <img src={Logo} className={'ft-logo__img'} alt={'Miraé'}/>
                        </Link>
                        <p className={'ft-tagline'}>
                            Студія краси: стрижки, зачіски та фарбування з увагою до кожної деталі.
                        </p>
                        <Link to={THIS} className={'ft-cta'} onClick={goToBooking}>
                            Записатися <FaArrowRight/>
                        </Link>
                    </div>

                    <nav className={'ft-col'} aria-label={'Послуги'}>
                        <h3 className={'ft-title'}>Послуги</h3>
                        <ul className={'ft-list'}>
                            {SERVICES.map(item => (
                                <li key={item.to}><Link to={item.to} onClick={toTop}>{item.label}</Link></li>
                            ))}
                        </ul>
                    </nav>

                    <nav className={'ft-col'} aria-label={'Навігація'}>
                        <h3 className={'ft-title'}>Навігація</h3>
                        <ul className={'ft-list'}>
                            {NAVIGATION.map(item => (
                                <li key={item.to}>
                                    <Link to={item.to} onClick={() => {
                                        toTop();
                                        if (item.resetFilter) dispatch(delFilter());
                                    }}>{item.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className={'ft-col'}>
                        <h3 className={'ft-title'}>Контакти</h3>
                        <ul className={'ft-contacts'}>
                            <li>
                                <BsGeoAlt className={'ft-contacts__icon'} aria-hidden={'true'}/>
                                <span>м. Київ, вул. Іващенка, б. 327</span>
                            </li>
                            <li>
                                <BsClock className={'ft-contacts__icon'} aria-hidden={'true'}/>
                                <span>Щодня<br/>08:00 – 17:00</span>
                            </li>
                            <li>
                                <BsTelephone className={'ft-contacts__icon'} aria-hidden={'true'}/>
                                <a href={`tel:${PHONE}`}>{PHONE}</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={'ft-bottom'}>
                    <span>© {new Date().getFullYear()} Miraé. Усі права захищено.</span>
                </div>
            </div>
        </footer>
    );
}
