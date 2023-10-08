import React, {useEffect, useState} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";

import {AboutAsPage} from "../aboutAs";
import {CLIENT_ALL} from "../../config/headerConstants";
import {ActiveForm, LoginingForm, ResetPasswordForm, WritingEmailForm} from "../loginingForm";
import {AdminHomePage} from "../admin";
import {Analysis} from "../analysis";
import {getUserForToken} from "../../servises";
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
import {setAuth, setRole} from "../../reducers/actionCreators";
import {store} from "../../reducers";
import {Users} from "../users";
import {WomensHaircut} from "../womensHaircut";
import {WORD_TOKEN, WORLD_ADMIN, WORLD_USER} from "../../config/wordsConstants";

export function App() {

    const isAuth = useSelector(state => state.user.isAuth);
    const role = useSelector(state => state.user.role);
    const currentUser = useSelector(state => state.user.currentUser);

    const [users, setUsers] = useState([]);
    const [delUser, setDelUser] = useState(false);
    const [userForEdit, setUserForEdit] = useState('');

    useEffect(() => {
        console.log(isAuth);
        if(isAuth) {
            console.log(currentUser);
            setUserForEdit(currentUser);
        }
        // else if (isAuth === false) {
        //     if (localStorage.getItem(WORD_TOKEN)) {
        //         store.dispatch(setAuth());
        //         getUserForToken().then(user => {
        //             console.log(user);
        //             store.dispatch(setRole(user.user_id.role));
        //         })
        //     }
        // }
    }, [isAuth]);

    return (
        <div className={'main'}>
            <div className={'all-container'}>
                <Routes>
                    <Route path={'/'} element={<HomePage/>}/>
                    <Route path={'/mens_haircut'} element={<MensHaircut/>}/>
                    <Route path={'/womens_haircut'} element={<WomensHaircut/>}/>
                    <Route path={'/hairstyles'} element={<HairStyles/>}/>
                    <Route path={'/hair_color'} element={<HairColor/>}/>
                    <Route path={'/products'} element={<ProductsPage/>}/>
                    <Route path={'/about_as'} element={<AboutAsPage/>}/>
                    <Route path={'/contact'} element={<Contacts/>}/>

                    {(isAuth && role === WORLD_ADMIN) &&
                    <Route path={'/admin'}
                           element={<AdminHomePage setUsers={setUsers} setDelUser={setDelUser} delUser={delUser}/>}>
                        <Route index element={<Edit userForEdit={userForEdit}/>}/>
                        <Route path={'users'} element={<Users items={users} setDelUser={setDelUser}/>}/>
                        <Route path={'records'} element={<Records/>}/>
                        <Route path={'products'} element={<CreateProduct/>}/>
                        <Route path={'orders'} element={<Orders/>}/>
                        <Route path={'archive_orders'} element={<ArchiveOrders/>}/>
                        <Route path={'analysis'} element={<Analysis/>}/>
                    </Route>
                    }
                    {isAuth && <Route path={'/products/orders'} element={<BasketPage/>}/>}
                    {(isAuth && role === WORLD_USER) && <Route path={CLIENT_ALL} element={<ClientHomePage currentUser={currentUser}/>}/>}

                    <Route path={'/registration'} element={isAuth ? <Navigate to={'/'}/> : <LoginingForm/>}/>
                    <Route path={'/login'} element={isAuth ? <Navigate to={'/'}/> : <LoginingForm/>}/>
                    <Route path={'/:user_id/reset-password'} element={<ResetPasswordForm/>}/>
                    <Route path={'/login-reset-password'} element={<WritingEmailForm/>}/>
                    <Route path={'auth/activate/:token'} element={<ActiveForm/>}/>
                </Routes>
            </div>
        </div>
    );
}
