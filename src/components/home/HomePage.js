import React, {useEffect} from "react";
import {useDispatch} from "react-redux";

import './Home.css'
import {APIServise} from "../servises";
import {Calendar} from "../calendar";
import {Comments} from "./Comments";
import {Works} from "./Works";
import {Benefits} from "./Benefits";
import {Main} from "./Main";
import {HomeFunction, scrollTopTop, Up} from "../utils/function";
import {BsArrowUpCircle} from "react-icons/bs";
import {Breands} from "./Breands";
import {Works2} from "./Works2";


export function HomePage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(APIServise.auth());
    }, [])

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

                {/*<div className={'container margin-bottom element-animation'}>*/}
                {/*    <div className={'circle-flex'}><h1 className={'h1-home'}>Наші роботи</h1></div>*/}
                {/*    /!*<div className={'padding-work'}><Works/></div>*!/*/}
                {/*</div>*/}
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
