import {History} from "./History";
import {AboutAs} from "./AboutAs";
import {Team} from "./Team";

export function AboutAsPage ()
{
    return(
        <div>
            <div >
                <AboutAs/>
            </div>
            <div className={'container '}>
                <History/>
            </div>
            <div className={'container'}>
                <Team/>
            </div>
        </div>
    );
}
