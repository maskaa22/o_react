import './App.css';
import Header from "./components/header/Header";
import AdminHomePage from "./components/admin/AdminHomePage";
import {Link, Route, BrowserRouter as Router, Routes} from "react-router-dom";
import ClientHomePage from "./components/client/ClientHomePage";
import EditPageAdmin from "./components/editPage/EditPageAdmin";
import Registration from "./components/registration/Registration";

function App() {

  return (
<Router>
        <div className={'app'}>
              <Header/>
            <div className={'wrap'}>
                <Routes>
                    <Route path={'/registration'} element={<Registration/>}/>
                </Routes>
            </div>

              {/*<AdminHomePage/>*/}
            {/*<ClientHomePage/>*/}

        </div>
</Router>
  );
}

export default App;
