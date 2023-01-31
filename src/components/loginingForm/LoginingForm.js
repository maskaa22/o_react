import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {NavLink, useLocation, useNavigate} from "react-router-dom";

import './LoginingForm.css'
import {APIServise} from "../servises";
import {Input} from "../utils";
import {LOGIN, LOGIN_RESET_PASSWORD, THIS} from "../../config/headerConstants";
import {
    WORD_AUTORIZ,
    WORD_AUTORIZATING,
    WORD_BORDER,
    WORD_REGISTR,
    WORD_REGISTRATION
} from "../../config/wordsConstants";

export function LoginingForm({role, handleClose}) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordToo, setPasswordToo] = useState('');
    const [border, setBorder] = useState('');

    useEffect(() => {
        if (!role) {
            setBorder(WORD_BORDER);
        }
    }, []);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const location = useLocation();
    const isLogin = location.pathname === LOGIN;

    return (
        <div>
            <div className={`flex`}>
                <div className={`form ${border}`}>
                    {
                        role && <button className={'close_del left'} onClick={handleClose}><i className="fa fa-times"
                                                                                              aria-hidden="true"/>
                        </button>
                    }
                    <div className="form_header">{isLogin ? WORD_AUTORIZATING : WORD_REGISTR}</div>
                    {!isLogin &&
                    <Input value={name} setValue={setName} type={'text'} placeholder={"Введіть ім'я"}
                           className={'input-margin'}/>
                    }
                    <Input value={email} setValue={setEmail} type={'text'} placeholder={'Введіть email'}
                           className={'input-margin'}/>
                    <Input value={password} setValue={setPassword} type={'password'} placeholder={'Введіть пароль'}
                           className={'input-margin'}/>
                    {
                        !isLogin && <Input value={passwordToo} setValue={setPasswordToo} type={'password'} placeholder={'Повторіть пароль'}
                                         className={'input-margin'}/>
                    }
                    <button className={'form_btn'} onClick={() => {
                        {
                            isLogin ? dispatch(APIServise.login(email, password)).then(rez => {
                                if (rez) navigate(THIS);
                            }) : APIServise.registration(name, email, password, role, passwordToo, '').then(rez => {
                                if (!role) {
                                    if (rez) navigate(LOGIN);
                                } else window.location.reload();
                            })
                        }
                    }}>{isLogin ? WORD_AUTORIZ : WORD_REGISTRATION}
                    </button>
                    {
                        isLogin && <NavLink to={LOGIN_RESET_PASSWORD} className={'login-reset-password'}>Забули пароль?</NavLink>
                    }
                </div>
            </div>
        </div>
    );
}
