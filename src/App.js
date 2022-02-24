import {Route, Routes, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";

import './App.css';
import {Header} from "./components/header";
import {AdminHomePage} from "./components/admin";
import {ClientHomePage} from "./components/client";
import {Registration} from "./components/registration";
import {Autorization} from "./components/autorization";
import {ProductsPage} from "./components/productsPage";
import {BasketPage} from "./components/basket";
import {HomePage} from "./components/home";
import {AboutAsPage} from "./components/aboutAs";
import {Contacts} from "./components/contacts";

function App() {
     const isAuth = useSelector(state => state.user.isAuth);
     // console.log(isAuth);
    // const currentUser = useSelector(state => state.user.currentUser)

    // const url = useLocation();
    // console.log(url.pathname);

    // if(!isAuth) {
    //    return <Autorization/>
    // }
  return (

        <div className={'app'}>
              {/*<Header/>*/}
            <div className={'wrap'}>
                {/*{*/}
                {/*    !isAuth &&*/}
                {/*    <Routes>*/}
                {/*        <Route path={'/registration'} element={<Registration/>}/>*/}
                {/*        <Route path={'/login'} element={<Autorization/>}/>*/}

                {/*    </Routes>*/}
                {/*}*/}


            </div>

            {/*<h1>{isAuth ? `Пользователь - ${currentUser.name} авторизирован`: 'Авторизируйтесь' }</h1>*/}

              {/*<AdminHomePage/>*/}
            {/*<ClientHomePage/>*/}
            <Routes>
                <Route path={'/'} element={<HomePage/>} />

                <Route path={'products'} element={<ProductsPage/>} />
                <Route path={'/about_as'} element={<AboutAsPage/>} />
                <Route path={'/contact'} element={<Contacts/>} />
                <Route path={'/products/basket'} element={<BasketPage/>}/>
                <Route path={'/admin/*'} element={<AdminHomePage/>}/>

                <Route path={'/registration'} element={<Registration/>}/>
                <Route path={'/login'} element={<Autorization isAuth={isAuth}/>}/>
                {/*<Route path={'/logout'} element={<Autorization/>}/>*/}
            </Routes>
        </div>
  );
}

export default App;
