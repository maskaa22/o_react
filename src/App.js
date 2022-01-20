import './App.css';
import Header from "./components/header/Header";
import AdminHomePage from "./components/admin/AdminHomePage";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import ClientHomePage from "./components/client/ClientHomePage";
import Registration from "./components/registration/Registration";
import Autorization from "./components/autorization/Autorization";
import {useSelector} from "react-redux";

function App() {
    const isAuth = useSelector(state => state.user.isAuth)
    const currentUser = useSelector(state => state.user.currentUser)

  return (
<Router>
        <div className={'app'}>
              <Header/>
            <div className={'wrap'}>
                {
                    !isAuth &&
                    <Routes>
                        <Route path={'/registration'} element={<Registration/>}/>
                        <Route path={'/login'} element={<Autorization/>}/>
                        {/*<Route path={'/logout'} element={<AdminHomePage/>}/>*/}
                    </Routes>
                }


            </div>

            {/*<h1>{isAuth ? `Пользователь - ${currentUser.name} авторизирован`: 'Авторизируйтесь' }</h1>*/}

              <AdminHomePage/>
            {/*<ClientHomePage/>*/}

        </div>
</Router>
  );
}

export default App;
