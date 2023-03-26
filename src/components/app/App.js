import React, {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";

import {AboutAsPage} from "../aboutAs";
import {
    ABOUT_AS,
    ACTIVATE_TOKEN_URL,
    ADMIN_ALL,
    CLIENT_ALL,
    CONTACT,
    HAIR_COLOR,
    HAIR_STYLES,
    LOGIN,
    LOGIN_RESET_PASSWORD,
    MENS_HAIRCUT,
    PRODUCTS,
    PRODUCTS_ORDERS,
    REGISTRATION,
    RESET_PASSWORD,
    THIS,
    WOMENS_HAIRCUT
} from "../../config/headerConstants";
import {ActiveForm, LoginingForm, ResetPasswordForm, WritingEmailForm} from "../loginingForm";
import {AdminHomePage} from "../admin";
import {Analysis} from "../ analysis";
import {ANALYSIS, ARCHIVE_ORDERS, CLIENTS, ORDERS, PRODUCTS_CREATE, RECORDS} from "../../config/homeConstants";
import {APIServise} from "../servises";
import {ArchiveOrders} from "../archive";
import {BasketPage} from "../basket";
import {ClientHomePage} from "../client";
import {Contacts} from "../contacts";
import {CreateProduct} from "../createProduct";
import {Edit} from "../editPage";
import {HairColor} from "../hairColor";
import {HairStyles} from "../hairStyles";
import {HomePage} from "../home";
import {MensHaircut} from "../mensHaircut";
import {Orders} from "../orders";
import {ProductsPage} from "../productsPage";
import {Records} from "../records/Records";
import {setAuth, setRole} from "../reducers/actionCreators";
import {store} from "../reducers";
import {Users} from "../users";
import {WomensHaircut} from "../womensHaircut";
import {WORD_TOKEN, WORLD_ADMIN, WORLD_USER} from "../../config/wordsConstants";

export function App() {

    const isAuth = useSelector(state => state.user.isAuth);
    const role = useSelector(state => state.user.role);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (isAuth === false) {
            if (localStorage.getItem(WORD_TOKEN)) {
                store.dispatch(setAuth());
                APIServise.getUserForToken().then(user => {
                    store.dispatch(setRole(user.user_id.role));
                })
            }
        }
    }, [isAuth]);

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

                    {(isAuth && role === WORLD_ADMIN) &&
                    <Route path={ADMIN_ALL} element={<AdminHomePage setUsers={setUsers}/>}>
                        <Route index element={<Edit/>}/>
                        <Route path={CLIENTS} element={<Users items={users}/>}/>
                        <Route path={RECORDS} element={<Records/>}/>
                        <Route path={PRODUCTS_CREATE} element={<CreateProduct/>}/>
                        <Route path={ORDERS} element={<Orders/>}/>
                        <Route path={ARCHIVE_ORDERS} element={<ArchiveOrders/>}/>
                        <Route path={ANALYSIS} element={<Analysis/>}/>
                    </Route>
                    }
                    {isAuth && <Route path={PRODUCTS_ORDERS} element={<BasketPage/>}/>}
                    {(isAuth && role === WORLD_USER) && <Route path={CLIENT_ALL} element={<ClientHomePage/>}/>}

                    <Route path={REGISTRATION} element={<LoginingForm/>}/>
                    <Route path={LOGIN} element={<LoginingForm/>}/>
                    <Route path={RESET_PASSWORD} element={<ResetPasswordForm/>}/>
                    <Route path={LOGIN_RESET_PASSWORD} element={<WritingEmailForm/>}/>
                    <Route path={ACTIVATE_TOKEN_URL} element={<ActiveForm/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
