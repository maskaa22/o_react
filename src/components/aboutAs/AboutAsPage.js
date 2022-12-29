import './AboutAsPage.css';
import './AboutAsPage@media.css';
import About from '../../images/big-foto/Group 4.png'
import {AboutAs} from "./AboutAs";
import {History} from "./History";
import {Team} from "./Team";

export function AboutAsPage() {
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
