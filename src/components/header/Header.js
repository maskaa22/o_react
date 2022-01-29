import "./Header.css"
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../servises/API";
import {useEffect} from "react";
import {auth} from "../servises/API";

export default function Header ()
{
    const isAuth = useSelector(state => state.user.isAuth)

    const dispatch = useDispatch()

    // useEffect(() => {
    //     if(localStorage.getItem('token'))
    //     {
    //         dispatch(auth())
    //     }
    //
    // }, [])


    return(

        <div className={'header'}>
            <div className={'navbar'}>

                <div className={'navbar-logo'}>LOGO</div>
                <div className={'navbar-header'}>MERN CLOUD</div>
                {!isAuth && <div className={'navbar-login'}><NavLink to={'/login'}>Ввойти</NavLink></div> }
                {!isAuth && <div className={'navbar-registration'}><NavLink to={'/registration'}>Регистрация</NavLink></div> }
                {isAuth && <div className={'navbar-registration'} onClick={() => dispatch(logout())}><NavLink to={'/logout'}>Выход</NavLink></div> }

            </div>
        </div>
);
}
