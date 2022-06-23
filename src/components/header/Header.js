import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./Header.css";
import { APIServise } from "../servises";
import { delFilter } from "../reducers/actionCreators";


export function Header() {
    const isAuth = useSelector(state => state.user.isAuth);
    const dispatch = useDispatch();

    //добавление подчёркивание в выбраное меню
    const links = document.getElementsByClassName("navbar");
    let URL = window.location.pathname;
    URL = URL.substring(URL.lastIndexOf('/'));
    for (let i = 0; i < links.length; i++) {
        if (links[i].dataset.pathname === URL) {
            links[i].classList.add("active");
        }
    }

    return (
        <div className={'header'}>
            <div className={'navbar'}>

                <div className={'navbar-logo'}>O_Studio</div>

                <div className={'navbar-header'}><NavLink to={'/'}>Главная</NavLink></div>
                <div className={'navbar_serveses'}>Услуги
                    <div className={'drop_down__menu'}>
                        <div className={'drop_down__item'}><NavLink to={'/mens_haircut'}>Мужские стрижки</NavLink></div>
                        <div className={'drop_down__item'}><NavLink to={'/womens_haircut'}>Женские стрижки</NavLink>
                        </div>
                        <div className={'drop_down__item'}><NavLink to={'/hair_dyeing'}>Покраски</NavLink></div>
                        <div className={'drop_down__item'}><NavLink to={'/hairstyles'}>Причёски</NavLink></div>
                    </div>
                </div>
                <div className={''} onClick={() => dispatch(delFilter())}><NavLink to={'products'}>Товары</NavLink>
                </div>
                <div className={'navbar-header'}><NavLink to={'/about_as'}>О нас</NavLink></div>
                <div className={'navbar-header'}><NavLink to={'/contact'}>Контакты</NavLink></div>

                <div className={'navbar_serveses'}><img className=" icon_basket" src={require('../../icons/icon-login.png')}/>
                    <div className={'drop_down__menu login_pozition'}>
                        {!isAuth &&
                        <div className={'drop_down__item'}><NavLink to={'/login'}>
                            <img className=" icon_basket" src={require('../../icons/icon-avatar.png')}/> Вход</NavLink>
                        </div>}
                        {!isAuth &&
                        <div className={'drop_down__item'}><NavLink to={'/registration'}>
                            <img className=" icon_basket" src={require('../../icons/icon-register.png')}/>Регистрация</NavLink>
                        </div>}
                        {isAuth && <div className={'drop_down__item'}><NavLink to={'/admin'}> Кабинет</NavLink></div>}
                        {isAuth &&
                        <div className={'drop_down__item'} onClick={() =>
                        {
                            dispatch(APIServise.logout());
                            localStorage.removeItem('autorization')
                        }}><NavLink to={'/logout'}>
                            <img className=" icon_basket" src={require('../../icons/icon-logout.png')}/> Выход</NavLink></div>}
                    </div>
                </div>


                <div><NavLink to={'/products/basket'}>Корзина</NavLink></div>

            </div>
        </div>
    );
}
