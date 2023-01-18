import './LoginingForm.css';
import {activateEmail} from "../servises/API";

export function ActiveForm() {

    const location = window.location.pathname;
    const locationSplin = location.split('/');

    return (
        <div className={'flex'}>
            <div className={'form border'}>
                <div className="form_header">Активація пошти</div>
                <button className={'form_btn'} onClick={() => activateEmail(locationSplin[3])}>Активувати</button>
            </div>
        </div>
    );
}
