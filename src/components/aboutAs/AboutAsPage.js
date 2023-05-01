import {useDispatch} from "react-redux";
import {useEffect} from "react";

import './AboutAsPage.css';
import './AboutAsPage@media.css';
import About from '../../images/big-foto/Group 4.png';
import {AboutAs} from "./AboutAs";
import {auth} from "../servises";
import {History} from "./History";
import {Team} from "./Team";
import {WORD_TOKEN} from "../../config/wordsConstants";

export function AboutAsPage() {

    const dispatch = useDispatch();

    useEffect(() => {
        if(localStorage.getItem(WORD_TOKEN)) {
            dispatch(auth());
        }
    }, [dispatch]);

    return (
        <div>
            <img src={About} alt={'About'} className={'submenu-img'}/>
            <div className={'container'}>
                <AboutAs/>
            </div>
            <History/>
            <div className={'container'}>
                <Team/>
            </div>
        </div>
    );
}
