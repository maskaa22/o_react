import {Route, Routes} from "react-router-dom";

import {AboutAsPage} from "../aboutAs";
import {
    ABOUT_AS,
    ADMIN_ALL,
    CLIENT_ALL,
    CONTACT,
    HAIR_COLOR,
    HAIR_STYLES,
    LOGIN,
    MENS_HAIRCUT,
    NOT_FOUND,
    PRODUCTS,
    PRODUCTS_ORDERS,
    REGISTRATION,
    THIS,
    WOMENS_HAIRCUT
} from "../../config/headerConstants";
import {AdminHomePage} from "../admin";
import {BasketPage} from "../basket";
import {ClientHomePage} from "../client";
import {Contacts} from "../contacts";
import {HairColor} from "../hairColor";
import {HairStyles} from "../hairStyles";
import {HomePage} from "../home";
import {LoginingForm} from "../loginingForm";
import {MensHaircut} from "../mensHaircut";
import NotFound from "../payButton/NotFound";
import {ProductsPage} from "../productsPage";
import {WomensHaircut} from "../womensHaircut";
import {WORLD_LOGIN} from "../../config/wordsConstants";

export function App() {

    const login = WORLD_LOGIN;

    return (
        <div className={'main'}>
            <div className={'all-container'}>
                <Routes>
                    <Route path={THIS} element={<HomePage/>}/>
                    <Route path={MENS_HAIRCUT} element={<MensHaircut/>}/>
                    <Route path={WOMENS_HAIRCUT} element={<WomensHaircut/>}/>
                    <Route path={HAIR_STYLES} element={<HairStyles/>}/>
                    <Route path={HAIR_COLOR} element={<HairColor/>}/>
                    <Route path={PRODUCTS} element={<ProductsPage/>}/>
                    <Route path={ABOUT_AS} element={<AboutAsPage/>}/>
                    <Route path={CONTACT} element={<Contacts/>}/>
                    <Route path={PRODUCTS_ORDERS} element={<BasketPage/>}/>
                    <Route path={ADMIN_ALL} element={<AdminHomePage/>}/>
                    <Route path={CLIENT_ALL} element={<ClientHomePage/>}/>
                    <Route path={REGISTRATION} element={<LoginingForm/>}/>
                    <Route path={LOGIN} element={<LoginingForm login={login}/>}/>
                    <Route path={NOT_FOUND} element={<NotFound/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
