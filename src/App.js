import './App.css';
import Header from "./components/header/Header";
import AdminHomePage from "./components/admin/AdminHomePage";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import ClientHomePage from "./components/client/ClientHomePage";
import Registration from "./components/registration/Registration";
import Autorization from "./components/autorization/Autorization";
import {useSelector} from "react-redux";
import ProductsPage from "./components/productsPage/ProductsPage";
import BasketPage from "./components/basket/BasketPage";

function App() {
    const isAuth = useSelector(state => state.user.isAuth)
    const currentUser = useSelector(state => state.user.currentUser)

    // if(!isAuth) {
    //    return <Autorization/>
    // }
  return (

        <div className={'app'}>
              {/*<Header/>*/}
            <div className={'wrap'}>
                {
                    !isAuth &&
                    <Routes>
                        <Route path={'/registration'} element={<Registration/>}/>
                        <Route path={'/login'} element={<Autorization/>}/>

                    </Routes>
                }
                <Routes>
                    <Route path={'/products'} element={<ProductsPage/>}/>

                </Routes>

            </div>

            {/*<h1>{isAuth ? `Пользователь - ${currentUser.name} авторизирован`: 'Авторизируйтесь' }</h1>*/}

              {/*<AdminHomePage/>*/}
            {/*<ClientHomePage/>*/}
            <Routes>
                <Route path={'/products/basket'} element={<BasketPage/>}/>
                <Route path={'/admin/*'} element={<AdminHomePage/>}/>
            </Routes>
            {/*<ProductsPage/>*/}


        </div>

  );
}

export default App;
