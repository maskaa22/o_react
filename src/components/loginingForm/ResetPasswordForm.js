import {useNavigate} from "react-router-dom";
import {useState} from "react";

import './LoginingForm.css';
import {Input} from "../utils";
import {LOGIN} from "../../config/headerConstants";
import {resetPassword} from "../servises/API";

export function ResetPasswordForm() {

    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [passwordToo, setPasswordToo] = useState('');

    const location = window.location.pathname;
    const locationSplin = location.split('/');
    const id = locationSplin[1].split(':');

    return (
        <div className={'flex'}>
            <div className={'form border'}>
                <div className="form_header">Поля для зміни паролю</div>
                <Input value={password} setValue={setPassword} type={'password'} placeholder={"Введіть пароль"}
                       className={'input-margin'}/>
                <Input value={passwordToo} setValue={setPasswordToo} type={'password'} placeholder={"Повторіть пароль"}
                       className={'input-margin'}/>
                <button className={'form_btn'} onClick={() => {
                    resetPassword(password, passwordToo, id[1]).then(res => {
                        if (res) navigate(LOGIN);
                    });
                }}>Змінити
                </button>
            </div>
        </div>
    );
}
