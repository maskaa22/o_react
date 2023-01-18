import {Link, Route, Routes} from "react-router-dom";
import {MdNavigateNext} from "react-icons/md";
import React, {useEffect, useState} from "react";
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
    ADMIN_USERS,
    ANALYSIS,
    ARCHIVE_ORDERS,
    CLIENTS,
    ORDERS,
    RECORDS,
    THIS,
    PRODUCTS
} from "../../config/homeConstants";
import {Analysis} from "../ analysis";
import {APIServise} from "../servises";
import {ArchiveOrders} from "../archive";
import {closeToogleMenu, handleClick, ifOpenPageAddActiveClass, openToogleMenu, ViewFunction} from "../utils/function";
import {CreateProduct} from "../createProduct";
import {Edit} from "../editPage";
import {Orders} from "../orders";
import {Users} from "../users";
import {Records} from "../records/Records";
import {
    WORD_ACTIVE_MENU_CATEGORY,
    WORD_CATEGORY_MENU,
    WORD_NO_SCROLL,
    WORD_SMALL_MENU_ADMIN_CLIENT
} from "../../config/wordsConstants";

export function AdminHomePage() {
    const [users, setUsers] = useState([]);

    const dispatch = useDispatch();

    async function getUser() {
        try {
            const response = await APIServise.getUsers();
            setUsers(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(APIServise.auth());
            getUser();
        }

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
                        <Link to={ADMIN} className={'color_purple click-item'}>
                            <button className={'home_item click-item category'}
                                    onClick={closeMenuHome}>Редагувати <MdNavigateNext className={'non-icon'}/></button>
                        </Link>
                    </div>
                    <div className={'padding'}>
                        <Link to={ADMIN_USERS} className={'color_purple click-item'}>
                            <button className={'home_item click-item category'} onClick={() => {
                                closeMenuHome();
                                getUser()
                            }}>Клієнти <MdNavigateNext className={'non-icon'}/></button>
                        </Link>
                    </div>
                    <div className={'padding'}>
                        <Link to={ADMIN_RECORDS} className={'color_purple click-item'}>
                            <button className={'home_item click-item category'}
                                    onClick={closeMenuHome}>Записи <MdNavigateNext className={'non-icon'}/></button>
                        </Link>
                    </div>
                    <div className={'padding'}>
                        <Link to={ADMIN_PRODUCT} className={'color_purple click-item'}>
                            <button className={'home_item click-item category'}
                                    onClick={closeMenuHome}>Товари <MdNavigateNext className={'non-icon'}/></button>
                        </Link>
                    </div>
                    <div className={'padding'}>
                        <Link to={ADMIN_ORDERS} className={'color_purple click-item'}>
                            <button className={'home_item click-item category'}
                                    onClick={closeMenuHome}>Замовлення <MdNavigateNext className={'non-icon'}/></button>
                        </Link>
                    </div>
                    <div className={'padding'}>
                        <Link to={ADMIN_ARCHIVE_ORDERS} className={'color_purple click-item'}>
                            <button className={'home_item click-item category'}
                                    onClick={closeMenuHome}>Архів <MdNavigateNext className={'non-icon'}/></button>
                        </Link>
                    </div>
                    <div className={'padding'}>
                        <Link to={ADMIN_ANALYSIS} className={'color_purple click-item'}>
                            <button className={'home_item click-item category'}
                                    onClick={closeMenuHome}>Звіти <MdNavigateNext className={'non-icon'}/></button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={'home-page'}>
                <div className={'small-content-admin-client'}>
                    <Routes>
                        <Route path={THIS} element={<Edit/>}/>
                        <Route path={CLIENTS} element={<Users items={users}/>}/>
                        <Route path={RECORDS} element={<Records/>}/>
                        <Route path={PRODUCTS} element={<CreateProduct/>}/>
                        <Route path={ORDERS} element={<Orders/>}/>
                        <Route path={ARCHIVE_ORDERS} element={<ArchiveOrders/>}/>
                        <Route path={ANALYSIS} element={<Analysis/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}
