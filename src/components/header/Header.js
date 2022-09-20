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


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

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

                <div className={'navbar-header'}><NavLink to={'/products/orders'}>
                    <BsBasket2 className=" icon_basket white"/></NavLink></div>


                {/*<div onClick={()=> {*/}
                {/*    store.dispatch(modalActiveBasket());*/}
                {/*}}><NavLink to={'/products/orders'}><BsBasket2 className=" icon_basket white"/></NavLink></div>*/}

                {/*<div onClick={()=> {*/}
                {/*    setModalActiveBasket(true)*/}
                {/*}}><BsBasket2 className=" icon_basket white"/></div>*/}

            </div>
            {/*<BasketPage active={activeModalBasket} setActive={setModalActiveBasket}/>*/}
            {/*<Button onClick={handleOpen}>Open modal</Button>*/}
            {/*<Modal*/}
            {/*    open={open}*/}
            {/*    onClose={handleClose}*/}
            {/*    aria-labelledby="modal-modal-title"*/}
            {/*    aria-describedby="modal-modal-description"*/}
            {/*>*/}
            {/*    <Box sx={style}>*/}
            {/*        /!*<Typography id="modal-modal-title" variant="h6" component="h2">*!/*/}
            {/*        /!*    Text in a modal*!/*/}
            {/*        /!*</Typography>*!/*/}
            {/*        <Typography id="modal-modal-description" sx={{ mt: 2 }}>*/}
            {/*            <BasketPage />*/}
            {/*        </Typography>*/}
            {/*    </Box>*/}
            {/*</Modal>*/}

        </div>
    );
}
