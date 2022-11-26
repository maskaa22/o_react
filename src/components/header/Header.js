import * as React from "react";
import {BiCabinet} from "react-icons/bi";
import {BsBasket2} from "react-icons/bs";
import {GiExitDoor} from "react-icons/gi";
import {ImUserPlus} from "react-icons/im";
import {IoMdExit} from "react-icons/io";
import {NavLink, useNavigate} from "react-router-dom";
import {RiMapPinUserFill} from "react-icons/ri";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";

import "./Header.css";
import {APIServise} from "../servises";
import {delFilter} from "../reducers/actionCreators";
import Logo from "../../images/logo-header.png";

export function Header() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


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

    const navigate = useNavigate();
    return (
        <div className={'all-container'}>
        <div className={'header'}>
            <div className={'navbar'}>

                <div className={'navbar-logo'}>
                    <img src={Logo} className={'navbar-logo-img'} alt={'Logo'}/>
                    <p className={'navbar-logo-p'}>Studio</p>
                </div>

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

                        {isAuth && role === 'admin' && <div className={'drop_down__item'}>
                            <NavLink to={'/admin'}><BiCabinet className=" icon_basket white"/>Кабинет</NavLink></div>}
                        {isAuth && role === 'user' && <div className={'drop_down__item'}>
                            <NavLink to={`/user`}> Кабинет</NavLink></div>}

                        {isAuth &&
                        <div className={'drop_down__item'} onClick={() => {
                            dispatch(APIServise.logout());
                            localStorage.removeItem('autorization')
                            navigate("/login")
                        }}><NavLink to={'/login'}>
                            <GiExitDoor className=" icon_basket white"/> Выход</NavLink></div>}
                    </div>
                </div>

                {
                    isAuth && <div className={'navbar-header'}><NavLink to={'/products/orders'}>
                        <BsBasket2 className=" icon_basket white"/></NavLink></div>
                }


            </div>

        </div></div>
    );
}
