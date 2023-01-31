import './AboutAsPage.css';
import './AboutAsPage@media.css';
import About from '../../images/big-foto/Group 4.png'
import {AboutAs} from "./AboutAs";
import {History} from "./History";
import {Team} from "./Team";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {WORD_TOKEN} from "../../config/wordsConstants";
import {APIServise} from "../servises";

export function AboutAsPage() {

    const dispatch = useDispatch();

    useEffect(() => {
        if(localStorage.getItem(WORD_TOKEN)) {
            dispatch(APIServise.auth());
        }
    }, []);

    return (
        <div>
            <img src={About} alt={'About'}/>
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
