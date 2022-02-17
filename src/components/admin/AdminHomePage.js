import { Link, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import "./AdminHomePage.css";
import { APIServise } from "../servises";
import { CreateProduct } from "../createProduct";
import { EditPageAdmin } from "../editPage";
import { StockPage } from "../stockPage";
import { Users } from "../users";

export default function AdminHomePage ()
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
                <div><Link to="/admin/stock">Акции</Link></div>
                <div><Link to="/admin/product">Товары</Link></div>
            </div>
            <div className={'home-page'}>
                <Routes>
                    <Route path={'/'} element={<EditPageAdmin/>}/>
                    <Route path={'/users'} element={<Users items={users}/>}/>
                    <Route path={'/stock'} element={<StockPage/>}/>
                    <Route path={'/product'} element={<CreateProduct/>}/>
                </Routes>
            </div>
        </div>
    );
}
