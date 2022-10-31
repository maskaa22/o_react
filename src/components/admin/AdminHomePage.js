import {Link, Route, Routes} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

import "./AdminHomePage.css";
import {Analysis} from "../ analysis";
import {APIServise} from "../servises";
import {ArchiveOrders} from "../archive";
import {CreateProduct} from "../createProduct";
import {Edit} from "../editPage";
import {Orders} from "../orders";
import {Users} from "../users";
import {ViewFunction} from "../utils/function";

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

    return (
        <div className={'adminHomePage'}>
            <div className={'home-menu'}>
                <div className={'padding'}>
                    <div>
                        <Link to="/admin" className={'color_purple click-item'}>
                            <button className={'home_item click-item'}>Редагувати</button>
                        </Link></div>
                </div>
                <div className={'padding'}>
                    <div onClick={getUser}>
                        <Link to="/admin/users" className={'color_purple click-item'}>
                            <button className={'home_item click-item'}>Клієнти</button>
                        </Link></div>
                </div>
                <div className={'padding'}>
                    <div>
                        <Link to="/admin/product" className={'color_purple click-item'}>
                            <button className={'home_item click-item'}>Товари</button>
                        </Link></div>
                </div>
                <div className={'padding'}>
                    <div>
                        <Link to="/admin/orders" className={'color_purple click-item'}>
                            <button className={'home_item click-item'}>Замовлення</button>
                        </Link></div>
                </div>
                <div className={'padding'}>
                    <div>
                        <Link to="/admin/archive_orders" className={'color_purple click-item'}>
                            <button className={'home_item click-item'}>Архів замовлень</button>
                        </Link></div>
                </div>
                <div className={'padding'}>
                    <div>
                        <Link to="/admin/analysis" className={'color_purple click-item'}>
                            <button className={'home_item click-item'}>Звіти</button>
                        </Link></div>
                </div>


            </div>
            <div className={'home-page'}>
                <Routes>
                    <Route path={'/'} element={<Edit/>}/>
                    <Route path={'/users'} element={<Users items={users}/>}/>
                    <Route path={'/product'} element={<CreateProduct/>}/>
                    <Route path={'/orders'} element={<Orders/>}/>
                    <Route path={'/archive_orders'} element={<ArchiveOrders/>}/>
                    <Route path={'/analysis'} element={<Analysis/>}/>
                </Routes>
            </div>
        </div>
    );
}
