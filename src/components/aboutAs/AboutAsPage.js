import {History} from "./History";
import {AboutAs} from "./AboutAs";
import {Team} from "./Team";
import './AboutAsPage.css';
import './AboutAsPage@media.css';
import About from '../../images/big-foto/Group 4.png'

export function AboutAsPage ()
{
    return(
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
