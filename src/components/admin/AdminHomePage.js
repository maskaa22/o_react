import Avatar from "@mui/material/Avatar";
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

// Старі стилі лишаються підключеними: їхні глобальні класи (.padding, .non-icon тощо) використовують інші сторінки
import "./AdminHomePage.css";
import './AdminHomePage@media.css';
import '../servicePage/ServicePage.css';        // спільні токени sv-* (шрифт, тіні, відступи) для класу .sv
import '../client/ClientHomePageModern.css';    // шапка й вкладки кабінету — ті самі, що й у клієнта
import './AdminHomePageModern.css';
import {AUTH_URL} from "../../config/URL";
import {
    ADMIN,
    ADMIN_ANALYSIS,
    ADMIN_ARCHIVE_ORDERS,
    ADMIN_ORDERS,
    ADMIN_PRODUCT,
    ADMIN_RECORDS,
    ADMIN_USERS
} from "../../config/homeConstants";
import {auth, getUsers} from "../../servises";
import {LOGIN} from "../../config/headerConstants";
import {WORD_TOKEN} from "../../config/wordsConstants";

const TABS = [
    {to: ADMIN, label: 'Профіль', end: true},
    {to: ADMIN_USERS, label: 'Клієнти'},
    {to: ADMIN_RECORDS, label: 'Записи'},
    {to: ADMIN_PRODUCT, label: 'Товари'},
    {to: ADMIN_ORDERS, label: 'Замовлення'},
    {to: ADMIN_ARCHIVE_ORDERS, label: 'Архів'},
    {to: ADMIN_ANALYSIS, label: 'Звіти'}
];

/*
 * Кабінет адміністратора: шапка з привітанням, вкладки розділів і зона вмісту (Outlet).
 * Раніше це було бічне меню з кнопками й окремою мобільною панеллю, якою керували скрипти через
 * класи; тепер звичайні вкладки (NavLink). Завантаження клієнтів і перевірка авторизації — ті самі.
 */
export function AdminHomePage({setUsers, setDelUser, delUser}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useSelector(state => state.user.currentUser);

    useEffect(() => {
        if (localStorage.getItem(WORD_TOKEN)) {
            dispatch(auth()).then(req => {
                if (req === undefined) {
                    navigate(LOGIN);
                }
                getUsers().then(response => {
                    if (response !== undefined) {
                        setUsers(response.data);
                    }
                });
                setDelUser(false);
            })
        }
    }, [dispatch, navigate, setUsers, delUser, setDelUser]);

    const name = currentUser.name || '';
    const initial = name ? name.charAt(0).toUpperCase() : '?';

    return (
        <div className={'sv cl ad'}>
            <div className={'sv-container cl-wrap'}>
                <header className={'cl-hero'}>
                    <Avatar className={'cl-hero__avatar'}
                            src={currentUser.foto ? AUTH_URL + '/' + currentUser.foto : undefined}
                            alt={name}
                            sx={{width: 76, height: 76}}>
                        {initial}
                    </Avatar>
                    <div className={'cl-hero__text'}>
                        <span className={'cl-hero__eyebrow'}>Панель адміністратора</span>
                        <h1 className={'cl-hero__title'}>Привіт{name ? `, ${name}` : ''}</h1>
                        {currentUser.email && <p className={'cl-hero__email'}>{currentUser.email}</p>}
                    </div>
                </header>

                <nav className={'cl-tabs cl-tabs--many'} aria-label={'Розділи адмін-панелі'}>
                    {TABS.map(tab => (
                        <NavLink key={tab.to} to={tab.to} end={tab.end} className={'cl-tab'}>{tab.label}</NavLink>
                    ))}
                </nav>

                <div className={'cl-content ad-content'}>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}
