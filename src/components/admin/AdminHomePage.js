import { Link, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import "./AdminHomePage.css";
import { APIServise } from "../servises";
import { CreateProduct } from "../createProduct";
import { Edit } from "../editPage";
import { Users } from "../users";
import {Orders} from "../orders";
import {Analysis} from "../ analysis";
import {ArchiveOrders} from "../archive";


export function AdminHomePage ()
{
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
        if(localStorage.getItem('token'))
        {
            dispatch(APIServise.auth());
            getUser();
        }

    }, []);

    return(
        <div className={'adminHomePage'}>
            <div className={'home-menu'}>
                <div><Link to="/admin">Редактировать</Link></div>
                <div onClick={getUser}><Link to="/admin/users">Клиенты</Link></div>
                <div><Link to="/admin/product">Товары</Link></div>
                <div><Link to="/admin/orders">Заказы</Link></div>
                <div><Link to="/admin/archive_orders">Архив заказов</Link></div>
                <div><Link to="/admin/analysis">Отчёты</Link></div>
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
