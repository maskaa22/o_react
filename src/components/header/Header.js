import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./Header.css";
import { APIServise } from "../servises";
import {delFilter, modalActiveBasket, setUser} from "../reducers/actionCreators";
import {useState} from "react";
import {BsBasket2} from "react-icons/bs";
import {GiExitDoor} from "react-icons/gi";
import {IoMdExit} from "react-icons/io";
import {ImUserPlus} from "react-icons/im";
import {RiMapPinUserFill} from "react-icons/ri";
import * as React from "react";
import {store} from "../reducers";
import {BasketPage} from "../basket";


export function Header() {
    const isAuth = useSelector(state => state.user.isAuth);
    const role = useSelector(state => state.user.role);
    const currentUser = useSelector(state => state.user.currentUser);

    //const [role, setRole] = useState('');

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

    // if(isAuth){
    //     console.log(currentUser.role);
    //     // currentUser?.map(user => setRole(user.role))
    //     // console.log(role);
    // }

    const [activeModalBasket, setModalActiveBasket] = useState(false);
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

                <div className={'navbar_serveses'}><IoMdExit className=" icon_basket white"/>
                    <div className={'drop_down__menu login_pozition'}>
                        {!isAuth &&
                        <div className={'drop_down__item'}><NavLink to={'/login'}>
                            <RiMapPinUserFill className=" icon_basket white"/> Вход</NavLink>
                        </div>}
                        {!isAuth &&
                        <div className={'drop_down__item'}><NavLink to={'/registration'}>
                            <ImUserPlus className=" icon_basket white"/>Регистрация</NavLink>
                        </div>}

                        {isAuth && role==='admin' && <div className={'drop_down__item'}><NavLink to={'/admin'}> Кабинет</NavLink></div>}
                        {isAuth && role==='user' && <div className={'drop_down__item'}><NavLink to={`/user`}> Кабинет</NavLink></div>}

                        {isAuth &&
                        <div className={'drop_down__item'} onClick={() =>
                        {
                            dispatch(APIServise.logout());
                            localStorage.removeItem('autorization')
                        }}><NavLink to={'/logout'}>
                            <GiExitDoor className=" icon_basket white"/> Выход</NavLink></div>}
                    </div>
                </div>


                {/*<div onClick={()=> {*/}
                {/*    store.dispatch(modalActiveBasket());*/}
                {/*}}><NavLink to={'/products/orders'}><BsBasket2 className=" icon_basket white"/></NavLink></div>*/}

                <div onClick={()=> {
                    setModalActiveBasket(true)
                }}><BsBasket2 className=" icon_basket white"/></div>
            </div>
            <BasketPage active={activeModalBasket} setActive={setModalActiveBasket}/>

        </div>
    );
}
