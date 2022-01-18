import "./Header.css"
import {NavLink} from "react-router-dom";

export default function Header ()
{
    return(

        <div className={'header'}>
            <div className={'navbar'}>

                <div className={'navbar-logo'}>LOGO</div>
                <div className={'navbar-header'}>MERN CLOUD</div>
                <div className={'navbar-login'}><NavLink to={'/login'}>Ввойти</NavLink></div>
                <div className={'navbar-registration'}><NavLink to={'/registration'}>Регистрация</NavLink></div>

            </div>
        </div>
);
}
