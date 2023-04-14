import * as React from "react";
import {BiCabinet} from "react-icons/bi";
import {BsBasket2} from "react-icons/bs";
import {GiExitDoor} from "react-icons/gi";
import {ImUserPlus} from "react-icons/im";
import {IoMdExit} from "react-icons/io";
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import "./Header.css";
import './Header@media.css';
import {
    ABOUT_AS,
    CONTACT,
    HAIR_COLOR,
    HAIR_STYLES,
    LOGIN,
    MENS_HAIRCUT,
    PRODUCTS,
    PRODUCTS_ORDERS,
    REGISTRATION,
    THIS,
    WOMENS_HAIRCUT
} from "../../config/headerConstants";
import {ADMIN, CLIENT} from "../../config/homeConstants";
import {APIServise} from "../servises";
import {closeToogleMenu, openToogleMenu} from "../utils/function";
import {delFilter} from "../reducers/actionCreators";
import Logo from "../../images/logo-header.png";
import {WORLD_ADMIN, WORLD_AUTORIZATION, WORLD_USER} from "../../config/wordsConstants";

export function Header() {

    const isAuth = useSelector(state => state.user.isAuth);
    const role = useSelector(state => state.user.role);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const links = document.getElementsByClassName("navbar");
    let URL = window.location.pathname;
    URL = URL.substring(URL.lastIndexOf('/'));
    for (let i = 0; i < links.length; i++) {
        if (links[i].dataset.pathname === URL) {
            links[i].classList.add("active");
        }
    }

    function openSubMenuOne() {
        const subLinkOne = document.getElementById('sub-link-one');
        subLinkOne.classList.toggle('active-sub-link-one');
    }

    function openSubMenuTwo() {
        const subLinkTwo = document.getElementById('sub-link-two');
        subLinkTwo.classList.toggle('active-sub-link-two');
    }

    function closeHandler() {
        closeToogleMenu('btn-menu', 'list-menu', 'active-menu-header',
            'no-scroll', 'sub-link-one', 'sub-link-two', 'active-sub-link-one', 'active-sub-link-two');
    }

    return (
        <div className={'all-container'}>
            <div className={'header'}>
                <div className={'navbar-logo navbar-logo-position'}>
                    <img src={Logo} className={'navbar-logo-img'} alt={'Logo'}/>
                    <p className={'navbar-logo-p'}>Studio</p>
                </div>
                <button className={'btn-menu'}
                        onClick={() => openToogleMenu('btn-menu', 'list-menu', 'active-menu-header', 'no-scroll')}
                        id={'btn-menu'}>
                    <span className={'bar'}/>
                    <span className={'bar'}/>
                    <span className={'bar'}/>
                </button>
                <ul className={'menu'} id={'list-menu'}>
                    <li>
                        <NavLink to={THIS} onClick={closeHandler}>Головна</NavLink>
                    </li>
                    <li>
                        <a onClick={openSubMenuOne} className={'cursor-pointer'}>Послуги</a>
                        <ul className={'submenu'} id={'sub-link-one'}>
                            <li>
                                <NavLink to={MENS_HAIRCUT} onClick={closeHandler}>Чоловічі
                                    стрижки</NavLink>
                            </li>
                            <li>
                                <NavLink to={WOMENS_HAIRCUT} onClick={closeHandler}>Жіночі
                                    стрижки</NavLink>
                            </li>
                            <li>
                                <NavLink to={HAIR_STYLES} onClick={closeHandler}
                                >Зачіски</NavLink>
                            </li>
                            <li>
                                <NavLink to={HAIR_COLOR} onClick={closeHandler}
                                >Фарбування</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <NavLink to={PRODUCTS} onClick={() => {
                            closeHandler();
                            dispatch(delFilter());
                        }}>Товари</NavLink>
                    </li>
                    <li>
                        <NavLink to={ABOUT_AS} onClick={closeHandler}>Про нас</NavLink>
                    </li>
                    <li>
                        <NavLink to={CONTACT} onClick={closeHandler}>Контакти</NavLink>
                    </li>
                    <li>
                        <a onClick={openSubMenuTwo} className={'link-a cursor-pointer'}><IoMdExit className=" icon_basket"/></a>
                        <ul className={'submenu'} id={'sub-link-two'}>
                            {
                                !isAuth &&
                                <li><NavLink to={LOGIN} onClick={closeHandler}>
                                    Вхід</NavLink></li>
                            }
                            {
                                !isAuth &&
                                <li><NavLink to={REGISTRATION} onClick={closeHandler}>
                                    Реєстрація</NavLink></li>
                            }
                            {
                                isAuth && role === WORLD_ADMIN &&
                                <li><NavLink to={ADMIN} onClick={closeHandler}><ImUserPlus
                                    className=" icon_login link-a"/>Кабінет</NavLink></li>
                            }
                            {
                                isAuth && role === WORLD_USER &&
                                <li><NavLink to={CLIENT} onClick={closeHandler}><BiCabinet
                                    className=" icon_login link-a"/>Кабінет</NavLink></li>
                            }
                            {
                                isAuth &&
                                <li onClick={() => {
                                    dispatch(APIServise.logout());
                                    localStorage.removeItem(WORLD_AUTORIZATION);
                                    navigate(LOGIN);
                                }}><NavLink to={LOGIN} onClick={closeHandler}><GiExitDoor
                                    className=" icon_login link-a"/>Вихід</NavLink></li>
                            }
                        </ul>
                    </li>
                    <li>
                        {
                            (isAuth && role === WORLD_USER) &&
                            <NavLink to={PRODUCTS_ORDERS} onClick={closeHandler}><BsBasket2
                                className=" icon_basket link-a"/></NavLink>
                        }
                        {
                            (isAuth && role === WORLD_ADMIN) &&
                            <div className={'div-admin'}>Адмін</div>
                        }
                    </li>
                </ul>
            </div>
        </div>
    );
}
