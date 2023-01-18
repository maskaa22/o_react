import {Route, Routes} from "react-router-dom";

import {AboutAsPage} from "../aboutAs";
import {
    ABOUT_AS, ACTIVATE_TOKEN_URL,
    ADMIN_ALL,
    CLIENT_ALL,
    CONTACT,
    HAIR_COLOR,
    HAIR_STYLES,
    LOGIN, LOGIN_RESET_PASSWORD,
    MENS_HAIRCUT,
    NOT_FOUND,
    PRODUCTS,
    PRODUCTS_ORDERS,
    REGISTRATION, RESET_PASSWORD,
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
import {ActiveForm, LoginingForm, ResetPasswordForm, WritingEmailForm} from "../loginingForm";
import {MensHaircut} from "../mensHaircut";
import NotFound from "../payButton/NotFound";
import {ProductsPage} from "../productsPage";
import {WomensHaircut} from "../womensHaircut";
import {WORLD_LOGIN} from "../../config/wordsConstants";

export function App() {

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
                    <Route path={LOGIN} element={<LoginingForm login={WORLD_LOGIN}/>}/>
                    <Route path={NOT_FOUND} element={<NotFound/>}/>
                    <Route path={LOGIN_RESET_PASSWORD} element={<WritingEmailForm/>}/>
                    <Route path={RESET_PASSWORD} element={<ResetPasswordForm/>}/>
                    <Route path={ACTIVATE_TOKEN_URL} element={<ActiveForm/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
