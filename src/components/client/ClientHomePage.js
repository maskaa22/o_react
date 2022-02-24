import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "./ClientHomePage.css";
import { BasketPage } from "../basket";
import { EditPageClient } from "../editPage";
import { ReviewsPage } from "../reviews";

export function ClientHomePage ()
{
    return(
        <Router>
                <div className={'adminHomePage'}>
                    <div className={'home-menu'}>
                        <div><Link to="/edit">Редактировать</Link></div>
                        <div><Link to="/basket">Корзина</Link></div>
                        <div><Link to="/reviews">Отзывы</Link></div>
                    </div>
                    <div className={'home-page'}>
                        <Routes>
                            <Route path={'/edit'} element={<EditPageClient/>}/>
                            <Route path={'/basket'} element={<BasketPage/>}/>
                            <Route path={'/reviews'} element={<ReviewsPage/>}/>
                        </Routes>
                    </div>
                </div>
        </Router>
    );
}
