import {Link, Outlet, useNavigate} from "react-router-dom";
import {MdNavigateNext} from "react-icons/md";
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";

import "./AdminHomePage.css";
import './AdminHomePage@media.css';
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
import {
    closeToogleMenu,
    handleClick,
    ifOpenPageAddActiveClass,
    openToogleMenu,
    ViewFunction
} from "../../utils/function";
import {LOGIN} from "../../config/headerConstants";
import {
    WORD_ACTIVE_MENU_CATEGORY,
    WORD_CATEGORY_MENU,
    WORD_NO_SCROLL,
    WORD_SMALL_MENU_ADMIN_CLIENT,
    WORD_TOKEN
} from "../../config/wordsConstants";

export function AdminHomePage({setUsers, setDelUser, delUser}) {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem(WORD_TOKEN)) {
            dispatch(auth()).then(req => {
                console.log(req);
                // if (req === undefined) {
                //     navigate(LOGIN);
                // }
                // getUsers().then(response => {
                //     if (response !== undefined) {
                //         setUsers(response.data);
                //     }
                // });
                // setDelUser(false);
            })
        }
    }, [dispatch, navigate, setUsers, delUser, setDelUser]);

    ViewFunction();

    const container = document.querySelector('.home-menu');

    if (container) {
        ifOpenPageAddActiveClass();
        container.addEventListener('click', handleClick, false);
    }

    function closeMenuHome() {
        closeToogleMenu(WORD_CATEGORY_MENU, WORD_SMALL_MENU_ADMIN_CLIENT, WORD_ACTIVE_MENU_CATEGORY, WORD_NO_SCROLL);
    }

    return (
        <div className={'adminHomePage'}>
            <div className={'home-menu'}>
                <div className={'category-menu'} id={'category-menu'}
                     onClick={() => openToogleMenu(WORD_CATEGORY_MENU, WORD_SMALL_MENU_ADMIN_CLIENT, WORD_ACTIVE_MENU_CATEGORY, WORD_NO_SCROLL)}>
                    <span className={'category-menu-bar'}/>
                    <span className={'category-menu-bar'}/>
                    <span className={'category-menu-bar'}/>
                </div>
                <div className={'small-menu-admin-client'} id={'small-menu-admin-client'}>
                    <div className={'padding padding-last'}>
                        <Link to={ADMIN} className={'color_purple click-item'}>
                            <button className={'home_item click-item category'}
                                    onClick={closeMenuHome}>Редагувати <MdNavigateNext className={'non-icon'}/>
                            </button>
                        </Link>
                    </div>
                    <div className={'padding'}>
                        <Link to={ADMIN_USERS} className={'color_purple click-item'}>
                            <button className={'home_item click-item category'} onClick={() => {
                                closeMenuHome();
                            }}>Клієнти <MdNavigateNext className={'non-icon'}/></button>
                        </Link>
                    </div>
                    <div className={'padding'}>
                        <Link to={ADMIN_RECORDS} className={'color_purple click-item'}>
                            <button className={'home_item click-item category'}
                                    onClick={closeMenuHome}>Записи <MdNavigateNext className={'non-icon'}/>
                            </button>
                        </Link>
                    </div>
                    <div className={'padding'}>
                        <Link to={ADMIN_PRODUCT} className={'color_purple click-item'}>
                            <button className={'home_item click-item category'}
                                    onClick={closeMenuHome}>Товари <MdNavigateNext className={'non-icon'}/>
                            </button>
                        </Link>
                    </div>
                    <div className={'padding'}>
                        <Link to={ADMIN_ORDERS} className={'color_purple click-item'}>
                            <button className={'home_item click-item category'}
                                    onClick={closeMenuHome}>Замовлення <MdNavigateNext className={'non-icon'}/>
                            </button>
                        </Link>
                    </div>
                    <div className={'padding'}>
                        <Link to={ADMIN_ARCHIVE_ORDERS} className={'color_purple click-item'}>
                            <button className={'home_item click-item category'}
                                    onClick={closeMenuHome}>Архів <MdNavigateNext className={'non-icon'}/>
                            </button>
                        </Link>
                    </div>
                    <div className={'padding'}>
                        <Link to={ADMIN_ANALYSIS} className={'color_purple click-item'}>
                            <button className={'home_item click-item category'}
                                    onClick={closeMenuHome}>Звіти <MdNavigateNext className={'non-icon'}/>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={'home-page'}>
                <div className={'small-content-admin-client'}>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}
