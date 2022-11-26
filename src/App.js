import {Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";

import './App.css';
import {AboutAsPage} from "./components/aboutAs";
import {AdminHomePage} from "./components/admin";
import {Autorization} from "./components/autorization";
import {BasketPage} from "./components/basket";
import {ClientHomePage} from "./components/client";
import {Contacts} from "./components/contacts";
import {HomePage} from "./components/home";
import NotFound from "./components/payButton/NotFound";
import {ProductsPage} from "./components/productsPage";
import {Registration} from "./components/registration";
import {LoginingForm} from "./components/loginingForm";
import {useState} from "react";

function App() {
    const isAuth = useSelector(state => state.user.isAuth);
    // console.log(isAuth);
    const currentUser = useSelector(state => state.user.currentUser)

    // const url = useLocation();
    // console.log(url.pathname);

    // if(!isAuth) {
    //    return <Autorization/>
    // }

    const login = 'login';

    return (

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
                <Route path={'/'} element={<HomePage/>}/>

                <Route path={'products'} element={<ProductsPage/>}/>
                <Route path={'/about_as'} element={<AboutAsPage/>}/>
                <Route path={'/contact'} element={<Contacts/>}/>
                {/*<Route path={'/products/orders'} element={<BasketPage active={activeModalBasket} setActive={setModalActiveBasket}/>}/>*/}
                <Route path={'/products/orders'} element={<BasketPage/>}/>
                <Route path={'/admin/*'} element={<AdminHomePage/>}/>
                <Route path={`/user/*`} element={<ClientHomePage/>}/>

                {/*<Route path={'/registration'} element={<Registration/>}/>*/}
                <Route path={'/registration'} element={<LoginingForm/>}/>
                <Route path={'/login'} element={<LoginingForm login={login}/>}/>
                {/*<Route path={'/login'} element={<Autorization login={login}/>}/>*/}
                <Route path={'/*'} element={<NotFound/>}/>
            </Routes>
        </div>
    );
}

export default App;
