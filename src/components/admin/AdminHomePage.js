import {useEffect, useState} from "react";

import Users from "../users/Users";
import "./AdminHomePage.css"
import {Link, Route, Routes} from "react-router-dom";
import EditPageAdmin from "../editPage/EditPageAdmin";
import StockPage from "../stockPage/StockPage";
import ProductsPage from "../productsPage/ProductsPage";
import {auth, getUsers} from "../servises/API";
import {useDispatch, useSelector} from "react-redux";
import Autorization from "../autorization/Autorization";


export default function AdminHomePage ()
{
    const [users, setUsers] = useState([]);
    const isAuth = useSelector(state => state.user.isAuth)


    const dispatch = useDispatch()

    async function getUser() {
        try {
            const response = await getUsers();
            setUsers(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if(localStorage.getItem('token'))
        {
            dispatch(auth())
            getUser()

            // getUsers().then(respons => {
            //     setUsers(respons.data); })
        }

    }, [])




    return(

        <div className={'adminHomePage'}>
            <div className={'home-menu'}>
                <div><Link to="/edit">Редактировать</Link></div>
                <div onClick={getUser}><Link to="/users">Клиенты</Link></div>
                <div><Link to="/stock">Акции</Link></div>
                <div><Link to="/products">Товары</Link></div>
            </div>
            <div className={'home-page'}>
                <Routes>
                    <Route path={'/edit'} element={<EditPageAdmin/>}/>
                    <Route path={'/users'} element={<Users items={users}/>}/>
                    <Route path={'/stock'} element={<StockPage/>}/>
                    <Route path={'/products'} element={<ProductsPage/>}/>
                </Routes>
                {/*{!isAuth && <Autorization/>}*/}

            </div>

        </div>

    );
}
