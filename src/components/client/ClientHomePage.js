import {Link, Route, Routes, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

import {auth} from "../../servises";
import {CLIENT, CLIENT_ORDERS, CLIENT_RECORDS, ORDERS, RECORDS, THIS} from "../../config/homeConstants";
import {closeToogleMenu, handleClick, ifOpenPageAddActiveClass, openToogleMenu, ViewFunction} from "../../utils/function";
import {MdNavigateNext} from "react-icons/md";
import {
    WORD_ACTIVE_MENU_CATEGORY,
    WORD_CATEGORY_MENU,
    WORD_NO_SCROLL,
    WORD_SMALL_MENU_ADMIN_CLIENT,
    WORD_TOKEN
} from "../../config/wordsConstants";
import {LOGIN} from "../../config/headerConstants";
import {Edit} from "../editPage";
import {UserOrders} from "../orders";
import {ClientRecords} from "../clientRecords";

export function ClientHomePage() {

    const [user, setUser] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem(WORD_TOKEN)) {
            dispatch(auth()).then(req => {
                console.log(req);
                if (req === undefined) {
                    navigate(LOGIN);
                } else {
                    setUser(req.id);
                }
            })
        }
    }, [dispatch, navigate]);

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
                        <Link to={CLIENT} className={'color_purple click-item'}>
                            <button className={'home_item click-item category'}
                                    onClick={closeMenuHome}>Профіль<MdNavigateNext className={'non-icon'}/></button>
                        </Link>
                    </div>
                    <div className={'padding'}>
                        <Link to={`${CLIENT_ORDERS}/:${user}`} className={'color_purple click-item'}>
                            <button className={'home_item click-item category'}
                                    onClick={closeMenuHome}>Замовлення<MdNavigateNext className={'non-icon'}/></button>
                        </Link>
                    </div>
                    <div className={'padding'}>
                        <Link to={`${CLIENT_RECORDS}/:${user}`} className={'color_purple click-item'}>
                            <button className={'home_item click-item category'}
                                    onClick={closeMenuHome}>Записи<MdNavigateNext className={'non-icon'}/></button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={'home-page'}>
                <Routes>
                    <Route path={THIS} element={<Edit/>}/>
                    <Route path={`${ORDERS}/:${user}`} element={<UserOrders/>}/>
                    <Route path={`${RECORDS}/:${user}`} element={<ClientRecords/>}/>
                </Routes>
            </div>
        </div>
    );
}
