import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "./ClientHomePage.css";
import { Edit } from "../editPage";
import { ReviewsPage } from "../reviews";
import {UserOrders} from "../orders";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {APIServise} from "../servises";

export function ClientHomePage ()
{
    const currentUser = useSelector(state => state.user.currentUser);
    //console.log(currentUser.id);
    const [orders, setOrders] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        //if(localStorage.getItem('token')) {
            dispatch(APIServise.auth());
        // }
        APIServise.getOrdersById(currentUser.id).then(respons => {
            setOrders(respons.data)
        });
    }, [])

    return(

                <div className={'adminHomePage'}>
                    <div className={'home-menu'}>
                        <div><Link to={`/user`}>Профиль</Link></div>
                        <div><Link to={`/user/orders`}>Заказы</Link></div>
                        <div><Link to={`/user/reviews`}>Отзывы</Link></div>
                    </div>
                    <div className={'home-page'}>
                        <Routes>
                            <Route path={'/'} element={<Edit/>}/>
                            <Route path={'/orders'} element={<UserOrders orders={orders}/>}/>
                            <Route path={'/reviews'} element={<ReviewsPage/>}/>
                        </Routes>
                    </div>
                </div>

    );
}
