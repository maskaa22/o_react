import Avatar from "@mui/material/Avatar";
import {NavLink, Route, Routes} from "react-router-dom";
import React from "react";

import '../servicePage/ServicePage.css';   // спільні токени sv-* (шрифт, тіні, відступи) для класу .sv
import './ClientHomePageModern.css';
import {AUTH_URL} from "../../config/URL";
import {CLIENT, CLIENT_ORDERS, CLIENT_RECORDS, ORDERS, RECORDS, THIS} from "../../config/homeConstants";
import {Edit} from "../editPage";
import {UserOrders} from "../orders";
import {ClientRecords} from "../clientRecords";

/*
 * Особистий кабінет клієнта: шапка з привітанням, вкладки "Профіль / Замовлення / Записи"
 * і зона вмісту. Раніше це було бічне меню з кнопками й окремою мобільною панеллю, якою керували
 * скрипти через класи; тепер звичайні вкладки (NavLink), що працюють однаково на всіх екранах.
 */
export function ClientHomePage({currentUser}) {

    const name = currentUser.name || '';
    const initial = name ? name.charAt(0).toUpperCase() : '?';

    return (
        <div className={'sv cl'}>
            <div className={'sv-container cl-wrap'}>
                <header className={'cl-hero'}>
                    <Avatar className={'cl-hero__avatar'}
                            src={currentUser.foto ? AUTH_URL + '/' + currentUser.foto : undefined}
                            alt={name}
                            sx={{width: 76, height: 76}}>
                        {initial}
                    </Avatar>
                    <div className={'cl-hero__text'}>
                        <span className={'cl-hero__eyebrow'}>Особистий кабінет</span>
                        <h1 className={'cl-hero__title'}>Привіт{name ? `, ${name}` : ''}</h1>
                        {currentUser.email && <p className={'cl-hero__email'}>{currentUser.email}</p>}
                    </div>
                </header>

                {/* у шляхах замовлень і записів двокрапка перед id — так було задано в маршрутах, не змінюю */}
                <nav className={'cl-tabs'} aria-label={'Розділи кабінету'}>
                    <NavLink end to={CLIENT} className={'cl-tab'}>Профіль</NavLink>
                    <NavLink to={`${CLIENT_ORDERS}/:${currentUser._id}`} className={'cl-tab'}>Замовлення</NavLink>
                    <NavLink to={`${CLIENT_RECORDS}/:${currentUser._id}`} className={'cl-tab'}>Записи</NavLink>
                </nav>

                <div className={'cl-content'}>
                    <Routes>
                        <Route path={THIS} element={<Edit/>}/>
                        <Route path={`${ORDERS}/:${currentUser._id}`} element={<UserOrders/>}/>
                        <Route path={`${RECORDS}/:${currentUser._id}`} element={<ClientRecords/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}
