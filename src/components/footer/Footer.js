import {BiTimeFive} from "react-icons/bi";
import {FaMapMarkerAlt} from "react-icons/fa";
import React from "react";

import './Footer.css';
import './Fotter@media.css';
import Logo from "../../images/logo-header.png";

export function Footer() {

    return (
        <div className={'footer'}>
            <div className={'container'}>
                <div className={'footer-flex'}>
                    <div className={'navbar-logo'}>
                        <img src={Logo} className={'navbar-logo-img logo'} alt={'Logo'}/>
                        <p className={'navbar-logo-p logo-p'}>Studio</p>
                    </div>
                    <div className={'footer-center'}>
                        <FaMapMarkerAlt className="footer-icon"/>
                        <div className={'footer-time'}>
                            <div>вул. Іващенка</div>
                            <div>б. 327</div>
                        </div>
                    </div>
                    <div className={'footer-center'}>
                        <BiTimeFive className="footer-icon"/>
                        <div className={'footer-time'}>
                            <div>Час роботи</div>
                            <div>Пн-Нд: 08:00-17:00</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
