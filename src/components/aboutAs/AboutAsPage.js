import {History} from "./History";
import {AboutAs} from "./AboutAs";
import {Team} from "./Team";
import './AboutAsPage.css'

export function AboutAsPage ()
{
    return(
        <div>
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
