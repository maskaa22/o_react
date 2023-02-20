import {BsArrowUpCircle} from "react-icons/bs";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import './Home.css';
import './Home@media.css';
import {APIServise} from "../servises";
import {Benefits} from "./Benefits";
import {Breands} from "./Breands";
import {Calendar} from "../calendar";
import {Comments} from "./Comments";
import {HomeFunction, scrollTopTop, Up} from "../utils/function";
import {Main} from "./Main";
import {Works2} from "./Works2";
import {WORD_AUTH, WORD_TOKEN} from "../../config/wordsConstants";

export function HomePage() {

    const dispatch = useDispatch();

    useEffect(() => {
        if(localStorage.getItem(WORD_TOKEN)) {
            dispatch(APIServise.auth()).then(res => {
                if(res===undefined) {
                    localStorage.removeItem(WORD_TOKEN);
                    localStorage.removeItem(WORD_AUTH);
                    document.location.reload();
                }
            })
        }
    }, []);

    HomeFunction();
    Up();

    return (
        <div>
            <div className={'upward'} onClick={scrollTopTop}><BsArrowUpCircle className="icon-up"/></div>
            <Main/>
            <div className={'container margin-bottom margin-top-circle'}>
                <div className={'circle-flex-item'}><h1 className={'h1-home'}>Переваги</h1></div>
                <Benefits/>
            </div>
            <Works2/>
            <div className={'container'}>
                <div className={'circle-flex-item'}><h1 className={'h1-home'}>Відгуки</h1></div>
                <Comments/>
            </div>
            <div className={'margin-top-brands'}>
                <Breands/>
            </div>
            <div className={'container last-margin-bottom'}>
                <div className={'circle-flex-item'}><h1 className={'h1-home'}>Записатися</h1></div>
                <Calendar/>
            </div>

        </div>
    );
}
