import './App.css';
import Header from "./components/header/Header";
import AdminHomePage from "./components/admin/AdminHomePage";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import ClientHomePage from "./components/client/ClientHomePage";
import Registration from "./components/registration/Registration";
import Autorization from "./components/autorization/Autorization";

function App() {

  return (
<Router>
        <div className={'app'}>
              <Header/>
            <div className={'wrap'}>
                <Routes>
                    <Route path={'/registration'} element={<Registration/>}/>
                    <Route path={'/login'} element={<Autorization/>}/>
                </Routes>
            </div>

              {/*<AdminHomePage/>*/}
            {/*<ClientHomePage/>*/}

        </div>
</Router>
  );
}

export default App;
