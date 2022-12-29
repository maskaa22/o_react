import {Link, Route, Routes} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {APIServise} from "../servises";
import {CLIENT, CLIENT_ORDERS, ORDERS, THIS} from "../../config/homeConstants";
import {closeToogleMenu, handleClick, ifOpenPageAddActiveClass, openToogleMenu, ViewFunction} from "../utils/function";
import {Edit} from "../editPage";
import {UserOrders} from "../orders";
import {MdNavigateNext} from "react-icons/md";
import {
    WORD_ACTIVE_MENU_CATEGORY,
    WORD_CATEGORY_MENU,
    WORD_NO_SCROLL,
    WORD_SMALL_MENU_ADMIN_CLIENT
} from "../../config/wordsConstants";

export function ClientHomePage() {
    const currentUser = useSelector(state => state.user.currentUser);
    const [orders, setOrders] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(APIServise.auth());
        APIServise.getOrdersById(currentUser.id).then(respons => {
            setOrders(respons.data)
        });
    }, []);

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
                        <Link to={CLIENT_ORDERS} className={'color_purple click-item'}>
                            <button className={'home_item click-item category'}
                                    onClick={closeMenuHome}>Замовлення<MdNavigateNext className={'non-icon'}/></button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={'home-page'}>
                <Routes>
                    <Route path={THIS} element={<Edit/>}/>
                    <Route path={ORDERS} element={<UserOrders orders={orders}/>}/>
                </Routes>
            </div>
        </div>
    );
}
