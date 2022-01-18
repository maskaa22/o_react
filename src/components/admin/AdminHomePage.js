import {useEffect, useState} from "react";
import {URL} from "../../config";
import Users from "../users/Users";
import "./AdminHomePage.css"
import {Link, Route, BrowserRouter as Router, Routes} from "react-router-dom";
import EditPageAdmin from "../editPage/EditPageAdmin";
import StockPage from "../stockPage/StockPage";
import ProductsPage from "../productsPage/ProductsPage";

export default function AdminHomePage ()
{
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(URL.FETCH_URL)
            .then(value => value.json())
            .then(users => setUsers(users))
    }, []);

    return(
<Router>
        <div className={'adminHomePage'}>
            <div className={'home-menu'}>
                <div><Link to="/edit">Редактировать</Link></div>
                <div><Link to="/users">Клиенты</Link></div>
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
            </div>
        </div>
</Router>
    );
}
