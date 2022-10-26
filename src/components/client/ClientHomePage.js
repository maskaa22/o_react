import {Link, Route, Routes} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

import "./ClientHomePage.css";
import {APIServise} from "../servises";
import {Edit} from "../editPage";
import {ReviewsPage} from "../reviews";
import {UserOrders} from "../orders";
import {ViewFunction} from "../utils/function";

export function ClientHomePage() {
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

    ViewFunction();


    return (

        <div className={'adminHomePage'}>
            <div className={'home-menu'}>
                <div className={'padding'}>
                    <div><Link to={`/user`} className={'color_purple click-item'}>
                        <button className={'home_item click-item'}>Профіль</button>
                    </Link></div>
                </div>
                <div className={'padding'}>
                    <div><Link to={`/user/orders`} className={'color_purple click-item'}>
                        <button className={'home_item click-item'}>Замовлення</button>
                    </Link></div>
                </div>
                <div className={'padding'}>
                    <div><Link to={`/user/reviews`} className={'color_purple click-item'}>
                        <button className={'home_item click-item'}>Відгуки</button>
                    </Link></div>
                </div>
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
