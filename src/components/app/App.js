import {Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";

import './App.css';
import {AboutAsPage} from "../aboutAs";
import {AdminHomePage} from "../admin";
import {Autorization} from "../autorization";
import {BasketPage} from "../basket";
import {ClientHomePage} from "../client";
import {Contacts} from "../contacts";
import {HomePage} from "../home";
import NotFound from "../payButton/NotFound";
import {ProductsPage} from "../productsPage";
import {Registration} from "../registration";
import {LoginingForm} from "../loginingForm";
import {useState} from "react";
import {MensHaircut} from "../mensHaircut";
import {WomensHaircut} from "../womensHaircut";
import {HairStyles} from "../hairStyles";
import {HairColor} from "../hairColor";
import {
    ABOUT_AS, ADMIN_ALL, CLIENT_ALL, CONTACT,
    HAIR_COLOR,
    HAIR_STYLES, LOGIN,
    MENS_HAIRCUT, NOT_FOUND,
    PRODUCTS, PRODUCTS_ORDERS, REGISTRATION,
    THIS,
    WOMENS_HAIRCUT
} from "../../config/headerConstants";
import {WORLD_LOGIN} from "../../config/wordsConstants";

export function App() {
    const isAuth = useSelector(state => state.user.isAuth);
    // console.log(isAuth);
    const currentUser = useSelector(state => state.user.currentUser)

    // const url = useLocation();
    // console.log(url.pathname);

    // if(!isAuth) {
    //    return <Autorization/>
    // }

    const login = WORLD_LOGIN;

    return (
<div className={'main'}>
        <div className={'all-container'}>
            {/*<Header/>*/}
            {/*<div className={'wrap'}>*/}
                {/*{*/}
                {/*    !isAuth &&*/}
                {/*    <Routes>*/}
                {/*        <Route path={'/registration'} element={<Registration/>}/>*/}
                {/*        <Route path={'/login'} element={<Autorization/>}/>*/}

                {/*    </Routes>*/}
                {/*}*/}


            {/*</div>*/}

            {/*<h1>{isAuth ? `Пользователь - ${currentUser.name} авторизирован`: 'Авторизируйтесь' }</h1>*/}

            {/*<AdminHomePage/>*/}
            {/*<ClientHomePage/>*/}
            <Routes>
                <Route path={THIS} element={<HomePage/>}/>

                <Route path={MENS_HAIRCUT} element={<MensHaircut/>}/>
                <Route path={WOMENS_HAIRCUT} element={<WomensHaircut/>}/>
                <Route path={HAIR_STYLES} element={<HairStyles/>}/>
                <Route path={HAIR_COLOR} element={<HairColor/>}/>

                <Route path={PRODUCTS} element={<ProductsPage/>}/>
                <Route path={ABOUT_AS} element={<AboutAsPage/>}/>
                <Route path={CONTACT} element={<Contacts/>}/>
                {/*<Route path={'/products/orders'} element={<BasketPage active={activeModalBasket} setActive={setModalActiveBasket}/>}/>*/}
                <Route path={PRODUCTS_ORDERS} element={<BasketPage/>}/>
                <Route path={ADMIN_ALL} element={<AdminHomePage/>}/>
                <Route path={CLIENT_ALL} element={<ClientHomePage/>}/>

                {/*<Route path={'/registration'} element={<Registration/>}/>*/}
                <Route path={REGISTRATION} element={<LoginingForm/>}/>
                <Route path={LOGIN} element={<LoginingForm login={login}/>}/>
                {/*<Route path={'/login'} element={<Autorization login={login}/>}/>*/}
                <Route path={NOT_FOUND} element={<NotFound/>}/>
            </Routes>
        </div></div>
    );
}

export default App;
