import * as React from "react";
import {BiCabinet} from "react-icons/bi";
import {BsBasket2} from "react-icons/bs";
import {GiExitDoor} from "react-icons/gi";
import {ImUserPlus} from "react-icons/im";
import {IoMdExit} from "react-icons/io";
import {NavLink, useNavigate} from "react-router-dom";
import {RiMapPinUserFill} from "react-icons/ri";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";

import "./Header.css";
import {APIServise} from "../servises";
import {delFilter} from "../reducers/actionCreators";
import Logo from "../../images/logo-header.png";
import {openToogleMenu, closeToogleMenu, handleClick, closeHandleClick} from "../utils/function";

export function Header() {

    // const [open, setOpen] = React.useState(false);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);


    const isAuth = useSelector(state => state.user.isAuth);
    const role = useSelector(state => state.user.role);
    // const currentUser = useSelector(state => state.user.currentUser);

    //const [role, setRole] = useState('');

    // const hamb = document.querySelector('#hamb');
    // const popup = document.querySelector('#popup');
    // const menu = document.querySelector('#menu');
    // const body = document.body;
    // if(menu) {
    //     menu.cloneNode(true);
    // }
    // function hambHandler (e) {
    //     e.preventDefault();
    //     if(popup) {
    //         popup.classList.toggle('open-popup');
    //     }
    //     hamb.classList.toggle('active-hamb');
    //     body.classList.toggle('noscroll');
    //     renderPopup();
    //
    // }
    // function renderPopup () {
    //     popup.appendChild(menu)
    // }


    const dispatch = useDispatch();

    //добавление подчёркивание в выбраное меню
    const links = document.getElementsByClassName("navbar");
    let URL = window.location.pathname;
    URL = URL.substring(URL.lastIndexOf('/'));
    for (let i = 0; i < links.length; i++) {
        if (links[i].dataset.pathname === URL) {
            links[i].classList.add("active");
        }
    }

    // if(isAuth){
    //     console.log(currentUser.role);
    //     // currentUser?.map(user => setRole(user.role))
    //     // console.log(role);
    // }


    const navigate = useNavigate();




    const subLinkOne = document.getElementById('sub-link-one');
    const subLinkTwo = document.getElementById('sub-link-two');

    function openSubMenuOne() {
        subLinkOne.classList.toggle('active-sub-link-one');
    }

    function openSubMenuTwo() {
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
                        <NavLink to={'/'} onClick={closeToogleMenu}>Головна</NavLink>
                    </li>
                    <li>
                        <a onClick={openSubMenuOne}>Послуги</a>
                        <ul className={'submenu'} id={'sub-link-one'}>
                            <li>
                                <NavLink to={'/mens_haircut'} onClick={closeHandler}>Чоловічі
                                    стрижки</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/womens_haircut'} onClick={closeHandler}>Жіночі
                                    стрижки</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/hairstyles'} onClick={closeHandler}
                                >Зачіски</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/hair_dyeing'} onClick={closeHandler}
                                >Фарбування</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li >
                        <NavLink to={'products'} onClick={() => {closeHandler(); dispatch(delFilter())}}>Товари</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/about_as'} onClick={closeHandler}>Про нас</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/contact'} onClick={closeHandler}>Контакти</NavLink>
                    </li>
                    <li>
                        <a onClick={openSubMenuTwo}><IoMdExit className=" icon_basket link-a"/></a>
                        <ul className={'submenu'} id={'sub-link-two'}>
                            {
                                !isAuth &&
                                <li><NavLink to={'/login'} onClick={closeHandler}><RiMapPinUserFill
                                    className=" icon_login link-a"/>Вхід</NavLink></li>
                            }
                            {
                                !isAuth &&
                                <li><NavLink to={'/registration'} onClick={closeHandler}><ImUserPlus
                                    className=" icon_login link-a"/>Реєстрация</NavLink></li>
                            }
                            {
                                isAuth && role === 'admin' &&
                                <li><NavLink to={'/admin'} onClick={closeHandler}><ImUserPlus
                                    className=" icon_login link-a"/>Кабінет</NavLink></li>
                            }
                            {
                                isAuth && role === 'user' &&
                                <li><NavLink to={'/user'} onClick={closeHandler}><BiCabinet
                                    className=" icon_login link-a"/>Кабінет</NavLink></li>
                            }
                            {
                                isAuth &&
                                <li onClick={() => {
                                    dispatch(APIServise.logout());
                                    localStorage.removeItem('autorization');
                                    navigate("/login");
                                }}><NavLink to={'/login'} onClick={closeHandler}><GiExitDoor
                                    className=" icon_login link-a"/>Вихід</NavLink></li>
                            }

                        </ul>
                    </li>
                    <li>
                        {
                            isAuth &&
                            <NavLink to={'/products/orders'} onClick={closeHandler}><BsBasket2
                                className=" icon_basket link-a"/></NavLink>
                        }
                    </li>
                </ul>
            </div>
        </div>
    );
}
